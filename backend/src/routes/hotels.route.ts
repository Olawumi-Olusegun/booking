import express from "express";
import { searchHotels } from "../controllers/hotels.controller";

const router = express.Router();

router.route("/search")
      .get(searchHotels)

export default router;