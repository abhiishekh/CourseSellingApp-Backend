const express = require('express');
const { UserModule, CourseModule } = require('../db');
const userMiddleware = require('../middleware/userMiddleware');

const app = express()
app.use(express.json());

const router = express.Router()


router.post('/user',async function(req,res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const response = await UserModule.create({
            username,
            email,
            password
        })

        if(!response || response.length === 0){
            return res.status(404).json({
                message:"please enter the credentials"
            })
        }
        res.json({
            message:"User created Successfully",
            response
        })
        
    } catch (error) {
        res.json({
            err
        })
        console.log(error)
    }
})

// we dont need to verify the user to see the course 
// only verify when he purchase the course

router.get('/all-courses',async function(req,res){

    try {  
        const response = await CourseModule.find({
            isPublished : true,
        })
        // console.log(response)
        if(!response || response.length === 0){
            return res.json({
                message:"no course yet"
            })
        }
        res.json({
            response
        })
    } catch (error) {
        res.json({
            error
        })
    }
})
router.post('/purchase/:courseid',userMiddleware,async function(req,res){
    try {
        const courseId = req.params.courseid;
        const username = req.headers.username;
        await UserModule.updateOne({
            username:username,
            
        },{
            "$push":{
                purchased_course:courseId
            }
        }
    )
        res.json({
            message:"purchae complete"
        })

    } catch (error) {
        
    }
})

module.exports = router