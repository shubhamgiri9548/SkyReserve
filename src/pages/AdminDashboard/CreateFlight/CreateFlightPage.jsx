// src/pages/AdminDashboard/CreateFlight/index.jsx
import React from "react";
import FlightForm from "./FlightForm";

const CreateFlightPage = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Create New Flight</h2>
      <FlightForm />
    </div>
  );
};

export default CreateFlightPage;
