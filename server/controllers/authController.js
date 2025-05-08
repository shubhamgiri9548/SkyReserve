
const bcrypt = require("bcrypt");
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const { otpEmailTemplate } = require('../mail/templates/otpEmailTemplate');
const mailSender = require("../utils/mailSender"); // utility function using Nodemailer



exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
            success: false,
             message: 'User already exists' 
            });
        }

       
        let  hashedPassword 
        // secure password
            try{
              hashedPassword = await bcrypt.hash(password , 10); 
            }  catch(err){
              return res.status(400).json( {
                  success:false,
                  message:'Error in hashing password'
              })
          }
          
           // create entry for user // this is else case for upper code 
        const user = await User.create({ name, email, password:hashedPassword, role });
         
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
        success: false,
        message: 'Server error during registration' });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
          // validate on email and password
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:"Plese fill all details carefully",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // payload for cokkie 
        const payload = {
            email: user.email, 
            id:user._id, 
            role: user.role, 
         };
       
        if( await bcrypt.compare(password , user.password)  ) {

         // create a JWT tokken using sign method
         let token = jwt.sign(payload , process.env.JWT_SECRET  , { expiresIn:"2h" } );
        user.token  = token;  
        
        user.password = undefined;    // hide the password  , Otherwiser hacker can hack the password 
         

       return  res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                walletBalance: user.walletBalance
            },
            token: user.token,
        });

    } else{
        return res.status(401).json ({
            success:false,
            message: "password do not match"
        })
    } 

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
         success: false,   
         message: 'Server error during login' });
    }
};



// ( two Factor authentication)

// 1. Request OTP
exports.requestOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) 
    return res.status(400).json({
     success: false, 
     message: "Email is required"
     });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({
     success: false, 
     message: "User not found" 
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 min expiry
    
    user.otp = crypto.createHash("sha256").update(otp).digest("hex");
    user.otpExpiry = otpExpiry;
    await user.save();

    // mail sending 
    await mailSender( email, "Your OTP Code", otpEmailTemplate(user.name || user.email, otp) );
    //console.log("OTP-->" , otp);

    res.status(200).json({ 
    success: true,
     message: "OTP sent successfully"
     });

  } catch (err) {
    console.error("OTP request error:", err);
    res.status(500).json({
     success: false, 
     message: "Failed to send OTP"
     });
  }
};


// 2. Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) 
    return res.status(400).json({
     success: false, 
     message: "Email and OTP are required"
    });

    const user = await User.findOne({ email });
    if (!user)
         return res.status(404).json({
         success: false, 
         message: "User not found"
         });

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    if (user.otp !== hashedOtp || user.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false, 
        message: "Invalid or expired OTP"
      });
    }
    const payload = {
        email: user.email, 
        id:user._id, 
        role: user.role, 
     };

    // create a JWT tokken using sign method
    let token = jwt.sign(payload , process.env.JWT_SECRET  , { expiresIn:"2h" } );
    user.token  = token;  

    // Clear OTP
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();


    res.status(200).json({
        success: true,
        message: 'OTP is verified',
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            walletBalance: user.walletBalance
        },
        token: user.token
    });

  }
   catch (err) {
    console.error("OTP verify error:", err);
    res.status(500).json({
         success: false,
          message: "Failed to verify OTP"
         });
  }
};

