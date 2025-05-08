import { apiConnector } from "../../api/apiConnector";
import { auth } from "../../api/apis";
import { setUser } from "../../features/auth/authSlice"; // update path if needed


export const signupUser = async (formData) => {
  try {
    const response = await apiConnector("POST", auth.SIGNUP_API, formData);
    console.log("Signup API response" , response);
    return response;

  } catch (err) {
    console.log("Signup API Error" , err);
    throw err;
  }
};


export const loginUser = async (email, password , dispatch, navigate) => {
  
   try {
      const response =  await apiConnector("POST", auth.LOGIN_API, { email, password });
      //console.log("User API response" , response);
      // extra logic due to redux

     if (response?.success) {
      const user = response.user;
      const token = response.token;
        
        try {
          localStorage.setItem("token", token);
          //console.log("Token saved to localStorage:", localStorage.getItem("token"));
        } catch (e) {
          console.error("Error saving token:", e);
        }
        dispatch(setUser({ user, token }));  // Update Redux state
        
        //  Fix: Navigate based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }

      }
      return response;

   } catch (err) {
      console.log("Login API Error", err);
      throw err;
   }
};


export const requestOTP = async (email) => {
   try {
    const response = await apiConnector("POST", auth.REQUEST_OTP_API, { email });
    console.log("Request OTP API response" , response);
    return response;
   } catch (err) {
     console.log("Request OTP API Error", err);
     throw err;
   }
};


export const verifyOTP = async (email, otp, dispatch, navigate) => {
  try {
    const response = await apiConnector("POST", auth.VERIFY_OTP_API, { email, otp });
    console.log("Verify OTP API response", response);

    if (response?.success) {
      const user = response.user;
      const token = response.token;

      try {
        localStorage.setItem("token", token);
        console.log("Token saved to localStorage:", localStorage.getItem("token"));
      } catch (e) {
        console.error("Error saving token:", e);
      }

      dispatch(setUser({ user, token })); // Update Redux state

      // Navigate based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    }

    return response;
  } catch (err) {
    console.log("Verify OTP API Error", err);
    throw err;
  }
};


export const sendResetPasswordToken = async (email) => {
  try {
    const response = await apiConnector("POST", auth.RESET_PASSWORD_TOKEN_API, {
      email,
    });
    console.log("Reset Password Token API response:", response);
    return response;
  } catch (err) {
    console.error("Reset Password Token API error:", err);
    throw err;
  }
};



export const resetPassword = async ({ password, confirmPassword, token }) => {
  try {
    const response = await apiConnector("POST", auth.RESET_PASSWORD_API, {
      password,
      confirmPassword,
      token,
    });
    console.log("Reset Password API response:", response);
    return response;
  } catch (err) {
    console.error("Reset Password API error:", err);
    throw err;
  }
};





