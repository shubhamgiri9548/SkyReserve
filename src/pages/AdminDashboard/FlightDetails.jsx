import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import  toast from 'react-hot-toast';
import { useParams , useNavigate  } from "react-router-dom";
import { getFlightById } from "../../services/operations/flight";
import { deleteFlightById } from "../../services/operations/flight";
import {ConfirmModal} from "../../components/common/ConfirmModal";
import DeleteButton from "../../components/common/DeleteButton";

import {
  Plane,
  Clock,
  MapPin,
  UserRound,
  Users,
  CalendarCheck2,
  History,
} from "lucide-react";


const FlightDetails = () => {

  const { token , user } = useSelector((state) => state.auth);


  const { id } = useParams();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

   // delete the flight 
   const handleDelete = async () => {
    try {
      await deleteFlightById(id , token);
      toast.success("Flight deleted successfully!");
      navigate("/admin/dashboard/flights");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete flight.");
    }
  };
  

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const data = await getFlightById(id);
        setFlight(data);
      } catch (error) {
        console.error("Error fetching flight:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlight();
  }, [id]);

  if (loading)
    return <div className="text-center p-4 text-lg">Loading flight details...</div>;

  if (!flight)
    return <div className="text-center text-red-500">Flight not found.</div>;
  

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6 text-blue-600">
        <Plane className="w-8 h-8" />
        <h2 className="text-3xl font-bold">Flight Details</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <DetailRow icon={<Plane />} label="Flight Number" value={flight.flightNumber} />
        <DetailRow icon={<MapPin />} label="From" value={flight.origin} />
        <DetailRow icon={<MapPin />} label="To" value={flight.destination} />
        <DetailRow
          icon={<Clock />}
          label="Departure"
          value={new Date(flight.departureTime).toLocaleString()}
        />
        <DetailRow
          icon={<Clock />}
          label="Arrival"
          value={new Date(flight.arrivalTime).toLocaleString()}
        />
        <DetailRow
          icon={<Users />}
          label="Seats Available"
          value={flight.seatsAvailable}
        />
        <DetailRow
          icon={<UserRound />}
          label="Total Booked"
          value={flight.totalBookedSeats}
        />
        <DetailRow
          icon={<CalendarCheck2 />}
          label="Created At"
          value={new Date(flight.createdAt).toLocaleString()}
        />
        <DetailRow
          icon={<History />}
          label="Last Updated"
          value={new Date(flight.updatedAt).toLocaleString()}
        />
      </div>

      {/* passengers section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" /> Passengers
        </h3>
        {flight.passengers?.length === 0 ? (
          <p className="text-gray-600">No passengers yet.</p>
        ) : (
          <div className="space-y-2">
            {flight.passengers.map((p) => (
              <div
                key={p._id}
                className="p-3 border border-gray-200 rounded-lg shadow-sm"
              >
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-gray-600">{p.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>

       {/* Delete Button with modal */}
       { token && user.role === "admin" && (
       <div className="mt-6 flex justify-end">
          <DeleteButton onClick={() => setShowModal(true)} />
          {showModal && (
            <ConfirmModal
              isOpen={showModal}
              title="Confirm Deletion"
              message="Are you sure you want to delete this flight?"
              onConfirm={() => {
                handleDelete();
                setShowModal(false);
              }}
              onClose={() => setShowModal(false)}
            />
          )}
      </div>
      
       )}


    </div>
  );
};

// Reusable row component
const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-blue-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-semibold">{value}</p>
    </div>
  </div>
);

export default FlightDetails;
