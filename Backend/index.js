import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './DB/connection.js'

import router from './routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(cors(
    {
        origin:["https://e-health-frontend1.vercel.app"],
        methods:["POST","GET"],
        credentials:true
    }
))
app.use(express.json())

app.use(router);

connectDB()

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server running on the port ${PORT}`);
})
app.get('/', (req, res) => {
  res.send("<h1 style=color:red>Server is running!</h1>");
});
