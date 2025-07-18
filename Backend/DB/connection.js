import mongoose from 'mongoose';

const connectDB = async()=>{
    try {
    const connection_string = process.env.connection_string
    await mongoose.connect(connection_string);
        console.log("Doctor prescription server connected successfully to mongodb")
} catch (error) {
    console.log("mongodb connection failed..",error); 
}
}


export default connectDB;

