import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Listtable from "./Components/Listtable";
import Createlist from "./Components/Createlist";
import { ToastContainer, toast } from "react-toastify";
import { getRecords } from "../../Connection/Canvassing";
import { getCampaignFilterData } from "../../Connection/Campaign";

import { getLists } from "../../Connection/Canvassing";

const Canvassing = (props) => {
  const [foundLists, setFoundLists] = useState();
  const [selected, setSelected] = useState();
  const [update, setUpdate] = React.useState(false);
  const [campaignData, setCampaignData] = useState();

  const handleSelected = (list) => {
    console.log(list);
    setSelected(list);
  };

  const handleUpdate = () => {
    setUpdate(true);
  };
  useEffect(() => {
    const handleGetLists = async () => {
      const res = await getRecords({
        campaignId: window.localStorage.getItem("id"),
      });
      console.log(res);
      if (res.data.success === true) {
        setFoundLists(res.data.canvassingLists);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    const handleGetCampaignData = async () => {
      const res = await getCampaignFilterData({
        campaignId: window.localStorage.getItem("id"),
      });
      console.log(res);
      if (res.data.success === true) {
        setCampaignData(res.data.values);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    handleGetLists();
    handleGetCampaignData();
    setUpdate(false);
  }, [update === true]);
  console.log("props");
  return (
    <div style={{ backgroundColor: "#FCFCFC", height: "100vh" }}>
      <div className="mt-5 pl-xl-5 pr-4">
        <br />
        <div className="row">
          <div className="col-2 col-xl-1"></div>
          <div className="col-10 col-xl-11">
            <Header
              name="Canvassing"
              purpose="Create, Edit Assign Canvassing Lists"
            />
            <br />
            <div>
              <div
                className=" p-4"
                style={{
                  height: "auto",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  boxShadow: " 0px 10px 24px #00000029",
                }}
              >
                <div className="text-left">
                  {" "}
                  <Createlist
                    handleUpdateData={handleUpdate}
                    campaignFilterData={campaignData}
                  />
                  <br />
                  <br />
                  <p>Active Canvassing Lists</p>
                </div>

                <br />
                <br />
                <br />
                <div>
                  <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search"
                    style={{
                      width: "350px",
                      backgroundColor: "#F2F2F2",
                      border: "none",
                      // boxShadow: "0px 3px 10px #00000029",
                      // borderRadius: "15px",
                    }}
                  ></input>
                  <br />
                  {foundLists === undefined && (
                    <div class="spinner-border text-danger" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
                  {foundLists && (
                    <Listtable
                      data={foundLists}
                      handleClick={handleSelected}
                      handleUpdate={handleUpdate}
                      campaignFilterData={campaignData}
                    />
                  )}
                  {foundLists?.length === 0 && <p>No Lists Found Make One</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Canvassing;
