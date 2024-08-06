import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookiesParser from "cookie-parser"
import path from "path"
import "dotenv/config";
import { dbConnection } from "./config/database";
import userRoutes from "./routes/user.route";
import hotelRoutes from "./routes/my-hotels.route";

const PORT = Number(process.env.PORT || 5150);

const app: Application = express();


app.use(cookiesParser());

app.use(cors({ 
    origin: ["http://localhost:5173", process.env.FRONTEND_URL as string],
    credentials: true
 }));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "./../../frontend/dist")))


app.get("/api/v1/test", async (req: Request, res: Response) => {
    return res.json({ message: "Hello from backend"})
});

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/my-hotels", hotelRoutes);


dbConnection()
.then(() => {
    app.listen(PORT, () => console.log(`Application listening on port:${PORT}`))
})
.catch((error) => {
    console.log(error)
})