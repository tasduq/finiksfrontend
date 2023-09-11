import axios from "axios";
import { instance, url } from "./API/api";
// let url = "http://localhost:3001";
// let url = "https://finiksbackend.herokuapp.com";

const register = async (data) => {
  console.log(data);
  let res;
  res = await instance.post(`${url}/api/campaign/registercampaign`, data);
  console.log(res);
  return res;
};

const loginCampaign = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/campaign/logincampaign`, data);
  console.log(res);
  return res;
};

export { register, loginCampaign };
