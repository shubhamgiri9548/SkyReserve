import { apiConnector } from "../../api/apiConnector";
import { adminStats } from "../../api/apis";


export const getAdminData = async (token) => {

    try {
        const response = await apiConnector("GET" , adminStats.GET_ADMIN_STATS_API , null ,
            { Authorization: `Bearer ${token}` }
        );

        //console.log("response of getAdmin API" , response);
        return response;
    } catch (error) {
        console.error("Error fetching admin data:", error);
        throw error;
    }   
};