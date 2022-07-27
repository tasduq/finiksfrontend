import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Listtable from "./Components/Listtable";
import { ToastContainer, toast } from "react-toastify";
import { getCampaignFilterData } from "../../Connection/Campaign";
import { getTeamPhonebankRecords } from "../../Connection/Team";
import { Link, NavLink, useHistory, withRouter } from "react-router-dom";
import Listspage from "./Components/Listspage";

const Teamphonebank = (props) => {
  const [foundLists, setFoundLists] = useState();
  const [selected, setSelected] = useState();
  const [update, setUpdate] = React.useState(false);
  const [campaignData, setCampaignData] = useState();
  const history = useHistory();

  const handleSelected = (list) => {
    console.log(list);
    setSelected(list);
  };

  const handleUpdate = () => {
    setUpdate(true);
  };
  useEffect(() => {
    if (window.localStorage.getItem("selectedCampaignId")) {
      const handleGetLists = async () => {
        const res = await getTeamPhonebankRecords({
          campaignId: window.localStorage.getItem("selectedCampaignId"),
          teamMemberEmail: window.localStorage.getItem("email"),
        });
        console.log(res);
        if (res.data.success === true) {
          setFoundLists(res.data.records);
        } else {
          toast.error(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      };
      handleGetLists();
    } else {
      toast.error("Campaign Not Selected", {
        position: toast.POSITION.TOP_RIGHT,
      });
      history.push({
        pathname: "/",
      });
    }

    // const handleGetCampaignData = async () => {
    //   const res = await getCampaignFilterData({
    //     campaignId: window.localStorage.getItem("id"),
    //   });
    //   console.log(res);
    //   if (res.data.success === true) {
    //     setCampaignData(res.data.values);
    //   } else {
    //     toast.error(res.data.message, {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //   }
    // };

    // handleGetCampaignData();
    setUpdate(false);
  }, [update === true]);
  console.log("props");
  return (
    <div style={{ backgroundColor: "#FCFCFC", height: "100vh" }}>
      {console.log(campaignData)}
      <div className="mt-5 pl-xl-5 pr-4">
        <br />
        <div className="row">
          <div className="col-2 col-xl-1"></div>
          <div className="col-10 col-xl-11">
            <Header name="Phone bank" purpose="" />
            <br />
            <div>
              <div
                className=" p-4 mb-2"
                style={{
                  minHeight: "500px",
                  height: "auto",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  boxShadow: " 0px 10px 24px #00000029",
                }}
              >
                <p
                  className="text-left"
                  style={{ fontSize: "24px", color: "#D12E2F" }}
                >
                  How would you like to phonebank?
                </p>
                <div className="mt-5">
                  {foundLists && <Listspage data={foundLists} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Teamphonebank;
