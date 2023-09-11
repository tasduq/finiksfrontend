import axios from "axios";
import { instance, url } from "./API/api";
// let url = "http://localhost:3001";
// let url = "https://finiksbackend.herokuapp.com";

const addTag = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/tags/addTag`, data);

  console.log(res);
  return res;
};

const editTag = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/tags/edittag`, data);

  console.log(res);
  return res;
};

const getTags = async (data) => {
  console.log(data);
  let res = await instance.get(`${url}/api/tags/gettags`);

  console.log(res);
  return res;
};
const getTagsByClients = async (data) => {
  console.log(data);
  let res = await instance.get(`${url}/api/tags/gettagsbyclients`);

  console.log(res);
  return res;
};

const getTagInfo = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/tags/gettaginfo`, data);

  console.log(res);
  return res;
};

const mergeTags = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/tags/mergetags`, data);

  console.log(res);
  return res;
};

const getClientTags = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/tags/getclienttags`, data);

  console.log(res);
  return res;
};

const deleteTag = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/tags/deletetag`, data);
  console.log(res);
  return res;
};

const connectTagsToUsers = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/tags/connecttagtouser`, data);
  console.log(res);
  return res;
};

export {
  addTag,
  getTags,
  getTagInfo,
  getTagsByClients,
  mergeTags,
  editTag,
  getClientTags,
  deleteTag,
  connectTagsToUsers,
};
