import axios from "axios";
// let url = "http://localhost:3001";
let url = "https://finiksbackend.herokuapp.com";

const updateProfile = async (data) => {
  let res = await axios.post(`${url}/api/campaign/updateprofile`, data);

  console.log(res);
  return res;
};

export { updateProfile };
