import axios from "axios";
// let url = "http://localhost:3001";
let url = "https://finiksbackend.herokuapp.com";

const register = async (data) => {
  console.log(data);
  let res;
  res = await axios.post(`${url}/api/teammember/registerteammember`, data);
  console.log(res);
  return res;
};

const loginTeam = async (data) => {
  console.log(data, "i am team login");
  let res = await axios.post(`${url}/api/teammember/loginteammember`, data);
  console.log(res);
  return res;
};

const otpTeam = async (data) => {
  console.log(data, "i am team login");
  let res = await axios.post(`${url}/api/teammember/emailverify`, data);
  console.log(res);
  return res;
};

const newOtp = async (data) => {
  console.log(data, "i am team login");
  let res = await axios.post(`${url}/api/teammember/newotp`, data);
  console.log(res);
  return res;
};

const joinCampaign = async (data) => {
  console.log(data, "i am team login");
  let res = await axios.post(`${url}/api/teammember/joincampaign`, data);
  console.log(res);
  return res;
};

const getJoinedCampaigns = async (data) => {
  console.log(data, "i am team login");
  let res = await axios.post(`${url}/api/teammember/getjoinedcampaigns`, data);
  console.log(res);
  return res;
};

const getTeamPhonebankRecords = async (data) => {
  console.log(data);
  let res = await axios.post(
    `${url}/api/teammember/getteamphonebankrecords`,
    data
  );

  console.log(res);
  return res;
};

const getList = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/teammember/getlist`, data);

  console.log(res);
  return res;
};

const getScript = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/teammember/getscript`, data);

  console.log(res);
  return res;
};

const getTags = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/teammember/gettags`, data);

  console.log(res);
  return res;
};

const getSurvey = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/teammember/getsurvey`, data);

  console.log(res);
  return res;
};

export {
  register,
  loginTeam,
  otpTeam,
  newOtp,
  joinCampaign,
  getJoinedCampaigns,
  getTeamPhonebankRecords,
  getList,
  getScript,
  getTags,
  getSurvey,
};