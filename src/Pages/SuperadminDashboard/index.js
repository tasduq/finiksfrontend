import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import { useAuth } from "../../Context/Auth-Context";
import { useHistory } from "react-router-dom";
// import Campaignsettings from "./Components/Campaignsettings";

// import Linechart from "./Components/Linechart";
import Greenline from "../../Assets/greenline.JPG";
import Redline from "../../Assets/redline.JPG";

import Profile from "../../Assets/profile.jpeg";
import Img1 from "../../Assets/img1.jpeg";
import Img2 from "../../Assets/img2.png";
import Img3 from "../../Assets/img3.jpeg";

import "./index.css";

const settings = ["Settings", "Contacts", "Scripts", "Surveys", "Tags"];

const Superadmindashboard = (props) => {
  console.log(props);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { role } = useAuth();
  let history = useHistory();
  console.log("props");
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    // if (role !== "superadmin") {
    //   history.push("/");
    // }
    // window.location.reload();
  }, []);

  return (
    <div style={{ backgroundColor: "#FCFCFC", height: "100%" }}>
      {" "}
      <div className="mt-5 container">
        <br />
        <div className="row">
          <div className="col-2"></div>
          <div className="col-10">
            <Header name="Admin Dashboard" />

            <div className="row">
              <div className="col-12 col-md-12">
                <div
                  style={{
                    borderRadius: "12px",
                    height: "auto",
                    backgroundColor: "#FFFFFF",
                  }}
                  className="row shadow p-2"
                >
                  <div className=" p-2">
                    <p className="mt-2 box1heading">Clients</p>
                    <p className="box1value">
                      649{" "}
                      <i
                        style={{ color: "#00E38C" }}
                        class="fas fa-caret-up "
                      ></i>
                    </p>

                    <img src={Greenline} />
                  </div>
                  <div className=" p-2">
                    <h5 className="box1heading mt-2">Texts Sent</h5>
                    <p className="box1value">
                      12,034{" "}
                      <i
                        style={{ color: "#00E38C" }}
                        class="fas fa-caret-up "
                      ></i>
                    </p>
                    <img src={Greenline} />
                  </div>
                  <div className=" p-2">
                    <h5 className="box1heading mt-2">Emails Sent</h5>
                    <p className="box1value">
                      124,234{" "}
                      <i
                        style={{ color: "#D12E2F" }}
                        class="fas fa-caret-down "
                      ></i>
                    </p>
                    <img src={Redline} />
                  </div>
                  <div className=" p-2">
                    <h5 className="box1heading mt-2">Donations Colleted</h5>
                    <p className="box1value">
                      439{" "}
                      <i
                        style={{ color: "#D12E2F" }}
                        class="fas fa-caret-down "
                      ></i>
                    </p>
                    <img src={Redline} />
                  </div>
                  <div className=" p-2">
                    <h5 className="box1heading mt-2">Phones Called</h5>
                    <p className="box1value">
                      17,343{" "}
                      <i
                        style={{ color: "#D12E2F" }}
                        class="fas fa-caret-down "
                      ></i>
                    </p>
                    <img src={Redline} />
                  </div>
                  <div className=" p-2">
                    <h5 className="box1heading mt-2">Doors Knocked</h5>
                    <p className="box1value">
                      53,132
                      <i
                        style={{ color: "#D12E2F" }}
                        class="fas fa-caret-down "
                      ></i>
                    </p>
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
                  <h3 className="">Clients</h3>
                  <p className="mt-1">12 Active Members</p>
                  <p
                    className=" mt-1"
                    style={{ color: "#D12E2F", fontSize: "15px" }}
                  >
                    View All
                  </p>
                </div>
                <div>
                  <div
                    className="shadow p-2 px-3 d-flex justify-content-between my-2 "
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
                      State Senate- Fi 08
                    </p>
                  </div>
                  <div
                    className="shadow p-2 px-3 d-flex justify-content-between my-2"
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
                      Congressional - FI 01
                    </p>
                  </div>
                  <div
                    className="shadow p-2 px-3 d-flex justify-content-between my-2"
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
                      Fedral Senate - FL 09
                    </p>
                  </div>
                  <div
                    className="shadow p-2 px-3 d-flex justify-content-between my-2"
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
                      className="text-warning mt-2 "
                    >
                      State House - FL 03
                    </p>
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
export default Superadmindashboard;
