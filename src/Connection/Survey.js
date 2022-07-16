import axios from "axios";
// let url = "http://localhost:3001";
let url = "https://finiksbackend.herokuapp.com";

const addSurvey = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/survey/addsurvey`, data);

  console.log(res);
  return res;
};

const getClientSurvey = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/survey/getclientsurvey`, data);

  console.log(res);
  return res;
};

const getClientSurveyResponses = async (data) => {
  console.log(data);
  let res = await axios.post(
    `${url}/api/survey/getcampaignsurveyresponses`,
    data
  );

  console.log(res);
  return res;
};

const getCampaigns = async (data) => {
  // console.log(data);
  let res = await axios.get(`${url}/api/survey/getcampaigns`);

  console.log(res);
  return res;
};

const getCampaignSurveys = async (data) => {
  // console.log(data);
  let res = await axios.post(`${url}/api/survey/getcampaignsurveys`, data);

  console.log(res);
  return res;
};

export {
  addSurvey,
  getCampaigns,
  getClientSurvey,
  getClientSurveyResponses,
  getCampaignSurveys,
};
