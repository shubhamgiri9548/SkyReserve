// src/pages/AdminDashboard/AllFlights.jsx

import { useEffect, useState } from "react";
import { getAllFlights } from "../../services/operations/flight";
import FlightCard from "../../components/common/FlightCard";
import { FaPlaneDeparture } from "react-icons/fa";
import toast from  'react-hot-toast';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


export default function AllFlights() {

  const token = useSelector(state => state.auth.token);

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await getAllFlights(token);
        //console.log("response in all flights", response);
        
        if (response && Array.isArray(response)) {
           toast.success("Flights fetched successfully!")
          setFlights(response); // ✅ this sets the flights array correctly
        } else {
          console.error("Expected an array, got:", response);
        }
      } catch (error) {
        console.error("Failed to fetch flights:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFlights();
  }, []);
  



  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2 mb-6">
        <FaPlaneDeparture className="text-blue-600" />
        All Flights
      </h1>

      {loading ? (
        <div className="text-lg text-gray-700">Loading flights...</div>
      ) : flights.length === 0 ? (
        <div className="text-lg text-red-500">No flights found.</div>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flights.map((flight) => (

           <Link to={`/admin/dashboard/flights/${flight._id}`} key={flight._id}>
              <FlightCard flight={flight} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
