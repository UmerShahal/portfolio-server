const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 1111
const cors = require('cors')
const Posts = require('./models/PostModel')
const Messages = require('./models/MessageModel')

require('dotenv').config()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/portfolio-db',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Mongodb connected");
}).catch(err=>{
    console.error(err);
})

app.use('/*',(req,res,next)=>{
    try {
        if(req.header('apiSecret') && req.header('apiSecret') === process.env.API_SECRET){
            next()
        }else{
            return res.status(403).json({err:"No permission",success:false})
        }
    } catch (error) {
        res.status(500).json({err:error.message,success:false})
    }
})

app.get('/posts',async(req,res)=>{
    try {
        const query = req.query
        let posts
        let limit
        if(query._limit){
            limit = query._limit
            posts = await Posts.find().limit(+limit).sort('-createdAt')
        }else{
            posts = await Posts.find().sort('-createdAt')
        }
        
        res.status(200).json({posts})
    } catch (error) {
        res.status(500).json({err:error.message,success:false})
        
    }
})

app.post('/createPost',async(req,res)=>{
    try {
        const {title,description,image,demoUrl,githubUrl}  = req.body

        if(!title || !description || !image || !githubUrl || !demoUrl){
        return res.status(500).json({err:"Please enter all the fields",success:false})
        }
        const post = await Posts.create({
            title,
            description,
            image,
            demoUrl,
            githubUrl
        }) 

        const posts = await Posts.find().sort('-createdAt')
        
        res.status(200).json({post,Allposts:posts})
    } catch (error) {
        res.status(500).json({err:error.message,success:false})
        
    }
})

app.post('/contact',async(req,res)=>{
    try {
        const {name,subject,message,email}  = req.body

        if(!name || !subject || !message || !email){
        return res.status(500).json({err:"Please enter all the fields",success:false})
        }
        const Message = await Messages.create({
         name,
         subject,
         message,
         email
        }) 

        
        res.status(200).json({Message,success:true})
    } catch (error) {
        res.status(500).json({err:error.message,success:false})
        
    }
})

app.listen(port,()=>{
    console.log("Portfolio Server started");
})