import axios from "axios";
// let url = "http://localhost:3001";
let url = "https://finiksbackend.herokuapp.com";

const addSurvey = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/survey/addsurvey`, data);

  console.log(res);
  return res;
};
const editSurvey = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/survey/editsurvey`, data);

  console.log(res);
  return res;
};

const deleteSurvey = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/survey/deletesurvey`, data);

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

const takeSurvey = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/survey/takesurvey`, data);

  console.log(res);
  return res;
};

const doNotCall = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/survey/donotcall`, data);

  console.log(res);
  return res;
};

const saveInteraction = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/survey/saveinteraction`, data);

  console.log(res);
  return res;
};

const wrongNumber = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/survey/wrongnumber`, data);

  console.log(res);
  return res;
};

export {
  addSurvey,
  editSurvey,
  deleteSurvey,
  getCampaigns,
  getClientSurvey,
  getClientSurveyResponses,
  getCampaignSurveys,
  takeSurvey,
  doNotCall,
  saveInteraction,
  wrongNumber,
};
