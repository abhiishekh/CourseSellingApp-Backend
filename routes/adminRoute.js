const express = require('express');
const {  AdminModule, CourseModule } = require('../db');
const adminMiddleware = require('../middleware/adminMiddleware');

const app = express()
app.use(express.json());

const router = express.Router()


router.post('/admin',async function(req,res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const response = await AdminModule.create({
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
            message:"Admin created Successfully",
            response
        })
        
    } catch (error) {
        res.json({
            err
        })
        console.log(error)
    }




})
router.get('/published-courses',adminMiddleware,async function(req,res){
    
    try {
        const response = await CourseModule.find({
            isPublished:true
        })
        res.json({
            response
        })

    } catch (error) {
        res.json({
            error
        })
    }
})
router.get('/unpublished-courses',adminMiddleware,async function(req,res){
    
    try {
        const response = await CourseModule.find({
            isPublished:false
        })
        res.json({
            response
        })

    } catch (error) {
        res.json({
            error
        })
    }
})
router.post('/publish-course/:courseId',adminMiddleware,async function(req,res){
        try {
            const courseId = req.params.courseId;
            const course = await CourseModule.findOne({
                _id : courseId
            })
            if(!course){
                return res.json({
                    message:"course not found with the give courseId"
                })
            }
            const response = await CourseModule.updateOne({
                isPublished:true
            })
            res.json({
                message:"Course published",
                response
            })
        } catch (error) {
            res.json({
                error
            })
        }
})


module.exports = router