// routes/paymentRoutes.js

const express = require('express');
const router  = express.Router();


const { capturePayment,verifyPayment } = require('../controllers/PaymentController');
const { protect, isUser } = require('../middlewares/authMiddleware');

// Create Razorpay order + pending booking
router.post('/capture', protect, isUser, capturePayment);

// Verify signature, finalize payment & booking
router.post('/verify',  protect, isUser, verifyPayment);

module.exports = router;
  