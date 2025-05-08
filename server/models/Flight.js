// models/Flight.js

const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true,
        unique: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    totalBookedSeats: {
        type: Number,
        default: 0,
        min: 0
      },
    seatsAvailable: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    passengers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // or "Admin", depending on your model
        required: false, // 👈 Make it optional to avoid breaking old data
      },
    
}, { timestamps: true });

module.exports = mongoose.model('Flight', flightSchema);
