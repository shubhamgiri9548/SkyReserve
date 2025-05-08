import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AdminSidebar from "./AdminSidebar";
import { logout } from "../../features/auth/authSlice";
import {toast} from "react-hot-toast";

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user || user.role !== "admin") {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (!user || user.role !== "admin") return null;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar onLogout={handleLogout} />

      {/* main content */}
      <main className="flex-1 p-4 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
