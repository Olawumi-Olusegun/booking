import { Request, Response } from "express";
import cloudinary from "../libs/cloudinary";
import HotelModel, { HotelType } from "../models/hotel.model";

export const myHotels = async (req: Request, res: Response) => {
    
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    try {

        const uploadPromise = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataUri="data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.uploader.upload(dataUri);
            return res.url;
        });

        const imageUrls = await Promise.all(uploadPromise);

        if(!imageUrls) {
            return res.status(400).json({ message: "Unable to upload images"})
        }

        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        const hotel = new HotelModel(newHotel);

        const savedHotel = await hotel.save();

        if(!savedHotel) {
            return res.status(400).json({ message: "Unable to save hotel"})
        }

        return res.status(201).json({hotel: savedHotel, message: "Hotel saved" })

    } catch (error) {
        console.log(`[MY HOTEL]:`, error)
         return res.status(500).json({ message: "Something went wrong"})
    }
}