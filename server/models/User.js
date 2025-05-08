// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    otp: {
        type: String,
      },
     otpExpiry: {
        type: Date,
    },
    walletBalance: {
        type: Number,
        default: 0,
      }

}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
