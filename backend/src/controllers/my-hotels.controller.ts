import { Request, Response } from "express";
import cloudinary from "../libs/cloudinary";
import HotelModel from "../models/hotel.model";
import { HotelType } from "../types";


async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromise = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataUri = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.uploader.upload(dataUri);
        return res.url;
    });
    const imageUrls = await Promise.all(uploadPromise);
    return imageUrls;
}

export const myHotels = async (req: Request, res: Response) => {
    
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    try {

        const imageUrls = await uploadImages(imageFiles);

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

export const getAllMyHotels = async (req: Request, res: Response) => {

    try {

        const hotels = await HotelModel.find({ userId: req.userId });

        return res.status(200).json({ hotels, message: "Success" });

    } catch (error) {
        console.log("[HOTELS GET]::", error)
        return res.status(500).json({  message: "Error fetching hotels" })
    }
}

export const getHotelById = async (req: Request, res: Response) => {

    const { hotelId } = req.params;

    try {

        const hotel = await HotelModel.findOne({ _id: hotelId, userId: req.userId });

        if(!hotel) {
            return res.status(404).json({  message: "Hotel not found" })  
        }

        return res.status(200).json({ hotel, message: "Success" });

    } catch (error) {
        console.log("[HOTELS GET BY ID]::", error)
        return res.status(500).json({  message: "Error fetching hotel" })
    }
}

export const updateHotelById = async (req: Request, res: Response) => {

    const { hotelId } = req.params;
    const updatedHotel: HotelType = req.body;

    updatedHotel.lastUpdated = new Date();

    try {

        const hotel = await HotelModel.findOneAndUpdate({ 
            _id: hotelId,
            userId: req.userId,
        }, updatedHotel, { new: true});

        if(!hotel) {
            return res.status(404).json({  message: "Hotel not found" })  
        }

        const files = req.files as Express.Multer.File[];

        const updateImageUrls = await uploadImages(files);

        hotel.imageUrls = [...updateImageUrls, ...(updatedHotel.imageUrls || [])];

        await hotel.save();

        return res.status(200).json({ hotel, message: "Success" });

    } catch (error) {
        console.log("[HOTELS UPDATE BY ID]::", error)
        return res.status(500).json({  message: "Error fetching hotel" })
    }
}


