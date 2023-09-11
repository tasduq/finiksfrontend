import axios from "axios";
import { instance, url } from "./API/api";
import logout from "./API/logout";
// let url = "http://localhost:3001";
// let url = "https://finiksbackend.herokuapp.com";

const getLists = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/list/getlists`, data);

  // console.log(res, "i am getlist response");

  return res;
};

const getRecords = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/phonebank/getrecords`, data);

  console.log(res);
  return res;
};

const searchVoters = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/list/querydata`, data);

  console.log(res);
  return res;
};

const saveList = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/list/savelist`, data);

  console.log(res);
  return res;
};

const saveRecord = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/phonebank/saverecord`, data);

  console.log(res);
  return res;
};

const updateRecord = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/phonebank/updaterecord`, data);

  console.log(res);
  return res;
};

const updateList = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/phonebank/updatelist`, data);

  console.log(res);
  return res;
};

const deleteList = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/phonebank/deletelist`, data);

  console.log(res);
  return res;
};

const editList = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/phonebank/editlist`, data);

  console.log(res);
  return res;
};

const getCampaignTeammembers = async (data) => {
  console.log(data);
  let res = await instance.post(
    `${url}/api/phonebank/getcampaignteammembers`,
    data
  );

  console.log(res);
  return res;
};

export {
  getLists,
  searchVoters,
  saveList,
  updateList,
  deleteList,
  editList,
  saveRecord,
  getRecords,
  getCampaignTeammembers,
  updateRecord,
};
