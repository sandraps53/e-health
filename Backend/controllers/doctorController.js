import Doctor from '../model/Doctor.js'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

//register
export const registerDoctor=async(req,res)=>{
    console.log("Inside register function");
   

    try {
         const {name,email,password} = req.body
         const hashed = await bcrypt.hash(password, 10);
         const existingDoctor = await Doctor.findOne({email})
         if(existingDoctor){
            res.status(406).json("Your account already exists")
         }else{
            const newDoctor = new Doctor({
            name,email,password:hashed
        })

           await newDoctor.save()
           res.status(200).json(newDoctor)
         }
    } catch (error) {
       res.status(401).json(error)
    }

}

//login
export const loginDoctor = async(req,res)=>{
    console.log("Inside login function");

    try {
      const {email,password} = req.body
      const existingDoctor = await Doctor.findOne({email})

      if(!existingDoctor){
      return res.status(404).json("Invalid credentials")
      }

      const isMatch = await bcrypt.compare(password,existingDoctor.password)
      if(!isMatch){
         return res.status(400).send('Invalid credentials');
      }
      
      const token = jwt.sign({doctorId:existingDoctor._id},process.env.jwt_secret)

      return res.status(200).json({existingDoctor,token})
      


    } catch (error) {
       res.status(401).json(error) 
    }
}
