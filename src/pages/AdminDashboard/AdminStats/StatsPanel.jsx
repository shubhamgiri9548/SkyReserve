

// StatsPanel.jsx
import React from "react";

const StatsPanel = ({ stats }) => {
  return (
        
      <div className="w-full lg:w-1/3 bg-richblack-700 rounded-md p-4 mt-4 lg:mt-0">
        <p className="text-3xl font-semibold text-richblack-5 mb-4">Statistics</p>
        <p className="text-richblack-300 mb-2">
          <span className="font-bold">Total Flights:</span> {stats.totalFlights ?? "N/A"}
        </p>
        <p className="text-richblack-300 mb-2">
          <span className="font-bold">Total Users:</span> {stats.totalUsers ?? "N/A"}
        </p>
        <p className="text-richblack-300 mb-2">
          <span className="font-bold">Total Bookings:</span> {stats.totalBookings ?? "N/A"}
        </p>
        <p className="text-richblack-300">
          <span className="font-bold">Total Revenue:</span> ₹{stats.totalRevenue ?? "0"}
        </p>
      </div>
        
  );
};

export default StatsPanel;