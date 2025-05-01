import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const TOKEN = localStorage.getItem("token");

export const customAxios = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

customAxios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// customAxios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   let token = localStorage.getItem("token");
//   config.headers["Authorization"] = "Bearer " + token;
//   return config;
// });
