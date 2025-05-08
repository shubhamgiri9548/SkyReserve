const User = require('../models/User');
const Flight = require('../models/Flight');
const Booking = require('../models/Booking');
const mongoose = require('mongoose');
const { flightCreationTemplate } = require('../mail/templates/flightCreationTemplate');
const { flightDeletionTemplate } = require('../mail/templates/flightDeletionTemplate');
const mailSender = require('../utils/mailSender');



//    Create a new flight (Admin only)
exports.createFlight = async (req, res) => {
     

    try {
        const {
            flightNumber,
            origin,
            destination,
            departureTime,
            arrivalTime,    
            seatsAvailable,
            price,
        } = req.body;

        // Basic validation
        if (
            !flightNumber || !origin || !destination || !departureTime ||
            !arrivalTime || seatsAvailable == null || price == null
        ) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        if (seatsAvailable < 1 || price < 0) {
            return res.status(400).json({
                success: false,
                message: 'Seats and price must be valid numbers',
            });
        }

        if (new Date(arrivalTime) <= new Date(departureTime)) {
            return res.status(400).json({
                success: false,
                message: 'Arrival time must be after departure time',
            });
        }

        const existing = await Flight.findOne({ flightNumber });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'Flight already exists',
            });
        }

        const flight = await Flight.create({
            flightNumber,
            origin,
            destination,
            departureTime,
            arrivalTime,
            seatsAvailable,
            price,
            createdBy: req.user.id,
        });
          
        // mail send 
        const admin = await User.findById(req.user.id);

        await mailSender(
        admin.email,
        `Flight Created: ${flight.flightNumber}`,
        flightCreationTemplate({
            adminName: admin.name || "Admin",
            flightNumber: flight.flightNumber,
            origin: flight.origin,
            destination: flight.destination,
            departureTime: flight.departureTime,
            arrivalTime: flight.arrivalTime,
            price: flight.price,
            seatsAvailable: flight.seatsAvailable,
        })
        );


        res.status(201).json({
            data:{
            success: true,
            flight,
            }
        });

    } catch (error) {
        console.error('Create flight error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating flight',
        });
    }
};

//  Get all available flights (for admin)

exports.getAllFlights = async (req, res) => {
    try {
          
       // const flights = await Flight.find().sort({ departureTime: 1 });
        const flights = await Flight.find({ createdBy: req.user.id });

        res.status(200).json({
        data: {
         success: true,
         count: flights.length, 
         flights
        } 
        });
    } catch (error) {
        console.error('Get flights error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error while fetching flights' 
        });
    }
};

// Get a single flight by ID

exports.getFlightById = async (req, res) => {
    try {
        const flightId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(flightId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid flight ID format',
            });
        }

        const flight = await Flight.findById(flightId).populate("passengers", "name email");
        if (!flight) {
            return res.status(404).json({
                success: false,
                message: 'Flight not found',
            });
        }

        res.status(200).json({
            success: true,
            flight,
            passengers: flight.passengers,  
        });

    } catch (error) {
        console.error('Get flight by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching flight',
        });
    }
};


// update a flight (discard )
exports.updateFlight = async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) {
            return res.status(404).json({ 
                success: false, 
                message: 'Flight not found' 
            });
        }

        const bookingsExist = await Booking.exists({ flight: flight._id, status: { $ne: 'cancelled' } });

        if (bookingsExist) {
            const restrictedFields = ['departureTime', 'arrivalTime', 'seatsAvailable', 'flightNumber'];
            const attemptedFields = Object.keys(req.body);
            const hasRestricted = attemptedFields.some(field => restrictedFields.includes(field));

            if (hasRestricted) {
                return res.status(400).json({
                    success: false,
                    message: 'Cannot update critical flight details after bookings exist'
                });
            }
        }

        const updatedFlight = await Flight.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({ 
            success: true, 
            flight: updatedFlight 
        });

    } catch (error) {
        console.error('Update flight error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error while updating flight' 
        });
    }
};


// delete a flight ( Admin only ) 

exports.deleteFlight = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const flight = await Flight.findById(req.params.id).session(session);
        if (!flight) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ success: false, message: 'Flight not found' });
        }

        const bookings = await Booking.find({ 
            flight: flight._id, 
            status: { $ne: 'cancelled' }, 
            paymentStatus: { $ne: 'refunded' } 
        }).session(session);

        let refundedUsersCount = 0;

        for (let booking of bookings) {
            const user = await User.findById(booking.user).session(session);

            if (user) {
                const refundAmount = booking.totalAmount || (booking.seatsBooked * flight.price);

                if (refundAmount && refundAmount > 0) {
                    user.walletBalance += refundAmount;
                    await user.save({ session });
                    refundedUsersCount++;
                }
            }

            booking.status = 'cancelled';
            booking.paymentStatus = 'refunded';
            await booking.save({ session });
        }

        await flight.deleteOne({ session });

        await session.commitTransaction();
        session.endSession();

        // mail sending (after session completed )
        const admin = await User.findById(req.user.id);
        await mailSender(
        admin.email,
        `Flight Deleted: ${flight.flightNumber}`,
        flightDeletionTemplate({
            adminName: admin.name || "Admin",
            flightNumber: flight.flightNumber,
            origin: flight.origin,
            destination: flight.destination,
            departureTime: flight.departureTime,
            totalRefundedUsers: refundedUsersCount,
        })
        );

       
        res.status(200).json({ 
            success: true, 
            message: `Flight deleted. ${refundedUsersCount} booking(s) refunded.` 
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Delete flight error:', error);
        res.status(500).json({ success: false, message: 'Server error while deleting flight' });
    }
};

// get all flights ( for public use)
exports.getAllPublicFlights = async (req, res) => {
    try {
      const flights = await Flight.find();
      res.status(200).json({
        data:{
        success: true,
        count: flights.length,
        flights,
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching public flights"
      });
    }
  };
