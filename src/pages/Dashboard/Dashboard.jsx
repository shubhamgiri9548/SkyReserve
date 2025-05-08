
import { Outlet } from "react-router-dom";
import {  useSelector } from "react-redux";
import UserSidebar from "./UserSidebar";



export default function Dashboard() {

  const user = useSelector((state) => state.auth.user);


  if (!user || user.role !== "user") return null;


  return (
    <div className="flex min-h-screen">

      {/* side bar  */}
       <UserSidebar />


      {/* Main content */}
      <main className="flex-1 p-4 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
