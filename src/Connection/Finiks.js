import axios from "axios";
let url = "http://localhost:3001";
// let url = 'https://hftcapi.herokuapp.com';

const getFiniksData = async (data) => {
  let res = await axios.post(`${url}/api/finiks/getfiniksdata`, data);

  console.log(res);
  return res;
};

export { getFiniksData };
