import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllBookings } from '../../services/operations/booking';
import { UserCircle,  Mail , Plane, CalendarDays,Clock, ArrowRight,  MapPin, IndianRupee, } from 'lucide-react';


const AdminBookings = () => {
  const { token } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getAllBookings(token);
        //console.log('response --', res);
        setBookings(res);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };

    fetchBookings();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">📋 All Bookings</h2>
      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 transition-transform hover:scale-[1.02]"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div className="flex items-center gap-3 text-gray-800">
                <UserCircle className="w-6 h-6 text-blue-600" />
                <span className="font-semibold">
                  {booking.user?.name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2 sm:mt-0">
                <Mail className="w-4 h-4" />
                {booking.user?.email}
              </div>
            </div>

            <div className="text-gray-700 grid sm:grid-cols-2 gap-3 mb-2">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-green-600" />
                <span className="font-medium">Flight:</span> {booking.flight?.flightNumber}
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <span className="font-medium">Route:</span> {booking.flight?.origin} <ArrowRight className="w-4 h-4 inline" /> {booking.flight?.destination}
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span className="font-medium">Departure:</span> {new Date(booking.flight?.departureTime).toLocaleString()}
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                <span className="font-medium">Arrival:</span> {new Date(booking.flight?.arrivalTime).toLocaleString()}
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Booking Date:</span> {new Date(booking.createdAt).toLocaleString()}
              </div>

              <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Flight Price:</span> 
                <span className="text-blue-600 font-semibold capitalize">{booking.flight?.price}</span>
              </div>


              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <span className="text-green-600 font-semibold capitalize">{booking.status}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium">PaymentStatus:</span>
                <span className="text-green-600 font-semibold capitalize">{booking.paymentStatus}</span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;
