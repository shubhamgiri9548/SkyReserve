// components/auth/ForgotPasswordForm.jsx
import React, { useState } from "react";
import { sendResetPasswordToken } from "../services/operations/auth";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await sendResetPasswordToken(email);
      setMessage(res?.data?.message || "Check your email for reset link.");
    } catch (err) {
      setMessage("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        {message && <p className="text-center text-sm text-gray-700">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
