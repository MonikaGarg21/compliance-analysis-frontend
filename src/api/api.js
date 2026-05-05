import axios from "axios";

// without interceptor:
// axios.post("http://localhost:5000:/api/auth/signup",{
//     data
// },{
//     withCredentials:true,
// })

// create an axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // adjusted to match typical API structure
  withCredentials: true, // required for cookies
});

// request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //global error handling
    if (error.response) {
      console.error("API Error:", error.response.data.message || error.message);
    } else if (error.request) {
      console.error("Network Error: No response received");
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default api;

// try {
//       const res = await api.post("/auth/signin", formData, {
//         withCredentials: true,
//       });

//       if (res.status === 200) {
//         alert("Login successfully");
//         console.log(res.data);
//       }
//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     }
