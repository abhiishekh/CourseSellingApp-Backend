const express = require('express')


async function userMiddleware(req,res,next){
    try {
        const userId = req.headers.token;
        
        if(!userId){
            return res.json({
                message:"please give the token in headers"
            })
        }
        next()
    } catch (error) {
        res.json({
            error
        })
    }
}

module.exports = userMiddleware