import axios from "axios";
import { instance, url } from "./API/api";
// let url = "http://localhost:3001";
// let url = "https://finiksbackend.herokuapp.com";

const getLists = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/list/getlists`, data);

  console.log(res);
  return res;
};

const getRecords = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/canvassing/getrecords`, data);

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
  let res = await instance.post(`${url}/api/canvassing/saverecord`, data);

  console.log(res);
  return res;
};

// const searchVoters = async (data) => {
//   console.log(data);
//   let res = await instance.post(`${url}/api/canvassing/querycanvassing`, data);

//   console.log(res);
//   return res;
// };

// const saveList = async (data) => {
//   console.log(data);
//   let res = await instance.post(`${url}/api/canvassing/savelist`, data);

//   console.log(res);
//   return res;
// };

const updateRecord = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/canvassing/updaterecord`, data);

  console.log(res);
  return res;
};

const updateList = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/canvassing/updatelist`, data);

  console.log(res);
  return res;
};

const deleteList = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/canvassing/deletelist`, data);

  console.log(res);
  return res;
};

const editList = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/canvassing/editlist`, data);

  console.log(res);
  return res;
};

const searchVotersForcanvassing = async (data) => {
  console.log(data);
  let res = await instance.post(
    `${url}/api/canvassing/searchvotersforcanvassing`,
    data
  );

  console.log(res);
  return res;
};

const searchCanvassingList = async (data) => {
  console.log(data);
  let res = await instance.post(
    `${url}/api/canvassing/searchcanvassinglists`,
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
  updateRecord,
  searchVotersForcanvassing,
  searchCanvassingList,
};
