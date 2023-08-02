import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { Link, NavLink, useHistory, withRouter } from "react-router-dom";
import { useAuth } from "../../Context/Auth-Context";
import Profile from "./Profile";
import Joincampaign from "../Teamdashboard/Components/Joincampaign";
import { getJoinedCampaigns } from "../../Connection/Team";
import { ToastContainer, toast } from "react-toastify";

const Selectcampaign = (props) => {
  console.log(props, "i am props");
  const history = useHistory();
  const { setRole, login, logout } = useAuth();
  const { campaignsJoined, setCampaignsJoined } = useAuth();

  const handleSelectCampaign = (data) => {
    console.log("selected", data);
    // setRole("campaignManager");
    window.localStorage.setItem("id", data._id ? data._id : data.campaignId);
    window.localStorage.setItem(
      "campaignId",
      data._id ? data._id : data.campaignId
    );
    window.localStorage.setItem("selectedCampaignData", JSON.stringify(data));
    window.localStorage.setItem(
      "role",
      props?.location?.state?.role ?? window.localStorage.getItem("role")
    );
    window.localStorage.setItem("campaignCode", data?.campaignCode);
    window.localStorage.setItem("campaignName", data?.campaignName);
    window.localStorage.setItem("campaignSelected", true);
    login();
    history.push({
      pathname: "/",
    });
  };

  const handleGetJoinedcampaigns = async () => {
    console.log(props, "=====> role in props");
    let res = await getJoinedCampaigns({
      id: window.localStorage.getItem("userId"),
      role: props.location.state?.role,
    });
    console.log(res, "i am handlegetcampaign");
    if (res.data.success === true) {
      window.localStorage.setItem(
        "campaigns",
        JSON.stringify(res.data?.joinedCampaigns?.campaignJoined)
      );
      setCampaignsJoined(res.data.joinedCampaigns);
      // logout();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  React.useEffect(() => {}, [campaignsJoined]);
  return (
    <div style={{ backgroundColor: "#FCFCFC", height: "auto" }}>
      <div className=" container">
        <br />
        <div className="row">
          <div className="col-2"></div>
          <div className="col-10">
            <div className="row ">
              <div className="col-12 col-md-3"></div>
              <div className="col-12 col-md-6">
                <div
                  style={{
                    minHeight: "90vh",
                    height: "auto",
                    backgroundColor: "#FFFFFF",
                  }}
                  className=" shadow p-3 text-center"
                >
                  <h5 className="mt-2">My Account</h5>
                  <div className="row  ">
                    <div className="col-1"></div>
                    <div className="col-10 mt-3">
                      <Profile currentRole={props?.location?.state?.role} />
                      {/* <button
                          className="btn shadow-sm d-flex justify-content-between align-items-center p-3"
                          style={{
                            height: "60px",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                        >
                          <Avatar
                            sx={{ bgcolor: "#FF914D" }}
                            alt={window.localStorage.getItem("username")}
                            src={window.localStorage.getItem("campaignLogo")}
                          />

                          <p className="mt-2">
                            {" "}
                            {window.localStorage.getItem("username")}
                          </p>
                          <i
                            style={{ fontSize: "30px", color: "#FF914D" }}
                            className="far fa-arrow-alt-circle-right"
                          ></i>
                        </button> */}
                      <br /> <br /> <br />
                      {window.localStorage.getItem("teamLogin") === "true" ? (
                        <div>
                          <p className="text-muted">On Going Campaigns</p>
                          <hr style={{ width: "50%" }} />
                          {JSON.parse(window.localStorage.getItem("campaigns"))
                            ?.length > 0 &&
                            JSON.parse(
                              window.localStorage.getItem("campaigns")
                            )?.map((campaign) => {
                              console.log(campaign);
                              if (campaign.disabled === false) {
                                return (
                                  <div>
                                    <button
                                      className="btn shadow-sm d-flex justify-content-between align-items-center p-3"
                                      style={{
                                        height: "60px",
                                        width: "100%",
                                        borderRadius: "5px",
                                      }}
                                      onClick={() =>
                                        handleSelectCampaign(campaign)
                                      }
                                    >
                                      <p className="mt-3 text-danger">
                                        {campaign?.campaignName}
                                      </p>
                                      <i
                                        style={{
                                          fontSize: "30px",
                                          color: "#FF914D",
                                        }}
                                        className="far fa-arrow-alt-circle-right"
                                      ></i>
                                    </button>
                                  </div>
                                );
                              }
                            })}
                          <br /> <br />
                          <p className="text-muted">Join a new Campaign</p>
                          <Joincampaign
                            handleGetJoinedcampaigns={handleGetJoinedcampaigns}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      <br />
                      <br />
                      <button
                        style={{
                          backgroundColor: "#D12E2F",
                          width: "150px",
                          height: "42px",
                        }}
                        className="btn text-light"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </div>
                    <div className="col-1"></div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3"></div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Selectcampaign;
