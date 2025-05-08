// src/pages/Flights.jsx
import React, { useEffect , useState , useRef  } from "react";
import toast from 'react-hot-toast';
import FlightCard from "../components/FlightCard";
import { Plane } from "lucide-react";
import {  getAllFlightPublic} from "../services/operations/flight";
import Footer from '../components/common/Footer';


export default function Flights() {
    
  
   const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     
    // to avoding the two times toast 
    const toastShownRef = useRef(false);


    useEffect(() => {
      const fetchFlights = async () => {
        try {
          const response = await getAllFlightPublic();
        
          
          if (response && Array.isArray(response)) {
             // Show toast only once
          if (!toastShownRef.current) {
            toast.success("Flights fetched successfully!");
            toastShownRef.current = true;
          }
            setFlights(response); // ✅ this sets the flights array correctly
          } else {
            console.error("Expected an array, got:", response);
            setError("Failed to fetch flights data.");
          }
        } catch (error) {
          console.error("Failed to fetch flights:", error);
          setError("Failed to fetch flights data.");
        } finally {
          setLoading(false);
        }
      };
    
      fetchFlights();
    }, []);
    

  return (
   
    <div>

    <div className="p-6 bg-gray-100 min-h-screen">
       {/* header section  */}
       <header className="max-w-4xl mx-auto mb-6 text-center">
          <div className="flex justify-center items-center gap-3 mb-2">
            <Plane className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-extrabold text-gray-800">Book Your Next Flight</h1>
          </div>
          <p className="text-gray-600 text-base sm:text-lg">
            Browse and book from our list of available flights below. Safe, fast, and convenient!
          </p>
          <div className="mt-4 text-gray-700 text-lg font-medium">
            Showing {flights.length} flight{flights.length !== 1 && "s"} available
          </div>
      </header>


      {loading ? (
        <p className="text-center text-lg text-gray-700">Loading flights...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flights.map((flight) => (
            <FlightCard key={flight._id} flight={flight} />
          ))}
        </div>
      )}
    </div>
      
      
       <Footer />  {/* Added Footer component here */}
       
      
    </div>
  );
}