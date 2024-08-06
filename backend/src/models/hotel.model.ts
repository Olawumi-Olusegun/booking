
import mongoose, { model, models, Model } from "mongoose";

export type HotelType = {
    _id?: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
}


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
}, { timestamps: true });


const HotelModel = models.hotels || model("Hotel", hotelSchema);

export default HotelModel as Model<HotelType>