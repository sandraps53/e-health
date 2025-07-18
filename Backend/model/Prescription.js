import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
    doctorId:mongoose.Schema.Types.ObjectId,
    patientName:String,
    age:Number,
    gender:String,
    symptoms:String,
    diagnosis:String,
    medicines:[String],
    advice:String,
    createdAt:{type:Date, default:Date.now}
});

export default mongoose.model("Prescription",prescriptionSchema);