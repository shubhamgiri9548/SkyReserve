
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const User = require('../models/User'); 
const mailSender = require("../utils/mailSender");
const { bookingCancelation } = require('../mail/templates/bookingCancelation');



// cancel a booking 
exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('flight');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized action'
            });
        }

        if (booking.status === 'cancelled') {
            return res.status(400).json({
                success: false,
                message: 'Booking already cancelled'
            });
        }

        if (!booking.flight) {
            return res.status(400).json({
                success: false,
                message: 'Flight associated with booking no longer exists',
            });
        }

        //  Update flight seat availability & booked count
        const flight = booking.flight;
        flight.seatsAvailable += booking.seatsBooked;
        
        if (flight.totalBookedSeats > 0) {
            flight.totalBookedSeats -= booking.seatsBooked; 
        } else {
            flight.totalBookedSeats = 0; // Optional, but for safety 
          }

        // remove passenger from flight's passenger list
        flight.passengers = flight.passengers.filter(
            (passengerId) => passengerId.toString() !== booking.user.toString()
        );

        await flight.save();
        

        // Refund logic
        const refundAmount = booking.totalAmount || (booking.seatsBooked * flight.price);
        const user = await User.findById(booking.user);

        // email send logic -> pending 

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found for refund'
            });
        }

        user.walletBalance += refundAmount;
        await user.save();
        
        // ✅ Send cancellation email
        await mailSender(
            user.email,
            "Your Booking Has Been Cancelled - Refund Processed",
            bookingCancelation(user.name, booking._id, refundAmount) // corrected function call
        ); 

        booking.status = 'cancelled';
        booking.paymentStatus = 'refunded';
        await booking.save();

        // Update passengers status
        const index = flight.passengers.findIndex(
            (passengerId) => passengerId.toString() === booking.user.toString()
          );
          if (index !== -1) {
            flight.passengers.splice(index, 1);
          }
          await flight.save();
          

        res.status(200).json({
            data: {
                success: true,
                message: 'Booking cancelled successfully and refund processed',
                refundAmount,
                newWalletBalance: user.walletBalance,
            }
        });
    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while cancelling booking'
        });
    }
};


// Get all bookings for logged-in user
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate('flight')
            .sort({ createdAt: -1 });

       return  res.status(200).json({ 
        data:{
        success: true, 
        bookings
        } 
    });
    } catch (error) {
        console.error('Get user bookings error:', error);
        res.status(500).json({ message: 'Server error while fetching bookings' });
    }
};

// get all bookings 

exports.getAllBookings = async (req, res) => {
    try {
        const userId = req.user.id;

        // Step 1: Get IDs of flights created by this admin
        const adminFlightIds = await Flight.find({ createdBy: userId }).distinct("_id");

        // Step 2: Get bookings only for those flights
        const bookings = await Booking.find({ flight: { $in: adminFlightIds } })
            .populate("user", "name email")
            .populate("flight", "flightNumber departure arrival departureTime arrivalTime destination origin price")
            .sort({ createdAt: -1 });

        res.status(200).json({ 
            data: {
                success: true,
                count: bookings.length,
                bookings: bookings
            }
        });

    } catch (error) {
        console.error("Get all bookings error:", error);
        res.status(500).json({ 
            success: false,
            message: "Server error while fetching all bookings"
        });
    }
};


// delete a book ( InFuture)

exports.deleteBooking = async (req, res) => {
    try {
      const bookingId = req.params.id;
      const userId = req.user.id;
  
      const booking = await Booking.findById(bookingId);
  
      if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
      }
  
      // Ensure the booking belongs to the user
      if (booking.user.toString() !== userId) {
        return res.status(403).json({ success: false, message: "You are not authorized to delete this booking" });
      }
  
      // Optional: prevent deleting active bookings
      if (booking.status !== "cancelled") {
        return res.status(400).json({ success: false, message: "You can only delete cancelled bookings" });
      }
  
      await Booking.findByIdAndDelete(bookingId);
  
      return res.status(200).json({
        data:{
        success: true,
        message: "Booking deleted successfully",
        }
      });
  
    } catch (err) {
      console.error("Delete booking error:", err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while deleting booking",
      });
    }
  };
  

