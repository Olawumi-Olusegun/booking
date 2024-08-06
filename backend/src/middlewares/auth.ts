import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    const accessToken = req.cookies["accessToken"];

    if(!accessToken) {
        return res.status(401).json({ message: "Unauthorized"});
    }
    
    try {

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY as string) as {userId: string};

        const payload = (decoded as JwtPayload)?.userId;

        if(!payload) {
            return res.status(401).json({ message: "Unauthorized"});
        }

        req.userId = payload;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized"});
    }


}