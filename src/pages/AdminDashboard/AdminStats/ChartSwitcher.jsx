
// ChartSwitcher.jsx
const ChartSwitcher = ({ currChart, setCurrChart }) => {
    return (
      
      <div className="space-x-2 font-semibold">
        {["occupancy", "bookings", "revenue"].map((type) => (
          <button
            key={type}
            onClick={() => setCurrChart(type)}
            className={`rounded-sm p-1 px-3 transition-all duration-200 ${
              currChart === type ? "bg-richblack-700 text-green-400" : "text-yellow-400"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
          

    );
  };
  
  export default ChartSwitcher;