// src/services/flightAPI.js
import { apiConnector } from "../../api/apiConnector";
import { flight } from "../../api/apis";


// for admin only
export const getAllFlights = async (token) => {
  try {
    const response = await apiConnector("GET", flight.GETALL_FLIGHTS_API , null , 
      {
        Authorization: `Bearer ${token}`,
      } 
    );
    //console.log("GET All Flights API response:", response);
    return response?.data.flights;   
               
  } catch (error) {
    console.error("Error fetching flights", error);
    throw error;
  }
};

// for public only 
export const getAllFlightPublic = async () => {
  
  try {
    const response = await apiConnector("GET", flight.GET_PUBLIC_FLIGHTS_API);
    console.log("GET Public Flights API response:", response);
    return response?.data.flights;   
  } catch (error) {
    console.error("Error fetching public flights", error);
    throw error;
  }
}

// get flight by id --> 

export const getFlightById = async (flightId) => {
 
   try {
    const response = await apiConnector("GET", `${flight.GET_FLIGHT_BY_ID}/${flightId}`);
    //console.log("GET Flight by ID API response:", response);
    
    return response?.flight;
   } catch (error) {
    console.error("Error fetching flight by ID", error);
    throw error;
   }    
};



// ✅ Create flight
export const createFlight = async (flightData, token) => {
  try {
    const response = await apiConnector(
      "POST",
      flight.CREATE_FLIGHT_API,
      flightData,
      {
        Authorization: `Bearer ${token}`, // don't forget token if needed
      }
    );
   // console.log("CREATE Flight API response:", response);

    return response?.data;

  } catch (error) {
    console.error("Error creating flight", error?.response?.data || error);
    return {
      success: false,
      message:
        error?.response?.data?.message || "Failed to create flight",
    };
  } 
};


// delete the flight
export const deleteFlightById = async (flightId , token ) => {
  
  try {
    const response = await apiConnector(
      "DELETE",
      `${flight.DELETE_FLIGHT_API}/${flightId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

   // console.log("DELETE Flight API response:", response);
    return response?.message || "Flight deleted successfully";
  } catch (error) {
    console.error("Error deleting flight", error);
    throw error;
  }

}





