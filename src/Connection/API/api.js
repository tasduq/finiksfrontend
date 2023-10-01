import axios from "axios";
import logout from "../API/logout";

// let url = "https://finiksbackend.herokuapp.com"; //Production backend
// let url = "https://finiksbackend-stg-b8ffcd2e360d.herokuapp.com"; //Stage backend

let url = "http://localhost:3002";

const instance = axios.create({
  baseURL: url,
});

instance.interceptors.request.use(
  async (config) => {
    const token = window.localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `${window.localStorage.getItem(
        "role"
      )} Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    // This callback is executed when there is a request error
    console.log("Request error:", err);
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => {
    // This callback is executed when a successful response is received
    return response;
  },
  (error) => {
    // This callback is executed when a response error occurs
    if (error.response && error.response.status === 401) {
      // Handle 401 unauthorized response here
      console.log("Unauthorized 401 response: ====>", error);
      if (error.response.status === 401) {
        logout();
        return;
      }
    }
    return Promise.reject(error);
  }
);

export { instance, url };
