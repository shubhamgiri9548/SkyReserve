import { useSelector } from "react-redux";
import AdminStatsChart from "./AdminStatsChart";

const AdminStats = () => {
  const user = useSelector((state) => state.auth.user);
  
  return (
    <div className="bg-gray-950 sm:p-6 m-0 p-0 box-border w-full min-h-screen overflow-x-hidden ">
    
      <h2 className="text-xl text-gray-400 mb-3 ml-3 mt-3">Welcome, {user?.name} 👋</h2>
      <AdminStatsChart />
       
    </div>
  );
};

export default AdminStats;