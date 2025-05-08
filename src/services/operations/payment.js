
// new logic :: 

import { toast } from "react-hot-toast";
import { apiConnector } from "../../api/apiConnector";
import rzpLogo from "../../assets/rozarpayLogo.png";
import { payment } from "../../api/apis";

export const bookFlight = async ({
  token,
  flightId,
  seatsRequested,
  userDetails,
  dispatch,
  navigate,
}) => {
  const toastId = toast.loading("Initializing Payment...");

  try {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    const orderRes = await apiConnector(
      "POST",
      payment.FLIGHT_BOOKING_API,
      { flightId, seatsRequested },
      { Authorization: `Bearer ${token}` }
    );
     
    //console.log("OrderResponse -->" , orderRes);


     if (!orderRes?.data?.success || !orderRes?.data?.order) {
      throw new Error(orderRes?.data?.message || "Payment initialization failed");
    }
    
    const { order, bookingId } = orderRes.data;   // ✅ correct


    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "Flight Booking",
      description: "Secure flight reservation",
      image: rzpLogo,
      order_id: order.id,
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
      },
      handler: async (response) => {
        try {
          await verifyFlightPayment({
            ...response,
            bookingId,
            token,
            navigate,
          });
        } catch (err) {
          console.error("Error in handler during verify:", err);
          toast.error("Payment verification failed inside handler");
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);

    razor.open();

    razor.on("payment.failed", function (response) {
      console.error("Payment failed:", response.error);
      toast.dismiss(toastId);
      toast.error("Payment Failed. Please try again.");
    });
  } catch (error) {
    console.error("Booking error:", error);
    toast.error("Flight booking failed");
  } finally {
    toast.dismiss(toastId); // this will dismiss only init toast
  }
};

async function verifyFlightPayment({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  bookingId,
  token,
  navigate,
}) {
  const toastId = toast.loading("Verifying Payment...");

  try {
    const verifyRes = await apiConnector(
      "POST",
      payment.FLIGHT_VERIFY_API,
      {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        bookingId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!verifyRes.data.success) {
      throw new Error(verifyRes.data.message);
    }

    toast.success("Flight booked successfully!");
    navigate("/dashboard/bookings");
  } catch (err) {
    console.error("Verification error:", err);
    toast.error("Payment verification failed");
  } finally {
    toast.dismiss(toastId); // this dismisses the verification loader
  }
}

function loadRazorpayScript() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}


