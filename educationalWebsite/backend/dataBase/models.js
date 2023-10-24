const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:[true,"Username Exist"]
    },
    password: {
        type:String,
        required:true,
        unique:false
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    firstname:{type:String},
    lastname:{type:String},
    mobile:{type:String},
    address:{type:String},
    profile:{type:String},
})
const model = mongoose.model("User",schema)
module.exports = model