import axios from "axios";
import { instance, url } from "./API/api";
// let url = "http://localhost:3001";
// let url = "https://finiksbackend.herokuapp.com";

const getNewCode = async (data) => {
  console.log(data);
  let res = await instance.get(`${url}/api/campaign/getnewcode`);
  console.log(res);
  return res;
};

const updateCampaignData = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/campaign/updatecampaigndata`, data);
  console.log(res);
  return res;
};

const getCampaignData = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/campaign/getcampaigndata`, data);
  console.log(res);
  return res;
};

const getCampaignFilterData = async (data) => {
  console.log(data);
  let res = await instance.post(
    `${url}/api/campaign/getcampaignfilterdata`,
    data
  );
  console.log(res);
  return res;
};

const inviteTeamMember = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/teammember/inviteteammember`, data);
  console.log(res);
  return res;
};

const editTeamMember = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/teammember/editteammember`, data);
  console.log(res);
  return res;
};

const getTeam = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/campaign/getteammembers`, data);
  console.log(res);
  return res;
};

const getTeamAdmin = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/campaign/getteamadmin`, data);
  console.log(res);
  return res;
};

const getCampaignTeammembers = async (data) => {
  console.log(data);
  let res = await instance.post(
    `${url}/api/campaign/getcampaignteammembers`,
    data
  );
  console.log(res);
  return res;
};

export {
  getNewCode,
  updateCampaignData,
  getCampaignData,
  inviteTeamMember,
  getTeam,
  getTeamAdmin,
  getCampaignTeammembers,
  getCampaignFilterData,
  editTeamMember,
};
