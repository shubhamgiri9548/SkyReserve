import React from "react";

const partners = [
    {
      name: "Emirates",
      src: "https://images.unsplash.com/photo-1627501691850-db08eb81199a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZW1pcmF0ZXN8ZW58MHx8MHx8fDA%3D",
      alt: "Emirates Logo",
    },
    {
      name: "IndiGo",
      src: "https://plus.unsplash.com/premium_photo-1678727128546-154b1725c336?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWdvJTIwZmxpZ2h0fGVufDB8fDB8fHww",
      alt: "IndiGo Logo",
    },
    {
      name: "SpiceJet",
      src: "https://images.unsplash.com/photo-1614872375964-9ee013fffbda?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpY2VmaWdodCUyMGZsaWdodHxlbnwwfHwwfHx8MA%3D%3D",
      alt: "SpiceJet Logo",
    },
   
  ];
  

  const TrustedPartners = () => {
    return (
      <section className="mt-32 w-full bg-gradient-to-b from-blue-50 to-blue-100 py-16">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-800 tracking-wide">
          Trusted Airline Partners
        </h2>
        <div className="max-w-6xl mx-auto px-6 rounded-3xl shadow-xl bg-white/80 backdrop-blur-sm">
          <div className="flex flex-wrap justify-center items-center gap-16 py-10">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex flex-col justify-center items-center w-80 h-80 p-5 bg-white rounded-2xl shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="h-40 object-contain"
                  loading="lazy"
                />
                <p className="mt-4 text-lg font-medium text-gray-700 text-center">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default TrustedPartners;
  