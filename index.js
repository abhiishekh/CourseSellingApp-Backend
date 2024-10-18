const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const UserRouter = require('./routes/userRoute')
const AdminRouter= require('./routes/adminRoute')
const CourseRouter  = require('./routes/courseRoute')
const path = require('path')
require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT

const app = express()
// Connect to the database 

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("database connected")
}).catch(err=>{
    console.log("an error occured" + err)
})


//middleware for parse the json
app.use(express.json())
//allowing the origin to access data
app.use(cors())


// routes
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, '/public/index.html'));
})
app.use('/api/v1',UserRouter)
app.use('/api/v1',AdminRouter)
app.use('/api/v1',CourseRouter)



app.listen(PORT,
    console.log(`App is listening on PORT: ${PORT}`)
)