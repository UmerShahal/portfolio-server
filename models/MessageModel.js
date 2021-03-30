const mongoose = require('mongoose')


const MessageModel = new mongoose.Schema({
name:{
    type:String,
    required:true,
},
message:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
subject:{
    type:String,
    required:true
},

},{timestamps:true,collection:'messages'})






module.exports = mongoose.model('messages',MessageModel)