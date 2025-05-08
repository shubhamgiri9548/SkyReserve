
// ChartDisplay.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const ChartDisplay = ({ currChart, stats }) => {
  const generateRandomColors = (num) => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      colors.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`);
    }
    return colors;
  };

  const occupancyData = stats.occupancyRates.map((flight) => Number(flight.occupancyRate));
  const isAllZero = occupancyData.every((val) => val === 0);

  const chartDataMap = {
    occupancy: {
      labels: stats.occupancyRates.map((flight) => flight.flightNumber),
      datasets: [
        {
          data: occupancyData,
          backgroundColor: generateRandomColors(occupancyData.length),
        },
      ],
    },
    bookings: {
      labels: ["Bookings", "Remaining"],
      datasets: [
        {
          data: [stats.totalBookings, Math.max(1, stats.totalFlights * 10 - stats.totalBookings)],
          backgroundColor: generateRandomColors(20),
        },
      ],
    },
    revenue: {
      labels: ["Revenue", "Unrealized"],
      datasets: [
        {
          data: [stats.totalRevenue, Math.max(1, stats.totalRevenue * 0.25)],
          backgroundColor: generateRandomColors(20),
        },
      ],
    },
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#fff" },
      },
    },
  };

  return (
    <div className="relative mx-auto w-[250px] h-[250px]">
      {currChart === "occupancy" && isAllZero ? (
        <p className="text-center text-yellow-400 pt-10">No occupancy data to display yet.</p>
      ) : (
        <Pie data={chartDataMap[currChart]} options={chartOptions} />
      )}
    </div>
  );
};

export default ChartDisplay;