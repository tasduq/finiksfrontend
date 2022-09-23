import axios from "axios";
import url from "./API/api";
// let url = "http://localhost:3001";
// let url = "https://finiksbackend.herokuapp.com";

const getAristotleData = async (data) => {
  let res = await axios.post(`${url}/api/aristotle/getaristotledata`, data);

  console.log(res);
  return res;
};

export { getAristotleData };
