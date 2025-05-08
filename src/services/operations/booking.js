import { apiConnector } from "../../api/apiConnector";
import { toast } from "react-hot-toast";
import { booking } from "../../api/apis";


// cancel a booking : 
export const cancelBooking = async (bookingId, token) => {
  try {
    const response = await apiConnector("PUT", `${booking.CANCEL_BOOKING_API}/${bookingId}` , null, {
      Authorization: `Bearer ${token}`,
    });

    //console.log("Cancel Booking API response", response);

    if (response?.data?.success) {
      toast.success("Booking cancelled successfully");
      
      return true;
    } else {
      toast.error("Failed to cancel booking");
      return false;
    }
  } catch (error) {
    console.error("Cancel Booking API Error :", error);
    toast.error("Error occurred while cancelling booking");
    return false;
  }
};


  // get only booking ( user only )
  export const getUserBookings = async (token) => {
    try {
      const response = await apiConnector("GET", booking.USER_BOOKINGS_API, null, {
        Authorization: `Bearer ${token}`,
      });

     // console.log("Get User Booking API response" , response);
  
      if (response?.data?.success) {
        return response.data.bookings;
      } else {
        toast.error("Could not load your bookings");
        return [];
      }
    } catch (error) {
      console.error("fetching user bookings API Error:", error);
      toast.error("Server error while loading bookings");
      return [];
    }
  };
  

// get All booking ( for Admin)

export const getAllBookings = async (token) => {
    try {
      const response = await apiConnector("GET", booking.ALL_BOOKINGS_API, null, {
        Authorization: `Bearer ${token}`,
      });
      //console.log("Get All Bookings API response", response);

      if (response?.data?.success) {
        return response.data.bookings;
      } else {
        toast.error("Could not fetch bookings");
        return [];
      }
    } catch (error) {
      console.error("fetching all bookings API Error:", error);
      toast.error("Admin error while loading all bookings");
      return [];
    }
  };

 

 // delete a booking 
export const deleteBooking = async (bookingId, token) => {
  try {
    const response = await apiConnector(
      "DELETE",
      `${booking.DELETE_BOOKING_API}/${bookingId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    //console.log("Delete Booking API response", response);

    if (response?.data?.success) {
      toast.success("Booking deleted successfully");
      return true;
    } else {
      toast.error("Failed to delete booking");
      return false;
    }
  } catch (error) {
    console.error("Delete Booking API Error:", error);
    toast.error("Error occurred while deleting booking");
    return false;
  }
};





