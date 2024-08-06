import mongoose from "mongoose";

let connected = false;

const MONGOOSE_CONNECTION = process.env.MONGODB_CONNECTION_STRING as string;

export const dbConnection = async () => {

    mongoose.set("strictQuery", true)
    
    if(!MONGOOSE_CONNECTION) {
        throw new Error("Connection string is required")
    }

    if(connected) {
        console.log("Connection already established")
        return;
    }


    try {
        await mongoose.connect(MONGOOSE_CONNECTION);
        connected = true;
        console.log("Database connection established")
    } catch (error) {
        console.log(error)
        throw new Error("Connection error")
    } 
}