//export const BASE_URL = "http://localhost:4000/api/v1";
const BASE_URL = process.env.REACT_APP_BASE_URL

//auth endpoints
export const auth = {
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  LOGIN_API: `${BASE_URL}/auth/login`,
  RESET_PASSWORD_TOKEN_API: `${BASE_URL}/auth/reset-password-token`,
  RESET_PASSWORD_API: `${BASE_URL}/auth/reset-password`,
  REQUEST_OTP_API: `${BASE_URL}/auth/request-otp`,
  VERIFY_OTP_API: `${BASE_URL}/auth/verify-otp`,

};


// booking endpoints
export const booking = {
  CANCEL_BOOKING_API: `${BASE_URL}/bookings/cancel`,         // Requires /:id at call time
  USER_BOOKINGS_API: `${BASE_URL}/bookings/mybookings`,
  ALL_BOOKINGS_API: `${BASE_URL}/bookings/allbookings`,
  DELETE_BOOKING_API : `${BASE_URL}/bookings/delete`
};

// invoice endpoints
export const invoice = {
 // GENERATE_INVOICE_API: `${BASE_URL}/invoice/generate-invoice`,       
  DOWNLOAD_INVOICE_API: `${BASE_URL}/invoice/download-invoice`,
};

// flight endpoints 
export const flight = {
  CREATE_FLIGHT_API: `${BASE_URL}/flights/create`,
  GETALL_FLIGHTS_API: `${BASE_URL}/flights/getflight`,
  GET_FLIGHT_BY_ID: `${BASE_URL}/flights/getflight`,
  UPDATE_FLIGHT_API: `${BASE_URL}/flights/update`,
  DELETE_FLIGHT_API: `${BASE_URL}/flights/delete`,
  GET_PUBLIC_FLIGHTS_API: `${BASE_URL}/flights/public`, // for public only 
  
}

// payment endpoints 
export const payment  = {
  FLIGHT_BOOKING_API : `${BASE_URL}/payments/capture`,
  FLIGHT_VERIFY_API : `${BASE_URL}/payments/verify`,
}

//admin stats endpoints 

export const adminStats = {
  GET_ADMIN_STATS_API: `${BASE_URL}/admin/dashboard-stats`,
};






