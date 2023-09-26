import axios from "axios";
import { instance, url } from "./API/api";
// let url = "http://localhost:3001";
// let url = "https://finiksbackend.herokuapp.com";

const getFiniksData = async (data) => {
  let res = await instance.post(`${url}/api/finiks/getfiniksdata`, data);

  console.log(res);
  return res;
};

const getFiniksDataCount = async (data) => {
  let res = await instance.get(`${url}/api/finiks/getfinikstotalcount`);

  console.log(res);
  return res;
};

export { getFiniksData, getFiniksDataCount };
