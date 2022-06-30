import React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Campaignsettings from "./Components/Campaignsettings";

import Linechart from "./Components/Linechart";
import Greenline from "../../Assets/greenline.JPG";
import Redline from "../../Assets/redline.JPG";

import Profile from "../../Assets/profile.jpeg";
import Img1 from "../../Assets/img1.jpeg";
import Img2 from "../../Assets/img2.png";
import Img3 from "../../Assets/img3.jpeg";

const settings = ["Settings", "Contacts", "Scripts", "Surveys", "Tags"];

const Dashboard = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  console.log("props");
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // React.useEffect(() => {})

  return (
    <div style={{ backgroundColor: "#FCFCFC", height: "100%" }}>
      {" "}
      <div className="mt-5 container">
        <br />
        <div className="row">
          <div className="col-2"></div>
          <div className="col-10">
            <Header name="Dashboard" />

            <div className="row">
              <div className="col-12 col-md-12">
                <div
                  // style={{ height: "200px", backgroundColor: "#FFFFFF" }}
                  style={{
                    borderRadius: "12px",
                    height: "auto",
                    backgroundColor: "#FFFFFF",
                  }}
                  className="row shadow p-2"
                >
                  <div className="col-4 p-2">
                    <h5 className="text-muted mt-2">Voters Influnced</h5>
                    <h1>
                      649{" "}
                      <i
                        style={{ color: "#00E38C" }}
                        class="fas fa-caret-up "
                      ></i>
                    </h1>

                    <img src={Greenline} />
                  </div>
                  <div className="col-4 p-2">
                    <h5 className="text-muted mt-2">Phone Calls Made</h5>
                    <h1>
                      431{" "}
                      <i
                        style={{ color: "#00E38C" }}
                        class="fas fa-caret-up "
                      ></i>
                    </h1>
                    <img src={Greenline} />
                  </div>
                  <div className="col-4 p-2">
                    <h5 className="text-muted mt-2">Doors Knocked</h5>
                    <h1>
                      649{" "}
                      <i
                        style={{ color: "#D12E2F" }}
                        class="fas fa-caret-down "
                      ></i>
                    </h1>
                    <img src={Redline} />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="d-flex justify-content-between">
                  <h5 className="">Team Memebers</h5>
                  <p className="">51 Team Members</p>
                  <p
                    className=" mt-1"
                    style={{ color: "#D12E2F", fontSize: "10px" }}
                  >
                    View All
                  </p>
                </div>
                <div>
                  <div
                    className="shadow p-2 d-flex justify-content-between my-2"
                    style={{
                      height: "60px",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "5px",
                    }}
                  >
                    <div className="d-flex">
                      <Avatar alt="Remy Sharp" src={Profile} />
                      <p className="mt-2 ml-2 text-muted">Tasadduq Ali</p>
                    </div>
                    <p
                      style={{ fontSize: "12px" }}
                      className="text-warning mt-2"
                    >
                      Campaign Manager
                    </p>
                  </div>
                  <div
                    className="shadow p-2 d-flex justify-content-between my-2"
                    style={{
                      height: "60px",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "5px",
                    }}
                  >
                    <div className="d-flex">
                      <Avatar alt="Remy Sharp" src={Img1} />
                      <p className="mt-2 ml-2 text-muted">Jackson MCgrath</p>
                    </div>
                    <p
                      style={{ fontSize: "12px" }}
                      className="text-warning mt-2"
                    >
                      Fundraising Director
                    </p>
                  </div>
                  <div
                    className="shadow p-2 d-flex justify-content-between my-2"
                    style={{
                      height: "60px",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "5px",
                    }}
                  >
                    <div className="d-flex">
                      <Avatar alt="Remy Sharp" src={Img2} />
                      <p className="mt-2 ml-2 text-muted">Jr Galliot</p>
                    </div>
                    <p
                      style={{ fontSize: "12px" }}
                      className="text-warning mt-2"
                    >
                      Volunteer
                    </p>
                  </div>
                  <div
                    className="shadow p-2 d-flex justify-content-between my-2"
                    style={{
                      height: "60px",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "5px",
                    }}
                  >
                    <div className="d-flex">
                      <Avatar alt="Remy Sharp" src={Img3} />
                      <p className="mt-2 ml-2 text-muted">Cody</p>
                    </div>
                    <p
                      style={{ fontSize: "12px" }}
                      className="text-warning mt-2"
                    >
                      Communication Director
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 ">
                <div className="d-flex justify-content-between ">
                  <h5 className="">Campaign</h5>
                  {/* <p
                    className=" mt-1"
                    style={{ color: "#D12E2F", fontSize: "10px" }}
                  >
                    Edit
                  </p> */}
                  <Campaignsettings />
                </div>
                <div
                  style={{
                    // height: "100%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "5px",
                  }}
                  className="shadow row pt-3"
                >
                  <h5 style={{ fontWeight: "bold" }} className="px-2">
                    Hannah Jacobs For Congress
                  </h5>
                  <div className="col-7 pb-1">
                    <div className="d-flex justify-content-between">
                      <p className="text-left">Election Day</p>
                      <p className="text-right" style={{ color: "#D12E2F" }}>
                        July 18
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="text-left">Campaign Filling Date</p>
                      <p className="text-right" style={{ color: "#D12E2F" }}>
                        March 11-13th
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="text-left">Last Day VBM Signup</p>
                      <p className="text-right" style={{ color: "#D12E2F" }}>
                        6/6/21
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="text-left">Last Date to register</p>
                      <p className="text-right" style={{ color: "#D12E2F" }}>
                        6/6/21
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="text-left">Early Voting Days</p>
                      <p>?????</p>
                    </div>
                  </div>
                  <div className="col-5 pb-3">
                    <div
                      className="shadow pt-4"
                      style={{
                        backgroundColor: "#FFFFFF",
                        width: "100%",
                        height: "100%",
                        borderRadius: "12px",
                      }}
                    >
                      <h4 className="mx-2" style={{ color: "#D12E2F" }}>
                        62 Days Until the Elections!
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
