const express = require('express')
const {CourseModule} = require('../db/index')
const app = express()

const router = express.Router()


router.post('/course',async function(req,res){
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const isPublished = req.body.isPublished;

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
        }
        res.json({
            message:"Course created successfully",
            response
        })
    } catch (error) {
        res.json({
            error
        })
    }


})

module.exports = router