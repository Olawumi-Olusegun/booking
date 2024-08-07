import express from "express";
import multer from "multer";
import { getAllMyHotels, getHotelById, myHotels, updateHotelById } from "../controllers/my-hotels.controller";
import { verifyToken } from "../middlewares/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

router.route("/")
      .post(verifyToken,
        [
            body("name").notEmpty().isString().withMessage("Name is required"),
            body("city").notEmpty().isString().withMessage("City is required"),
            body("country").notEmpty().isString().withMessage("Country is required"),
            body("description").notEmpty().isString().withMessage("Description is required"),
            body("type").notEmpty().isString().withMessage("Type is required"),
            body("adultCount").notEmpty().isNumeric().withMessage("Adult count is required"),
            body("childCount").notEmpty().isNumeric().withMessage("Child count is required"),
            body("facilities").notEmpty().isArray().withMessage("Facilites are required"),
            body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required"),
            body("starRating").notEmpty().isNumeric().withMessage("Star rating is required"),
        ],
        upload.array("imageFiles", 6),  myHotels)
        .get(verifyToken, getAllMyHotels);

router.route("/:hotelId")
        .get(verifyToken, getHotelById)
        .put(verifyToken, upload.array("imageFiles", 6), updateHotelById)

export default router;