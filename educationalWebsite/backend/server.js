const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const router = require('./Route/routes.js')
dotenv.config();
const app = express()
app.use(express.json())
app.use(cors());
app.use(morgan('tiny'))
app.disable('x-powered-by')
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
mongoose.connection.on('connected',()=>{
    console.log("DB SUCESS")
})
mongoose.connection.on('error',()=>{
    console.log("DB FAILED")
})


app.use('/api',router)
app.post('/new',(req,res)=>{
    console.log(req.body)
})

app.listen(PORT, ()=>{
    console.log(`PORT IS RUNNING THE PORT ${PORT}`)
})