import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import loginBg from "../assets/loginpage1.jpg";
import { loginUser, requestOTP, verifyOTP } from "../services/operations/auth";

const Login = () => {

  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState("password"); // or "otp"
  const [otpSent, setOtpSent] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });
 

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
   
  // password login method :
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await loginUser(formData.email, formData.password , dispatch , navigate);
      toast.success("Login successful, welcome!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };
   
  // otp send method : 
  const handleOTPRequest = async () => {
    if (!formData.email) {
      toast.error("Email is required to request OTP");
      return;
    }

    try {
      await requestOTP(formData.email);
      setOtpSent(true);
      toast.success("OTP sent to your email");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };
 
  // OTP login method : 
  const handleOTPLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.otp) {
      toast.error("All fields are required");
      return;
    }

    try {
      await verifyOTP(formData.email, formData.otp , dispatch , navigate  );
      toast.success("Login successful via OTP, welcome!");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

  
  return (

    <div
    className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 bg-cover bg-center"
    style={{
      backgroundImage: `url(${loginBg})`,
      backgroundBlendMode: "overlay",
    }}
  >
    <div className="backdrop-blur-md bg-white/30 p-8 rounded-xl shadow-2xl w-full max-w-md border border-white/40">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Welcome Back</h2>
  
      {/* Login Method Toggle */}
      <div className="flex justify-center mb-6 gap-2">
        <button
          className={`px-5 py-2 rounded-md font-medium transition ${
            loginMethod === "password"
              ? "bg-blue-700 text-white shadow"
              : "bg-white text-blue-700 border border-blue-700"
          }`}
          onClick={() => {
            setLoginMethod("password");
            setOtpSent(false);
          }}
        >
          Password
        </button>
        <button
          className={`px-5 py-2 rounded-md font-medium transition ${
            loginMethod === "otp"
              ? "bg-blue-700 text-white shadow"
              : "bg-white text-blue-700 border border-blue-700"
          }`}
          onClick={() => {
            setLoginMethod("otp");
            setOtpSent(false);
          }}
        >
          OTP
        </button>
      </div>
  
      {/* Login Form */}
      <form onSubmit={loginMethod === "password" ? handlePasswordLogin : handleOTPLogin} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.email}
          onChange={handleChange}
        />
  
        {loginMethod === "password" ? (
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.password}
            onChange={handleChange}
          />
        ) : !otpSent ? (
          <button
            type="button"
            onClick={handleOTPRequest}
            className="w-full bg-blue-700 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Send OTP
          </button>
        ) : (
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.otp}
            onChange={handleChange}
          />
        )}
  
        <button
          type="submit"
          className="w-full bg-blue-700 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition"
        >
          {loginMethod === "password" ? "Login" : "Verify OTP"}
        </button>
  
        <div className="text-right">
          <a href="/forgot-password" className="text-sm text-blue-800 hover:underline">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default Login;
