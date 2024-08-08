import { Request, Response } from "express";
import HotelModel from "../models/hotel.model";
import { BookingType, HotelSearchResponse, PaymentIntentResponse } from "../types";
import { validationResult } from "express-validator";
import { stripe } from "../libs/stripe";
import router from "../routes/user.route";

export const searchHotels = async (req: Request, res: Response) => {

    const query = constructSearchQuery(req.query);

    let sortOptions = {};

    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
        default:
            sortOptions = {};
            break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(req.query.page ? req.query.page?.toString() : "1");
    const skip = (pageNumber - 1) * pageSize;


    try {

        const hotels = await HotelModel.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSize);
  
      const total = await HotelModel.countDocuments(query);

        const response: HotelSearchResponse = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize)
            },
            message: "success"
        }

        return res.status(200).json(response);

    } catch (error) {
        console.log("[HOTELS SEARCH GET]::", error)
        return res.status(500).json({  message: "Error fetching hotels" })
    }
}


export const fetchHotelById = async (req: Request, res: Response) => {
 
  try {
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), message: "Errors found in your query" })
    }

    const hotelId = req.params.hotelId.toString();

    const hotel = await HotelModel.findById(hotelId);

    if(!hotel) {
      return res.status(404).json({  message: "Hotel not found" })
    }
    
    return res.status(200).json({hotel})

  } catch (error) {
            console.log("[HOTELS FETCH BY ID]::", error)
        return res.status(500).json({  message: "Error fetching hotels" })
  }
}


export const bookingPaymentIntent = async (req: Request, res: Response) => {

  const { numberOfNights } = req.body;

  const hotelId = req.params.hotelId.toString();
 
  try {
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), message: "Errors found in your query" })
    }


    const hotel = await HotelModel.findById(hotelId);

    if(!hotel) {
      return res.status(404).json({  message: "Hotel not found" })
    }

    const totalCost = hotel.pricePerNight * parseInt(numberOfNights);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: "usd",
      metadata: {
        hotelId,
        userId: req.userId,
      },
    });

    if(!paymentIntent.client_secret) {
      return res.status(400).json({  message: "Error creating payment intent" })
    }

    const response: PaymentIntentResponse = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    }
    
    return res.status(200).json(response);

  } catch (error) {
        console.log("[HOTELS PAYMENT INTENT BY ID]::", error)
        return res.status(500).json({  message: "Error making payment" })
  }
}

export const createBookings = async (req: Request, res: Response) => {
  try {

    const paymentIntentId = req.body.paymentIntentId;

    if(!paymentIntentId) {
      return res.status(400).json({  message: "Payment intent is required" })
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if(!paymentIntent) {
      return res.status(400).json({  message: "Payment intent not found" })
    }

    if(paymentIntent.metadata.hotelId !== req.params.hotelId || paymentIntent.metadata.userId !== req.userId) {
      return res.status(400).json({ message: "Payment intent mismatch"})
    }

    if(paymentIntent.status !== "succeeded") {
      return res.status(400).json({ message: `Payment intent not succeeded. Status ${paymentIntent.status}`});
    }

    const newBooking: BookingType = {
      ...req.body,
      userId: req.userId,
    }

    const hotel = await HotelModel.findOneAndUpdate({_id: req.params.hotelId}, {
      $push: { bookings: newBooking } 
    });

    if(!hotel) {
      return res.status(404).json({ message: "Hotel not found"});
    }

    await hotel.save();

    return res.status(200).json({ message: "Booking success"});

  } catch (error) {
    console.log("[HOTELS BOOKINGS]::", error)
    return res.status(500).json({  message: "Error making bookings" })
  }

}


const constructSearchQuery = (queryParams: any) => {

    let constructedQuery: any = {};
  
    if (queryParams.destination) {
      constructedQuery.$or = [
        { city: new RegExp(queryParams.destination, "i") },
        { country: new RegExp(queryParams.destination, "i") },
      ];
    }
  
    if (queryParams.adultCount) {
      constructedQuery.adultCount = {
        $gte: parseInt(queryParams.adultCount),
      };
    }
  
    if (queryParams.childCount) {
      constructedQuery.childCount = {
        $gte: parseInt(queryParams.childCount),
      };
    }
  
    if (queryParams.facilities) {
      constructedQuery.facilities = {
        $all: Array.isArray(queryParams.facilities)
          ? queryParams.facilities
          : [queryParams.facilities],
      };
    }
  
    if (queryParams.types) {
      constructedQuery.type = {
        $in: Array.isArray(queryParams.types)
          ? queryParams.types
          : [queryParams.types],
      };
    }
  
    if (queryParams.stars) {
      const starRatings = Array.isArray(queryParams.stars)
        ? queryParams.stars.map((star: string) => parseInt(star))
        : parseInt(queryParams.stars);
  
      constructedQuery.starRating = { $in: starRatings };
    }
  
    if (queryParams.maxPrice) {
      constructedQuery.pricePerNight = {
        $lte: parseInt(queryParams.maxPrice).toString(),
      };
    }
  
    return constructedQuery;
  };