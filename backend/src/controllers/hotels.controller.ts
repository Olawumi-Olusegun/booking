import { Request, Response } from "express";
import HotelModel from "../models/hotel.model";
import { HotelSearchResponse } from "../types";

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