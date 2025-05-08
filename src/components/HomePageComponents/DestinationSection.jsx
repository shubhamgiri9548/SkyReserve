import React from "react";

const DestinationSection = () => {
  return (
     
     <section className="mt-24 max-w-6xl mx-auto px-4">
     <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Popular Destinations</h2>
     <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
       Explore some of the most loved destinations with AirBook. Book your next adventure today!
     </p>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
       <div className="rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-shadow">
         <img
           src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"
           alt="Maldives Beach"
           className="w-full h-48 object-cover"
           loading="lazy"
         />
         <div className="p-4 bg-white">
           <h3 className="font-semibold text-lg text-indigo-700">Maldives</h3>
           <p className="text-gray-600 text-sm">Tropical paradise with pristine beaches.</p>
         </div>
       </div>
       <div className="rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-shadow">
         <img
           src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=400&q=80"
           alt="Paris"
           className="w-full h-48 object-cover"
           loading="lazy"
         />
         <div className="p-4 bg-white">
           <h3 className="font-semibold text-lg text-indigo-700">Paris</h3>
           <p className="text-gray-600 text-sm">The city of lights and romance.</p>
         </div>
       </div>
       <div className="rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-shadow">
         <img
           src="https://plus.unsplash.com/premium_photo-1682657000431-84ea0dcf361c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5ldyUyMHlvcmslMjBjaXR5fGVufDB8fDB8fHww"
           alt="New York City"
           className="w-full h-48 object-cover"
           loading="lazy"
         />
         <div className="p-4 bg-white">
           <h3 className="font-semibold text-lg text-indigo-700">New York City</h3>
           <p className="text-gray-600 text-sm">The city that never sleeps.</p>
         </div>
       </div>
       <div className="rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-shadow">
         <img
           src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80"
           alt="Tokyo"
           className="w-full h-48 object-cover"
           loading="lazy"
         />
         <div className="p-4 bg-white">
           <h3 className="font-semibold text-lg text-indigo-700">Tokyo</h3>
           <p className="text-gray-600 text-sm">A bustling metropolis blending tradition and technology.</p>
         </div>
       </div>
     </div>
     
   </section>
  );
};

export default DestinationSection;