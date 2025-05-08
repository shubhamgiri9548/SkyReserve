// models/Booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight',
        required: true
    },
    seatsBooked: {
        type: Number,
        required: true  
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['confirmed', 'cancelled'],
        default: 'confirmed'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid' , 'refunded' ],
        default: 'pending',
      },
      paymentInfo: {
        razorpayOrderId: String,
        razorpayPaymentId: String,
        razorpaySignature: String,
      },
      invoiceUrl: {
        type: String,
        default: null,
    },
    totalAmount: {
        type: Number,
        required: true
      },
      

}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
