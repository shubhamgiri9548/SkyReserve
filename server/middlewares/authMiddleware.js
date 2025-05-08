// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Middleware to verify token and get user from it
exports.protect = async (req, res, next) => {

      try {
    //console.log("cookie", req.cookies?.token );
    //console.log("body", req.body?.token);
    //console.log("header", req.header("Authorization")?.replace("Bearer ", ""));

    const token = 
            (req.body && req.body.token) || 
            (req.cookies && req.cookies.token) || 
            (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Token missing",
                });
            }

            try {
                const payload = jwt.verify(token, process.env.JWT_SECRET);
                console.log(payload);
                req.user = payload;

            } catch (error) {
                return res.status(401).json({
                    success: false,
                    message: 'Token is invalid',
                });
            }
            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong while verifying token',
            });
        } 
   
};



// Authorization middlewares 

//  isAdmin middleware
exports.isAdmin = (req, res, next) => {
    try{
        if (req.user.role !== "admin") {   
            return res.status(403).json({
                success:false, 
                message:"This is a protected route for Admin",
            })
        }  
       next();
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'User Role is not matching'
         });
       
    }
}

//  isStudent middleware
exports.isUser = (req, res, next) => {
    try{
        if(req.user.role !== "user") {
            return res.status(401).json({
                success:false, 
                message:"This is a protected route for users",
            })
        }
        next();

    } catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role is not matching'
         })
       
    }
}
