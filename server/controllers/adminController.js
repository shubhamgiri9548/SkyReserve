const User = require("../models/User");
const Booking = require("../models/Booking");
const Flight = require("../models/Flight");

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Get all flights created by the current admin
    const adminFlights = await Flight.find(
      { createdBy: userId },
      'flightNumber totalBookedSeats seatsAvailable price'
    );
    const adminFlightIds = adminFlights.map(f => f._id);

    // 2. Total flights created by the admin
    const totalFlights = adminFlights.length;

    // 3. Total bookings for admin's flights
    const totalBookings = await Booking.countDocuments({ flight: { $in: adminFlightIds } });

    // 4. Total revenue for paid bookings of admin's flights
    const totalRevenueAgg = await Booking.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          flight: { $in: adminFlightIds }
        }
      },
      {
        $lookup: {
          from: 'flights',
          localField: 'flight',
          foreignField: '_id',
          as: 'flightDetails'
        }
      },
      { $unwind: '$flightDetails' },
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ['$seatsBooked', '$flightDetails.price'] } }
        }
      }
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    // 5. Occupancy rates for admin's flights
    const occupancyRates = adminFlights.map(flight => {
      const totalSeats = flight.totalBookedSeats + flight.seatsAvailable;
      const occupancy =
        totalSeats > 0
          ? (flight.totalBookedSeats / totalSeats) * 100
          : 0;

      return {
        flightNumber: flight.flightNumber,
        occupancyRate: occupancy.toFixed(2),
      };
    });

    // 6. Total number of users (passengers) across all bookings of admin's flights
    const totalUsersAgg = await Booking.aggregate([
      {
        $match: {
          flight: { $in: adminFlightIds }
        }
      },
      {
        $group: {
          _id: null,
          totalUsers: { $sum: "$seatsBooked" }  // Sum of passengers
        }
      }
    ]);
    const totalUsers = totalUsersAgg[0]?.totalUsers || 0;

    // 7. Send response
    res.status(200).json({
      success: true,
      data: {
        totalFlights,
        totalBookings,
        totalRevenue,
        totalUsers,  
        occupancyRates,
      }
    });

  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats"
    });
  }
};
