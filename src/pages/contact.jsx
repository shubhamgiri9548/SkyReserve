import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Footer from '../components/common/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const { name, email, message } = formData;
  
    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill out all fields before submitting.');
      return;
    }
  
    console.log('Form submitted:', formData);
  
    // Show success toast
    toast.success('Message sent successfully!');
  
    // Clear the form
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };
  
  

  return (
    <div>
     <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-16">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Left Info Panel */}
          <div className="md:w-1/2 bg-blue-600 text-white p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="mb-6 text-lg">Have questions about flights, bookings, or just want to say hi? We'd love to hear from you!</p>
            <div className="space-y-3 text-base">
              <p><span className="font-semibold">Email:</span> support@airbook.com</p>
              <p><span className="font-semibold">Phone:</span> +91-9876543210</p>
              <p><span className="font-semibold">Location:</span> 123, Airport Road, Delhi, India</p>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="md:w-1/2 p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-yellow-300 hover:text-black transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
          
           

        </div>
         {/* footer section */}
         <Footer /> 

    </div>
  );
};

export default Contact;
