// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.auth);

  // Redirect to login if token is missing
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Redirect to home if role doesn't match
  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}
