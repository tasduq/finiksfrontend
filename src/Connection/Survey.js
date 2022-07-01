import axios from "axios";
// let url = "http://localhost:3001";
let url = "https://finiksbackend.herokuapp.com";

const addSurvey = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/survey/addsurvey`, data);

  console.log(res);
  return res;
};

const getCampaignsSurveys = async (data) => {
  console.log(data);
  let res = await axios.get(`${url}/api/survey/getcampaignssurveys`, data);

  console.log(res);
  return res;
};

export { addSurvey, getCampaignsSurveys };
