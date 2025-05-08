// src/pages/AdminDashboard/CreateFlight/CreateFlightForm.jsx
import React, { useState } from "react";
import { createFlight } from "../../../services/operations/flight";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const FlightForm = () => {

  const [formData, setFormData] = useState({
    flightNumber: "",
    origin: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    seatsAvailable: "",
    price: "",
  });
   
  const token = useSelector((state) => state.auth.token);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Creating flight...");

    try {
      const res = await createFlight(formData , token);
     // console.log("value of response -->" , res);
    
      if (res && res.success) {
        toast.success("Flight created successfully");
        setFormData({
          flightNumber: "",
          origin: "",
          destination: "",
          departureTime: "",
          arrivalTime: "",
          seatsAvailable: "",
          price: "",
        });
    
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Something went wrong! " + err.message);
      console.log("error is " , err);
    } finally {
      toast.dismiss(loading);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { label: "Flight Number", name: "flightNumber", type: "text" },
        { label: "Origin", name: "origin", type: "text" },
        { label: "Destination", name: "destination", type: "text" },
        { label: "Departure Time", name: "departureTime", type: "datetime-local" },
        { label: "Arrival Time", name: "arrivalTime", type: "datetime-local" },
        { label: "Seats Available", name: "seatsAvailable", type: "number" },
        { label: "Price", name: "price", type: "number" },
      ].map(({ label, name, type }) => (
        <div key={name}>
          <label className="block mb-1 font-medium">{label}</label>
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Create Flight
      </button>
    </form>
  );
};

export default FlightForm;
