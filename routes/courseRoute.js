const express = require('express')
const {CourseModule, UserModule} = require('../db/index')
const adminMiddleware = require('../middleware/adminMiddleware')
const app = express()

const router = express.Router()


router.post('/course',adminMiddleware,async function(req,res){
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const isPublished = req.body.isPublished;
    const id = req._id

    try {
        const response =await CourseModule.create({
            title,
            description,
            price,
            isPublished
        })
        if(!response || response.length === 0 ){
            return res.status(403).json({
                message:"Please Enter some credentials"
            })
        }else{
            await UserModule.updateOne({
                _id:id
            },{
                "$push":{
                    created_courses:response._id
                }
            }
        )
        }
        res.json({
            message:response._id,
            
            response
        })
    } catch (error) {
        res.json({
            error
        })
    }


})

module.exports = router