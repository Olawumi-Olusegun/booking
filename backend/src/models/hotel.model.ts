import mongoose, { model, models, Model } from "mongoose";
import { BookingType, HotelType } from "../types";


const bookingSchema = new mongoose.Schema<BookingType>({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    userId: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
}, { timestamps: true })

const hotelSchema = new mongoose.Schema<HotelType>({
    userId: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    city: { type: String, trim: true, required: true },
    country: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    type: { type: String, trim: true, required: true },
    adultCount: { type: Number, trim: true, required: true, min: 1 },
    childCount: { type: Number, trim: true, min: 0 },
    facilities: [{ type: String, trim: true, required: true }],
    pricePerNight: { type: Number, trim: true, required: true },
    starRating: { type: Number, trim: true, required: true, min: 1, max: 5 },
    imageUrls: [{ type: String, trim: true, required: true }],
    lastUpdated: { type: Date,  },
    bookings: [bookingSchema],
}, { timestamps: true });


const HotelModel = models.hotels || model("Hotel", hotelSchema);

export default HotelModel as Model<HotelType>