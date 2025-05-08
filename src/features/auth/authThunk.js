// features/auth/userThunks.js
import { setBookedFlights } from "./authSlice";
import { getUserBookings } from "../../services/operations/booking";

export const fetchUserBookings = () => async (dispatch, getState) => {
  const { token } = getState().auth;

  const bookings = await getUserBookings(token);

  dispatch(setBookedFlights(bookings));
  
};
