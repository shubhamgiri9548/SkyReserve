// src/pages/Dashboard/MyBookings.jsx
import React, { useEffect, useState } from 'react';
import { useSelector   } from 'react-redux';
import { getUserBookings, cancelBooking , deleteBooking } from '../../services/operations/booking';
import { toast } from 'react-hot-toast';
import bgimage from '../../assets/plane image.jpg'
import { downloadInvoice } from '../../services/operations/invoice'
import { MdDownloading } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";


import {
  Plane,
  Navigation,
  Clock,
  CalendarClock,
  Users,
  IndianRupee,
  BadgeCheck,
  CreditCard
} from "lucide-react";


export default function MyBookings() {

  const token  = useSelector((state) => state.auth.token);
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await getUserBookings(token);
      setBookings(data);
      toast.success('Bookings loaded successfully!'); 
      setLoading(false);
    } catch (error) {
      console.error("Error loading bookings: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadBookings();
    else setLoading(false);
  }, [token]);
   
  // cancel booking
  const handleCancel = async (id) => {
    const ok = await cancelBooking(id, token);

    if (ok) {
      toast.success('Booking cancelled. Refreshing list...');
      
      loadBookings();
    } else {
      toast.error('Failed to cancel booking. Please try again.');
    }
  };
  
   // delete booking 
  const handleDelete = async (id) => {
    const ok = await deleteBooking(id, token);
    if (ok) {
      toast.success('Booking deleted. Refreshing list...');
      loadBookings();
    }
  };
  

  if (loading) {
    return <div className="text-center py-10">Loading your bookings…</div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">No Bookings Found</h2>
        <p className="text-gray-600 mb-6">Looks like you haven't booked any flights yet.</p>
        <Link
          to="/flights"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Book Flights
        </Link>
      </div>
    );
  }

  return (    
    // new card of booking

    <div className="space-y-6">
      {bookings.map((b) => (
        <div
          key={b._id}
          className="relative p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-md border border-gray-200 overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <img
              src={bgimage}
              alt="bg"
              className="w-full h-full object-cover opacity-1"
            />
          </div>
    
          <div className="relative z-10 space-y-2 text-gray-800">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Plane className="w-5 h-5" />
              {b.flight?.flightNumber}
            </h3>
    
            <p className="flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              <span className="font-semibold">Route:</span> {b.flight?.origin} → {b.flight?.destination}
            </p>
    
            <p className="flex items-center gap-2">
              <CalendarClock className="w-4 h-4" />
              <span className="font-semibold">Departure:</span> {new Date(b.flight?.departureTime).toLocaleString()}
            </p>
    
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">Arrival:</span> {new Date(b.flight?.arrivalTime).toLocaleString()}
            </p>
    
            <p className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="font-semibold">Seats:</span> {b.seatsBooked}
            </p>
    
            <p className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4" />
              <span className="font-semibold">Total Paid:</span> ₹{b.flight?.price}
            </p>
    
            <p className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4" />
              <span className="font-semibold">Status:</span> {b.status}
            </p>
    
            <p className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="font-semibold">Payment:</span> {b.paymentStatus}
            </p>
    
            {/* Buttons remain unchanged */}
            <div className="flex gap-2">
              <button
                onClick={() => downloadInvoice(b._id, token)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Download Invoice <MdDownloading className="inline-block ml-1" />
              </button>
    
              {b.status === "confirmed" && (
                <button
                  onClick={() => {
                    handleCancel(b._id);
                  }}
                  className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Cancel Booking <MdCancel className="inline-block ml-1" />
                </button>
              )}
    
              {b.status === "cancelled" && (
                <button
                  onClick={() => {
                    handleDelete(b._id);
                  }}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete Booking
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
    

  );
}
