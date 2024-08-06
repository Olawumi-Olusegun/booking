import express from "express";
import { signIn, signOut, signUp, validateToken } from "../controllers/user.controller";
import { check } from "express-validator";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.route("/sign-up")
      .post([
        check("firstName", "Firstname is required").isString(),
        check("lastName", "Lastname is required").isString(),
        check("password", "Password is required").isLength({ min: 6 }),
        check("email", "Email is required").isEmail(),
      ], signUp)

router.route("/sign-in")
      .post([
        check("password", "Password must have a minimum of 6 characters").isLength({ min: 6 }),
        check("email", "Email is required").isEmail(),
      ],signIn);


router.get('/validate-token', verifyToken, validateToken)
router.post('/sign-out',  signOut)
 
export default router;