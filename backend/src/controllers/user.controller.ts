import { Request, Response } from "express";
import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

export const signUp = async (req: Request, res: Response) => {

    const { firstName, lastName, email, password } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() })
    }

    try {

        let user = await UserModel.findOne({ email })
        
        if(user) {
            return res.status(400).json({ message: "User already exist"})
        }

        const newUser = new UserModel({ firstName, lastName, email, password })

        const savedUser = await newUser.save();

        if(!savedUser) {
            return res.status(200).json({ message: "Unable to create new user"})
        }

        const jwtAccesTokenSecretKey = process.env.JWT_SECRET_KEY as string;

        const accessToken = jwt.sign({ userId: savedUser.id }, jwtAccesTokenSecretKey, { expiresIn: "1d"} );

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        });

        return res.status(200).json({ message: "Registration successfully"});

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong"})
    }
}

export const signIn = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() })
    }

    try {

        let user = await UserModel.findOne({ email })
        
        if(!user) {
            return res.status(400).json({ message: "Invalid credentials"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ message: "Invalid credentials"})
        }

        const jwtAccesTokenSecretKey = process.env.JWT_SECRET_KEY as string;

        const accessToken = jwt.sign({ userId: user.id }, jwtAccesTokenSecretKey, { expiresIn: "1d"} );

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        });

        return res.status(200).json({ message: "Signin successfully"});

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong"})
    }
}

export const validateToken = async (req: Request, res: Response) => {
    return res.status(200).json({ userId: req.userId });
}

export const signOut = async (req: Request, res: Response) => {
    try {

        res.cookie("accessToken", "", {
            expires: new Date(0),
        });

        return res.status(200).json({ message: "Signed out successfully"});
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong"})
    }
}