import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookiesParser from "cookie-parser"
import path from "path"
import "dotenv/config";
import { dbConnection } from "./config/database";
import userRoutes from "./routes/user.route";
import myhotelRoutes from "./routes/my-hotels.route";
import hotelsRoutes from "./routes/hotels.route";

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


app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/my-hotels", myhotelRoutes);
app.use("/api/v1/hotels", hotelsRoutes);


app.get("*", (req:Request, res: Response) => {
    res.sendFile(path.join(__dirname, "./../../frontend/index.html"))
});


dbConnection()
.then(() => {
    app.listen(PORT, () => console.log(`Application listening on port:${PORT}`))
})
.catch((error) => {
    console.log(error)
})