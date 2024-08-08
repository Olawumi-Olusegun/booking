import { Request, Response } from "express";
import HotelModel from "../models/hotel.model";
import { HotelType } from "../types";

export const fetchMyBookings = async (req: Request, res: Response) => {

    try {

        const hotels = await HotelModel.find({
            bookings: { $elemMatch: { userId: req.userId } }
        });

        const results = hotels.map((hotel) => {
            const userBookings = hotel.bookings.filter((booking) => booking.userId === req.userId);

            const hotelWithUserBookings: HotelType = {
                ...hotel.toObject(),
                bookings: userBookings,
            }

            return hotelWithUserBookings;
        });

        if(!results) {
            return res.status(400).json({ message: "Unable to get my-bookings" })
        }

        return res.status(200).json({results})

    } catch (error) {
        console.log("[MY BOOKINGS]::", error)
        return res.status(500).json({  message: "Error getting my bookings" })
    }
}