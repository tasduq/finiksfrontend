import axios from "axios";
let url = "http://localhost:3001";
// let url = "https://adsbackend2.herokuapp.com";

const getClients = async (data) => {
  console.log(data);
  let res;
  res = await axios.get(`${url}/api/clients/getclients`);
  console.log(res);
  return res;
};

const editClient = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/clients/editclient`, data);
  console.log(res);
  return res;
};

export { getClients, editClient };
