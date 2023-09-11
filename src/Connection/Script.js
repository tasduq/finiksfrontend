// import instance from "axios";
import { instance, url } from "./API/api";
// let url = "http://localhost:3001";
// let url = "https://finiksbackend.herokuapp.com";

const createScript = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/script/createscript`, data);

  console.log(res);
  return res;
};

const getScripts = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/script/getscripts`, data);

  console.log(res);
  return res;
};

const deleteScript = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/script/deletescripts`, data);

  console.log(res);
  return res;
};
const editScript = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/script/editscripts`, data);

  console.log(res);
  return res;
};

export { createScript, getScripts, deleteScript, editScript };
