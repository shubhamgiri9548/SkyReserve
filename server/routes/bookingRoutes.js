// routes/bookingRoutes.js

const express = require('express');
const router = express.Router();

const {
    cancelBooking,
    getUserBookings,
    getAllBookings,
    deleteBooking,
} = require('../controllers/bookingController');

const { protect, isAdmin , isUser } = require('../middlewares/authMiddleware');


//    Cancel a booking | @access  User/Admin
router.put('/cancel/:id', protect, cancelBooking);

// Get logged-in user's bookings | user 
router.get('/mybookings', protect, isUser , getUserBookings);

//  Get all bookings (admin) | @access  Admin
router.get('/allbookings', protect, isAdmin, getAllBookings);

router.delete('/delete/:id', protect,  deleteBooking);





module.exports = router;
