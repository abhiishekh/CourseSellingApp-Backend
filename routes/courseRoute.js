const express = require('express')
const {CourseModule, UserModule} = require('../db/index')
const adminMiddleware = require('../middleware/adminMiddleware')
const creatorMiddleware = require('../middleware/creatorMiddleware')
const auth = require('../middleware/auth')
const app = express()

const router = express.Router()


router.post('/course',auth,adminMiddleware,async function(req,res){
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const isPublished = req.body.isPublished;
    const id = req._id
    // console.log("userId "+id)
    if(!id){
        return res.json({
            message:"user not found"
        })
    }

    try {
        const response =await CourseModule.create({
            title,
            description,
            price,
            isPublished
        })
        // console.log("course created")
        if(!response || response.length === 0 ){
            return res.status(403).json({
                message:"Please Enter some credentials"
            })
        }
        // console.log(response._id)
        // console.log("yha tk shi hai ")
        const user = await UserModule.updateOne({
                _id:id
            },{
                "$push":{
                    created_courses:response._id
                }
            }
        )
        
        // console.log(user)
        res.json({
            message:response._id,
            
            response
        })
    } catch (error) {
        console.log(error)
        res.json({
            error
        })
    }


})

router.get('/courses',creatorMiddleware,async function(req,res){
    const Id = req._id

    const response = await UserModule.findOne({
        _id:Id
    })
    // console.log(response)

    if(!response){
        return res.json({
            message:"somthing went wrong"
        })
    }
    const course = response.created_courses
    const arr = await CourseModule.find({
        _id:course
    })
    if(arr.length === 0){
        return res.json({
            message:"No course created yet"
        })
    }

    res.json({
        arr
    })
})
router.get('/course/:id',async function(req,res){
    const courseId = req.params.id

    if(!courseId){
        return res.json({
            message:"course id invalid"
        })
    }
    const response = await CourseModule.findOne({
        _id:courseId
    })
    if(!response){
        return res.json({
            message:"course not found"
        })
    }
    res.json({
        response
    })
})

module.exports = router