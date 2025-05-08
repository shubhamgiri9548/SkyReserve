import { User, ClipboardList, LogOut } from "lucide-react";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import {  NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


const UserSidebar = () =>   {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        toast.success("Logged out successfully");
        navigate("/login");
    };

    const linkStyle =
    "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200";
    const activeStyle = "bg-blue-700";

  return (   
 
    <aside className="w-full sm:w-64 bg-gray-900 text-white min-h-screen p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8 text-center text-blue-400">
        User Panel
        </h2>

        <nav className="flex flex-col gap-4">
        <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
            }
        >
            <User className="w-5 h-5" />
            My Profile
        </NavLink>

        <NavLink
            to="/dashboard/bookings"
            className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
            }
        >
            <ClipboardList className="w-5 h-5" />
            My Bookings
        </NavLink>

        <button
            onClick={handleLogout}
            className="flex items-center gap-3 mt-8 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all duration-200"
        >
            <LogOut className="w-5 h-5" />
            Logout
        </button>

          </nav>
    </aside>
)
}

export default UserSidebar;

