const express = require('express')
const mongoose = require('mongoose')
const UserRouter = require('./routes/userRoute')
const AdminRouter= require('./routes/adminRoute')
const CourseRouter  = require('./routes/courseRoute')


const app = express()
// Connect to the database 

mongoose.connect('mongodb+srv://abhishekmaurya:abhishek123@coursesellingapp.kqvuq.mongodb.net/CourseSelling')
.then(()=>{
    console.log("database connected")
}).catch(err=>{
    console.log("an error occured" + err)
})


//middleware for parse the json
app.use(express.json())


// routes
app.use('/api/v1',UserRouter)
app.use('/api/v1',AdminRouter)
app.use('/api/v1',CourseRouter)



app.listen(3000,
    console.log("App is listening")
)