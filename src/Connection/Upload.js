import axios from "axios";
import url from "./API/api";
// let url = "http://localhost:3001";
// let url = "https://finiksbackend.herokuapp.com";

const uploadData = async (data, callBack) => {
  console.log(data);
  let res;
  axios({
    method: "post",
    url: `${url}/api/aristotle/addaristotledata`,
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      console.log(response);
      res = response;
      callBack(response);
      // return response;
    })
    .catch(function (response) {
      //handle error
      console.log(response);
      res = response;
      callBack(response);
      // return response;
    });
  //   let res = await axios.post(`${url}/api/aristotle/addaristotledata`, data);

  console.log(res);
  return res;
};

export { uploadData };
