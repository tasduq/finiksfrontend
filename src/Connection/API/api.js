import axios from "axios";

let url = "https://finiksbackend.herokuapp.com"; //Production backend
// let url = "https://finiksbackend-stg-b8ffcd2e360d.herokuapp.com"; //Stage backend

// let url = "http://localhost:3002";

const instance = axios.create({
  baseURL: url,
});

instance.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default url;
