import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import dbConnect from './db/dbConnect.js'

dotenv.config();
const app = express()
const PORT = process.env.PORT || 5000;

dbConnect();

app.use(express.json())


app.use(cors());
app.use(express.json());
app.use("/api/user",userRoutes)
app.use("/api/blogs",blogRoutes)


app.get("/",(req,res)=>{
    res.send("Welcome to my blog API")
})


app.listen(PORT,(req,res)=>{
    console.log(`App is running successfully on port ${PORT}`)
})

