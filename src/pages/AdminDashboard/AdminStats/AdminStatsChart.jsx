// AdminStatsChart.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAdminData } from "../../../services/operations/admin";
import ChartSwitcher from  "./ChartSwitcher"
import ChartDisplay from "./ChartDisplay";
import StatsPanel from "./StatsPanel";

const AdminStatsChart = () => {
  const token = useSelector((state) => state.auth.token);

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currChart, setCurrChart] = useState("occupancy");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getAdminData(token);
        setStats(response?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };
    fetchStats();
  }, [token]);

  if (loading) return <div className="text-white">Loading Chart...</div>;
  if (!stats) return <div className="text-red-500">Failed to load stats.</div>;

  
  return (
    <div className="flex flex-col gap-6 rounded-md bg-richblack-800 p-6 lg:flex-row lg:justify-between lg:items-start bg-gray-900 text-white">
      <div className="flex flex-col gap-4 w-full lg:w-2/3">
         
        <p className="text-2xl font-bold text-richblack-5 mb-6">Admin Analytics</p>

        <ChartSwitcher currChart={currChart} setCurrChart={setCurrChart} />
        <ChartDisplay currChart={currChart} stats={stats} />
      </div>
      <StatsPanel stats={stats} />
    </div>
  );
};

export default AdminStatsChart;