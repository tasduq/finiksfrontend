import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Listtable from "./Components/Listtable";
import Createlist from "./Components/Createlist";
import { ToastContainer, toast } from "react-toastify";
import { getCampaignFilterData } from "../../Connection/Campaign";
import { getRecords } from "../../Connection/Phonebank";

const Phonebank = (props) => {
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
        setFoundLists(res.data.phonebankLists);
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
      {console.log(campaignData)}
      <div className=" pl-xl-5 pr-4">
        <br />
        <div className="row">
          <div className="col-2 col-xl-1"></div>
          <div className="col-10 col-xl-11">
            <Header
              name="Phonebanking"
              purpose="Create, Edit Assign Phone banking Lists"
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
                  <p>Active Phonebanking Lists</p>
                </div>

                <div className="d-flex justify-content-center align-items-center ">
                  {/* <div className="mr-2" style={{ height: "100%" }}>
                    <p style={{ fontSize: "24px" }}>
                      Campaign <br /> Volunteers :
                    </p>
                  </div> */}

                  <div
                    style={{
                      width: "328px",
                      minHeight: "332px",
                      height: "auto",
                      borderRadius: "12px",
                      boxShadow: "0px 3px 26px #0000001C",
                      fontWeight: "bold",
                    }}
                    className="p-4"
                  >
                    {selected === undefined && <p>No list Selected</p>}
                    {selected && (
                      <div>
                        {" "}
                        <p style={{ color: "#000000", fontSize: "20px" }}>
                          {selected.recordName}
                        </p>
                        <div className="">
                          <div className="d-flex justify-content-center">
                            {" "}
                            <div
                              style={{
                                width: "127px",
                                height: "118px",
                                borderRadius: "12px",
                                boxShadow: "0px 3px 6px #0000001C",
                              }}
                              className="p-3 m-1"
                            >
                              <p style={{ color: "#583689", fontSize: "12px" }}>
                                Total Numbers
                              </p>
                              <p style={{ color: "#583689", fontSize: "40px" }}>
                                {selected.totalNumbers}
                              </p>
                            </div>
                            <div
                              style={{
                                width: "127px",
                                height: "118px",
                                borderRadius: "12px",
                                boxShadow: "0px 3px 6px #0000001C",
                              }}
                              className="pt-3 m-1"
                            >
                              <p style={{ color: "#583689", fontSize: "12px" }}>
                                Numbers Called
                              </p>
                              <p style={{ color: "#583689", fontSize: "40px" }}>
                                {selected.numbersCalled
                                  ? selected.numbersCalled
                                  : 0}
                              </p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center">
                            <div
                              style={{
                                width: "127px",
                                height: "118px",
                                borderRadius: "12px",
                                boxShadow: "0px 3px 6px #0000001C",
                                backgroundColor: "#583689",
                              }}
                              className="p-3 m-1"
                            >
                              <p style={{ color: "#FFFFFF", fontSize: "12px" }}>
                                Numbers Left
                              </p>
                              <p style={{ color: "#FFFFFF", fontSize: "40px" }}>
                                {selected.numbersLeft
                                  ? selected.numbersLeft
                                  : "All"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
export default Phonebank;
