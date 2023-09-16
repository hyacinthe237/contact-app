import mongoose from "mongoose";

export const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_DB);
    } catch(error) {
        throw new Error(error.message);
    }
};