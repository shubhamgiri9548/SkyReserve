import React from "react";
import { useNavigate } from "react-router-dom";
import DestinationSection from "../components/HomePageComponents/DestinationSection";
import LimitedOffers from "../components/HomePageComponents/LimitedOffer";
import TrustedPartners from '../components/HomePageComponents/Partner';
import Footer from "../components/common/Footer";

const Home = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate('/flights');
  };

  return (
    <div className="pt-0">

      {/* Hero Section */}
      <section className="text-center mt-0 relative">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
          alt="Airplane in the sky"
          className="absolute inset-0 w-full h-full object-cover opacity-2"
          loading="lazy"
        />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4  text-gray-500">Welcome to AirBook</h1>
          <p className="text-lg text-gray-500 mb-6">
            Your one-stop solution for booking domestic and international flights.
          </p>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={handleBookingClick}
          >
            Book a Flight
          </button>
           
           {/* empty div */}
         <div className="h-[500px]">

         </div>

        </div>
      </section>

        {/* limitedOffer section */}
        <LimitedOffers />

      {/* Features Section */}
      <section className="mt-16 ml-8 mr-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6 shadow-md rounded-lg bg-blue-100">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=200&q=80"
            alt="Quick Booking"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h3 className="font-semibold text-xl mb-2">Quick Booking</h3>
          <p className="text-gray-600">Find and book flights in just a few clicks.</p>
        </div>
        <div className="p-6 shadow-md rounded-lg bg-blue-100">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=200&q=80"
            alt="Seat Selection"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h3 className="font-semibold text-xl mb-2">Refund Policy</h3>
          <p className="text-gray-600">You will get a full refund if you cancel your flight within 24 hours of booking.</p>
        </div>
        <div className="p-6 shadow-md rounded-lg bg-blue-100">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=200&q=80"
            alt="Instant Payments"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h3 className="font-semibold text-xl mb-2">Instant Payments</h3>
          <p className="text-gray-600">Secure and fast online payments.</p>
        </div>
      </section>


      {/* destinations section */}
      <DestinationSection />

      {/* TrustedPartners section */}
      <TrustedPartners />
       
       {/* fotter  */}
       <Footer />


    </div>
  );
};

export default Home;
