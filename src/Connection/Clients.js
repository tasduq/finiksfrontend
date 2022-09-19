import axios from "axios";
// let url = "http://localhost:3001";
let url = "https://finiksbackend.herokuapp.com";

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

const deleteClient = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/clients/deleteclient`, data);
  console.log(res);
  return res;
};

const getDistricts = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/clients/getdistricts`, data);
  console.log(res);
  return res;
};

const getAnalytics = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/clients/getanalytics`, data);
  console.log(res);
  return res;
};

export { getClients, editClient, deleteClient, getDistricts, getAnalytics };
