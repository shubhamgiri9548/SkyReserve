// src/components/FlightCard.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookFlight } from "../services/operations/payment"; // ✅ Import bookFlight here
import { fetchUserBookings } from "../features/auth/authThunk";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


import {
  Plane,
  MapPin,
  Clock,
  IndianRupee,
  Calendar,
} from "lucide-react";



export default function FlightCard({ flight }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Added navigate
  const { token, user } = useSelector((state) => state.auth); // ✅ Pull user details too
  const [booking, setBooking] = useState(false);

  const handleBook = async () => {
    if (!token) {
      toast.error("Please login to book flights");
      return;
    }

    if (flight.seatsAvailable <= 0) {
      toast.error("No seats available");
      return;
    }

    setBooking(true);

    try {
      // ✅ Call bookFlight with correct params
      await bookFlight({
        token,
        flightId: flight._id,
        seatsRequested: 1, // assuming booking 1 seat for now
        userDetails: { name: user.name, email: user.email },
        dispatch,
        navigate,
      });

      dispatch(fetchUserBookings());
    } catch (err) {
      toast.error("Booking failed");
      console.error(err);
    } finally {
      setBooking(false);
    }
  };

  return (


    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-blue-600 p-5 flex flex-col justify-between h-full">
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
        <Plane className="w-5 h-5" />
        <span>{flight.flightNumber}</span>
      </div>
      <p className="text-gray-700 flex items-center gap-2">
        <MapPin className="w-4 h-4" /> {flight.origin} → {flight.destination}
      </p>
      <p className="text-gray-600 text-sm flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        Departs: {new Date(flight.departureTime).toLocaleString()}
      </p>
      <p className="text-gray-600 text-sm flex items-center gap-2">
        <Clock className="w-4 h-4" />
        Arrives: {new Date(flight.arrivalTime).toLocaleString()}
      </p>
      <p className="text-sm text-gray-700">
        Seats Available: <strong>{flight.seatsAvailable}</strong>
      </p>
      <p className="text-lg font-medium text-gray-800 flex items-center gap-1">
        <IndianRupee className="w-4 h-4" />
        Price: ₹{flight.price}
      </p>
    </div>

    <div className="flex gap-3 mt-4">
        <button 
        onClick={handleBook}
        disabled={booking}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-full transition text-sm font-semibold">
          Book Now
        </button>

      <Link
        to={`/flights/${flight._id}`}
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition text-center text-sm font-semibold"
      >
        Details
      </Link>

    </div>
  </div>
  );
}
