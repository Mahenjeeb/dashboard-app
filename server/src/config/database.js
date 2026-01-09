import mongoose from "mongoose";
const connectDatabase = async (dburl) => {
    try {
        await mongoose.connect(dburl);
        console.log("connected ✅");
    } catch (error) {
        console.log(`${error.message} ❌`);
    }
};

export default connectDatabase;
