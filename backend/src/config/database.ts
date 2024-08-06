import mongoose from "mongoose";

let connection = false;

const MONGOOSE_CONNECTION = process.env.MONGODB_CONNECTION_STRING as string;

export const dbConnection = async () => {

    if(!MONGOOSE_CONNECTION) {
        throw new Error("Conection string is required")
    }

    if(connection) {
        console.log("Connection already established")
        return;
    }
    mongoose.set("strictQuery", true)

    try {
        await mongoose.connect(MONGOOSE_CONNECTION);
        connection = true;
        console.log("Database connection established")
    } catch (error) {
        console.log(error)
        throw new Error("Conection error")
    } 
}