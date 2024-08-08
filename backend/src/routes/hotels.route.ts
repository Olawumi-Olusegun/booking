import express from "express";
import { bookingPaymentIntent, createBookings, fetchHotelById, searchHotels } from "../controllers/hotels.controller";
import { param } from "express-validator";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();


router.route("/search")
      .get(searchHotels)

      router.route("/:hotelId")
      .get([
            param("hotelId").notEmpty().withMessage("Hotel ID is required")
      ], fetchHotelById)

router.route("/:hotelId/bookings/payment-intent")
      .post([
               param("hotelId").notEmpty().withMessage("Hotel ID is required")
            ],
            verifyToken,
            bookingPaymentIntent)

router.route("/:hotelId/bookings")
      .post([
               param("hotelId").notEmpty().withMessage("Hotel ID is required")
            ],
            verifyToken,
            createBookings)


export default router;