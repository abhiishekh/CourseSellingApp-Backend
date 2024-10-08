const express = require('express')


async function adminMiddleware(req,res,next){
    try {
        const username = req.headers.username;
        
        if(!username){
            return res.json({
                message:"please give the username in headers"
            })
        }
        next()
    } catch (error) {
        res.json({
            error
        })
    }
}

module.exports = adminMiddleware