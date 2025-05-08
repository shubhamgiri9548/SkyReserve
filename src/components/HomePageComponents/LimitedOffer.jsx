import { useState, useEffect } from "react";
import { MegaphoneOff } from 'lucide-react' 


const offers = [
    {
      title: "20% Off on International Flights",
      subtitle: "Book now and save big on global travel!",
      image: "https://images.unsplash.com/photo-1611403570720-162d8829689a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b2ZmZXJ8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Summer Special: Discount to Europe",
      subtitle: "Explore Europe at exciting prices!",
      image: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1600&q=80",
    },
    {
      title: "Flash Sale: 10% Off Domestic Flights",
      subtitle: "Limited seats available. Hurry!",
      image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1600&q=80",
    },
  ];
  

export default function LimitedOffers() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = offers[currentIndex];

  return (

    <div className="w-full mt-16">
      <h2 className="text-3xl font-bold text-center mb-4 flex items-center justify-center gap-2">
        <MegaphoneOff className="text-red-500" size={30} />
        Limited-Time Offers
      </h2>

      <div className="relative overflow-hidden rounded-xl max-w-6xl mx-auto shadow-sm">
        
        <img src={current.image}  className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
          <h3 className="text-2xl font-semibold">{current.title}</h3>
          <p className="text-sm mt-2">{current.subtitle}</p>
        </div>
      </div>


    </div>
  );
}
