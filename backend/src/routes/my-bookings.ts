import express from "express";
import { verifyToken } from "../middlewares/auth";
import { fetchMyBookings } from "../controllers/booking-controller";

const router = express.Router();

router.route("/")
      .get(verifyToken, fetchMyBookings)

export default router;