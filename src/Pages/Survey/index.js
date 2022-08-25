import * as React from "react";
import Header from "../../Components/Header";
import Addsurvey from "./Components/Addsurvey";
import { ToastContainer, toast } from "react-toastify";
import Clientstable from "./Components/Clientstable";
import { getCampaigns, getCampaignSurveys } from "../../Connection/Survey";
import { useAuth } from "../../Context/Auth-Context";
import Surveystable from "./Components/Surveystable";

const Survey = () => {
  const [foundLists, setFoundLists] = React.useState();
  const { role } = useAuth();
  const [update, setUpdate] = React.useState(false);

  const handleUpdate = () => {
    setUpdate(true);
  };
  React.useEffect(() => {
    const handleGetCampaigns = async () => {
      const res = await getCampaigns();
      console.log(res);
      if (res.data.success === true) {
        setFoundLists(res.data.campaigns);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    const handleGetCampaignSurveys = async (data) => {
      const res = await getCampaignSurveys(data);
      console.log(res);
      if (res.data.success === true) {
        setFoundLists(res.data.campaignSurveys);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    console.log(role);
    if (role === "superadmin") {
      handleGetCampaigns();
      setUpdate(false);
    } else {
      handleGetCampaignSurveys({
        campaignId: window.localStorage.getItem("id"),
      });
      setUpdate(false);
    }
  }, [update === true]);
  return (
    <div>
      {role === "superadmin" ? (
        <div style={{ backgroundColor: "#FCFCFC", height: "100vh" }}>
          <div className="mt-5 pl-xl-5 pr-4">
            <br />
            <div className="row">
              <div className="col-2 col-xl-1"></div>
              <div className="col-10 col-xl-11">
                <Header
                  name="Surveys -  Clients"
                  purpose="View Clients By Survey"
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
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control w-25 mx-2"
                        placeholder="Search"
                        style={{
                          width: "350px",
                          backgroundColor: "#F2F2F2",
                          border: "none",
                          // boxShadow: "0px 3px 10px #00000029",
                          // borderRadius: "15px",
                        }}
                      ></input>
                      {/* <Addsurvey /> */}
                    </div>
                    <div>
                      <div>
                        <br />
                        {foundLists === undefined && (
                          <div class="spinner-border text-danger" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                        )}
                        {foundLists && (
                          <Clientstable
                            data={foundLists}
                            // dSelect={dSelect}
                            // handleDSelect={handleDSelect}
                          />
                        )}{" "}
                        {foundLists?.length === 0 && (
                          <p>No Campaigns Survey Found </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ backgroundColor: "#FCFCFC", height: "100vh" }}>
          <div className="mt-5 pl-xl-5 pr-4">
            <br />
            <div className="row">
              <div className="col-2 col-xl-1"></div>
              <div className="col-10 col-xl-11">
                <Header
                  name="Surveys -  Clients"
                  purpose="View Clients By Survey"
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
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control w-25 mx-2"
                        placeholder="Search"
                        style={{
                          width: "350px",
                          backgroundColor: "#F2F2F2",
                          border: "none",
                          // boxShadow: "0px 3px 10px #00000029",
                          // borderRadius: "15px",
                        }}
                      ></input>
                      <Addsurvey handleUpdate={handleUpdate} />
                    </div>
                    <div>
                      <div>
                        <br />
                        {foundLists === undefined && (
                          <div class="spinner-border text-danger" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                        )}
                        {foundLists && (
                          <Surveystable
                            handleUpdate={handleUpdate}
                            data={foundLists}
                          />
                        )}{" "}
                        {foundLists?.length === 0 && (
                          <p>No Campaigns Survey Found </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Survey;
