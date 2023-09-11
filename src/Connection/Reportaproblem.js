import axios from "axios";
import { instance, url } from "./API/api";

const submitReportaproblem = async (data) => {
  console.log(data);
  let res = await instance.post(`${url}/api/reportaproblem/submit`, data);
  console.log(res);
  return res;
};

export { submitReportaproblem };
