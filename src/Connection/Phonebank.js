import axios from "axios";
let url = "http://localhost:3001";
// let url = 'https://hftcapi.herokuapp.com';

const getLists = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/phonebank/getlists`, data);

  console.log(res);
  return res;
};

const searchVoters = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/phonebank/queryphonebank`, data);

  console.log(res);
  return res;
};

const saveList = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/phonebank/savelist`, data);

  console.log(res);
  return res;
};

const updateList = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/phonebank/updatelist`, data);

  console.log(res);
  return res;
};

const deleteList = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/phonebank/deletelist`, data);

  console.log(res);
  return res;
};

const editList = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/phonebank/editlist`, data);

  console.log(res);
  return res;
};

export { getLists, searchVoters, saveList, updateList, deleteList, editList };
