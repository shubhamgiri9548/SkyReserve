
const express = require('express');
const router = express.Router();


const { register, login  , requestOTP , verifyOTP } = require('../controllers/authController');
const { resetPassword , resetPasswordToken } = require('../controllers/ResetPassword');
const {protect , isAdmin, isUser} = require('../middlewares/authMiddleware');


router.post('/signup', register);
router.post('/login', login);



// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken) 
// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)


router.post("/request-otp", requestOTP);
router.post("/verify-otp", verifyOTP);


// protected route for user 
router.get("/user", protect, isUser,  (req, res) => {
    res.json({
        success:true, 
        message:"Welcome to Protected route for Users",
    });    
}) 


// protected route for admin 
router.get("/admin", protect , isAdmin,  (req, res) => {
    res.json({
        success:true, 
        message:"Welcome to Protected route for Admin",
    });    
})
    

module.exports = router;
