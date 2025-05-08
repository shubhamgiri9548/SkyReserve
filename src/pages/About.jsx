import React from 'react';
import Footer from '../components/common/Footer';


const About = () => {

  return (
    <div>  
            
          <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex flex-col items-center p-8">
            <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
                    About AirBook
                  </h1>
                  <p className="text-gray-700 text-lg mb-6">
                    At AirBook, we believe in making your travel dreams come true. With our easy-to-use flight booking platform, you can find the best routes, prices, and schedules tailored just for you. We are committed to delivering top-notch customer service and seamless booking experiences.
                  </p>
                  <p className="text-gray-600 text-md mb-6">
                    Founded by passionate travelers and tech innovators, AirBook uses state-of-the-art technology to bring you quick search results, real-time updates, and secure transactions. Travel smarter, travel happier with AirBook.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-indigo-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-default">
                      <h3 className="font-semibold text-indigo-700 mb-2">Easy Booking</h3>
                      <p className="text-gray-600 text-sm">
                        Intuitive interface to book your flights in just a few clicks.
                      </p>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-default">
                      <h3 className="font-semibold text-indigo-700 mb-2">Best Prices</h3>
                      <p className="text-gray-600 text-sm">
                        We find competitive prices to get you the best deals every time.
                      </p>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-default">
                      <h3 className="font-semibold text-indigo-700 mb-2">24/7 Support</h3>
                      <p className="text-gray-600 text-sm">
                        Our friendly support team is here to help you at any time.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                    alt="Airplane flying over clouds"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
            
           
            {/* footer section */}
            <Footer /> 
        
      
      </div>

    
  );
};

export default About;
