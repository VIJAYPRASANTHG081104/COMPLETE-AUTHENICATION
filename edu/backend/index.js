import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from '../backend/Controllers/authController.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 8000
const corsOptions = {
    origin:true,
    credentials: true,
}
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())





//for testingq
app.get('/',(req,res)=>{
    res.send('api is working');
}); 
mongoose.set("strictQuery",false)


//database connection
const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB database connected");
    }
    catch(err){
        console.log("MongoDB database connection failed")
    }
}


//main middleware




//other middleware
app.post('/new',(req,res)=>{
    console.log(req.body)
})
app.use('/api/user/auth',authRoute)

app.listen(port, ()=>{
    connect();
    console.log('server is listening on port',port);
})