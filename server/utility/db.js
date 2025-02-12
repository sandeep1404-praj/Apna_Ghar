import mongoose from "mongoose";
const uri = process.env.MongoDB_URI;
export const connectDb = async()=>{
    try {
        await mongoose.connect(uri)
        console.log("Connection with database is Successful");
        
    } catch (error) {
        console.error("Connection with database is Failed");
        process.exit(0)
    }
}