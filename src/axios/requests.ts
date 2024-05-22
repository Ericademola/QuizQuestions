import axios from "axios";
import Cache from "./cache"

const BASEURL = "https://qt.organogram.app";

// Add a request interceptor
axios.interceptors.request.use((config) => {
  // Do something before request is sent
  config.headers.Accept = "application/json";
  
  // if (!config?.url.includes("/auth/login/")) {
    const token = Cache.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token
        .split("")
        .reverse()
        .join("")}`;
    }
    config.headers["PUSHIT-POS-ACCESS-CONTROL"] = process.env.ACTION_KEY;
  // }
  return config;
});


// axios.interceptors.response.use(
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   (response) => {
//     tokenHandler(response?.config?.url as string, response?.data?.data);
//     return response.data;
//   },

//   (error) => {
//     if (error) {
//       if (
//         error?.response?.data &&
//         error.response.data.code === 401 &&
//         (error.response.data.message.includes("Authorization failed") ||
//           error.response.data.message ===
//             "User not authorized to perform action.")
//       ) {
//         axios
//           .post(`${BASEURL}/auth/logout`)
//           .then(() => {
//             handleLogout();
//           })
//           .catch(() => {
//             handleLogout();
//           });
//       }
//     }
//     return Promise.reject(
//       error?.response?.data ? error?.response?.data : error
//     );
//   }
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
// );

export const getRequest = async (path: string) =>
  axios.get(`${BASEURL}${path}`);

export const postRequest = async (path: string, body: any) =>
  axios.post(`${BASEURL}${path}`, body);

export const putRequest = async (path: string, body: any) =>
  axios.put(`${BASEURL}${path}`, body);

export const patchRequest = async (path: string, body: any) =>
  axios.patch(`${BASEURL}${path}`, body);

export const deleteRequest = async (path: string) =>
  axios.delete(`${BASEURL}${path}`);
