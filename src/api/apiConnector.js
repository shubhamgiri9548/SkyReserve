

import axios from 'axios';

export const apiConnector = async (method, url, bodyData = {}, headers = {}, config = {}) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: bodyData,
      headers: headers,
      ...config,
    });

    // If it's a blob (like PDF), return the full response (we need raw data)
    if (config.responseType === "blob") {
      return response;
    }

    // Otherwise, return just the data like before
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error.response?.data || { message: 'Something went wrong' };
  }
};





// older logic

// export const apiConnector = async (method, url, bodyData = {}, headers = {}) => {
//   try {
//     const response = await axios({
//       method: method,
//       url: url,
//       data: bodyData,
//       headers: headers,
//     });
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error.response?.data || { message: 'Something went wrong' };
//   }
// };
