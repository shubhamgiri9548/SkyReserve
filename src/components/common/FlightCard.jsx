// src/components/FlightCard.jsx

import { FaPlane, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function FlightCard({ flight }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-blue-800 flex items-center gap-2">
          <FaPlane className="text-blue-500" />
          {flight.flightNumber}
        </h3>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
          ₹{flight.price}
        </span>
      </div>

      <div className="text-gray-600 space-y-1">
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt /> <strong>From:</strong> {flight.origin}
        </p>
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt /> <strong>To:</strong> {flight.destination}
        </p>
        <p className="flex items-center gap-2">
          <FaClock /> <strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}
        </p>
        <p className="flex items-center gap-2">
          <FaClock /> <strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}
        </p>
        <p className="text-sm mt-2">
          <strong>Seats Available:</strong> {flight.seatsAvailable}
        </p>
      </div>
    </div>
  );
}
