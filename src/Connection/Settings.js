import { instance, url } from "./API/api";

const manageState = {
  getStates: async () => {
    let res = await instance.get(`${url}/api/settings/getstates`);

    console.log(res);
    return res;
  },
  addState: async (data) => {
    let res = await instance.post(`${url}/api/settings/addstate`, data);

    console.log(res);
    return res;
  },
};

export { manageState };
