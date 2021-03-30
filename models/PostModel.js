const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({
title:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true
},
demoUrl:{
    type:String,
    required:true
},
githubUrl:{
    type:String,
    required:true
}

},{timestamps:true,collection:'Allposts'})






module.exports = mongoose.model('posts',PostSchema)