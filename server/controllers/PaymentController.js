// controllers/paymentController.js

const {instance} = require('../config/razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { bookingConfirmationTemplate } = require('../mail/templates/bookingConfirmationTemplate');
const mailSender = require('../utils/mailSender');
const Booking = require('../models/Booking');
const Flight  = require('../models/Flight');
const User = require("../models/User");



exports.capturePayment = async (req, res) => {
  try {
    const { flightId, seatsRequested } = req.body;
    const userId = req.user.id;

    // 1. Validation
    if (!flightId || !seatsRequested) {
      return res.status(400).json({
        success: false,
        message: "flightId and seatsRequested are required",
      });
    }

    // 2. Fetch flight & check seats
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({
        success: false, 
        message: "Flight not found"
     });
    }
    if (flight.seatsAvailable < seatsRequested) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    // 3. Calculate total amount (in paise)
    const amount = seatsRequested * flight.price * 100;

    // 4. Create Razorpay order
    const orderOptions = {
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { flightId, userId, seatsRequested }
    };

        try {
        const order = await instance.orders.create(orderOptions);
            
          // 5. Create a pending Booking

          const booking = await Booking.create({
            user: userId,
            flight: flightId,
            seatsBooked: seatsRequested,
            paymentStatus: 'pending',
            totalAmount: seatsRequested * flight.price,
            paymentInfo: { razorpayOrderId: order.id }
          });

      

          //new logic 
          res.status(200).json({
            data:   {   
            success: true,
            order,
            bookingId: booking._id
            }
          });
          

        
      }  catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Could not create order",
            error: error.message,
        })
      }

  

  } catch (error) {
    console.error("capturePayment error:", error);
    res.status(500).json({ 
    success: false,
     message: "Internal server error"
     });
  }
};



exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId
    } = req.body;

    const userId = req.user.id;

    // 1. Basic validation
    if (!razorpay_order_id || !razorpay_payment_id ||
        !razorpay_signature || !bookingId) {
      return res.status(400).json({
        success: false,
        message:  "All payment fields are required"
      });
    }

    // 2. Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSig = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSig !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }

    // 3. Fetch booking & order match
    const booking = await Booking.findById(bookingId);
    if (!booking ||
        booking.paymentInfo.razorpayOrderId !== razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message: "Booking not found or order mismatch"
      });
    }
    


    // 4. Update booking status
    booking.paymentStatus = 'paid';
    booking.paymentInfo.razorpayPaymentId = razorpay_payment_id;
    booking.paymentInfo.razorpaySignature = razorpay_signature;
    await booking.save();

    // 5. Update flight seats & add passenger
    const flight = await Flight.findById(booking.flight);
    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "Flight not found"
      });
    }
    
    if (flight.seatsAvailable < 0) {
      return res.status(400).json({
        success: false,
        message: "Seats unavailable after payment — possible double booking"
      });
    }

    flight.seatsAvailable -= booking.seatsBooked;
     
      // Increase total booked seats (new logic)
      if (!flight.totalBookedSeats) {
        flight.totalBookedSeats = 0; // fallback if field is missing or undefined
      }
      flight.totalBookedSeats += booking.seatsBooked;

    flight.passengers = flight.passengers || [];
    flight.passengers.push(new mongoose.Types.ObjectId(userId));
    await flight.save();

    // mail send : 
    const user = await User.findById(userId);
    await mailSender(
      user.email,
      "Booking Confirmed - SkyReserve",
      bookingConfirmationTemplate({
        userName: user.name || "Traveler",
        flightNumber: flight.flightNumber,
        origin: flight.origin,
        destination: flight.destination,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        seatsBooked: booking.seatsBooked,
        amountPaid: booking.totalAmount,
        bookingId: booking._id
      })
    );
     // response 
    res.status(200).json({
      data:{
      success: true,
      message: "Payment verified and booking confirmed"
      }
    });

  } catch (error) {
    console.error("verifyPayment error:", error);
    res.status(500).json({ 
    success: false, 
    message: "Error verifying payment" });
  }
};
