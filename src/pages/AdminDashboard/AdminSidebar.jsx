
import { NavLink } from "react-router-dom";
import { UserCircle,PlusCircle,Plane,LogOut , ClipboardList  , ChartNoAxesCombined } from "lucide-react"; 



export default function AdminSidebar({ onLogout }) {

  const linkStyle =
    "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200";

  const activeStyle = "bg-blue-700";

  return (
    <aside className="w-full sm:w-64 bg-gray-900 text-white min-h-screen p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center text-blue-400">Admin Panel</h2>
      <nav className="flex flex-col gap-4">

        <NavLink
          to="/admin/dashboard/profile"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <UserCircle className="w-5 h-5" />
          Admin Profile
        </NavLink>

        <NavLink
          to="/admin/dashboard/stats"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <ChartNoAxesCombined className="w-5 h-5" />
          Admin Stats
        </NavLink>

        <NavLink
          to="/admin/dashboard/create"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <PlusCircle className="w-5 h-5" />
          Create Flight
        </NavLink>

        <NavLink
          to="/admin/dashboard/flights"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <Plane className="w-5 h-5" />
          All Flights
        </NavLink>

        <NavLink
          to="/admin/dashboard/allbookings"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <ClipboardList className="w-5 h-5" />
          All Bookings
        </NavLink>

        <button
          onClick={onLogout}
          className="flex items-center gap-3 mt-8 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </nav>
    </aside>
  );
}
