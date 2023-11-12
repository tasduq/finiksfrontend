// import instance from "instance";
import { instance, url } from "./API/api";
// let url = "http://localhost:3001";
// let url = "https://finiksbackend.herokuapp.com";

const register = async (data) => {
  console.log(data);
  let res;
  res = await instance.post(`${url}/api/teammember/registerteammember`, data);
  console.log(res);
  return res;
};

const loginTeam = async (data) => {
  console.log(data, "i am team login");
  let res = await instance.post(`${url}/api/teammember/loginteammember`, data);
  console.log(res);
  return res;
};

const otpTeam = async (data) => {
  console.log(data, "i am team login");
  let res = await instance.post(`${url}/api/teammember/emailverify`, data);
  console.log(res);
  return res;
};

const newOtp = async (data) => {
  console.log(data, "i am team login");
  let res = await instance.post(`${url}/api/teammember/newotp`, data);
  console.log(res);
  return res;
};

const joinCampaign = async (data) => {
  console.log(data, "i am team login");
  let res = await instance.post(`${url}/api/teammember/joincampaign`, data);
  console.log(res);
  return res;
};

const getJoinedCampaigns = async (data) => {
  console.log(data, "i am team login");
  let res = await instance.post(
    `${url}/api/teammember/getjoinedcampaigns`,
    data
  );
  console.log(res);
  return res;
};

const getTeamPhonebankRecords = async (data) => {
  console.log(data, url, "checkme =====>");
  let res = await instance.post(
    `${url}/api/teammember/getteamphonebankrecords`,
    data
  );

  console.log(res);
  return res;
};

const getList = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/teammember/getlist`, data);

  console.log(res);
  return res;
};

const getScript = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/teammember/getscript`, data);

  console.log(res);
  return res;
};

const getTags = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/teammember/gettags`, data);

  console.log(res);
  return res;
};

const getAdminTags = async (data) => {
  console.log(data);
  let res = await instance.get(`${url}/api/teammember/getadmintags`);

  console.log(res);
  return res;
};

const getSurvey = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/teammember/getsurvey`, data);

  console.log(res);
  return res;
};

const newPassword = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/teammember/newpassword`, data);
  console.log(res);
  return res;
};

const updatePassword = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/teammember/updatepassword`, data);
  console.log(res);
  return res;
};
const addToTeam = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/teammember/addtoteam`, data);
  console.log(res);
  return res;
};

const updateVoterInfo = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/teammember/updatevoterinfo`, data);
  console.log(res);
  return res;
};
const updateVoterInfoFromCanvassingSinglePerson = async (data) => {
  console.log(data);
  let res = await instance.post(
    `${url}/api/teammember/updatevoterinfofromcanvassingsingleperson`,
    data
  );
  console.log(res);
  return res;
};

const getInvitedVoters = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/teammember/getinvitedvoters`, data);
  console.log(res);
  return res;
};

const getInvitedTeamMembers = async (data) => {
  console.log(data);
  let res = await instance.post(
    `${url}/api/teammember/getinvitedteammembers`,
    data
  );
  console.log(res);
  return res;
};

const cancelInvite = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/teammember/cancelinvite`, data);
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
  newPassword,
  updatePassword,
  addToTeam,
  updateVoterInfo,
  getInvitedVoters,
  getAdminTags,
  getInvitedTeamMembers,
  cancelInvite,
  updateVoterInfoFromCanvassingSinglePerson,
};
