// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Try to get user and token from localStorage on initial load
const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  loading: false,
  bookedFlights: [], // 🔹 NEW
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Persist to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },

    logout(state) {
      state.user = null;
      state.token = null;
      state.bookedFlights = []; // 🔹 Clear bookings on logout

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setBookedFlights(state, action) {
      state.bookedFlights = action.payload; // 🔹 NEW
    },
  },
});

export const { setUser, logout, setLoading, setBookedFlights } = authSlice.actions;
export default authSlice.reducer;
