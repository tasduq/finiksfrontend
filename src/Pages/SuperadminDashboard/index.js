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
import Greenline from "../../Assets/greenline.JPG";
import Redline from "../../Assets/redline.JPG";
import { getClients, getAnalytics } from "../../Connection/Clients";
import { ToastContainer, toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
  const [foundClients, setFoundClients] = useState();

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

    const handleGetClients = async () => {
      const res = await getClients();
      console.log(res);
      if (res.data.success === true) {
        setFoundClients(res.data.clients);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    // const handleGetAnalytics = async () => {
    //   const res = await getAnalytics();
    // };

    handleGetClients();
    // handleGetAnalytics();
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
                <div className="text-right">
                  {" "}
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-label">
                      Select Time
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={age}
                      label="Select Time"
                      // onChange={handleChange}
                    >
                      <MenuItem value={10}>Week</MenuItem>
                      <MenuItem value={20}>Month</MenuItem>
                      <MenuItem value={30}>3 Months</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div
                  style={{
                    borderRadius: "12px",
                    height: "auto",
                    backgroundColor: "#FFFFFF",
                  }}
                  className="row shadow p-2"
                >
                  <div className=" p-2">
                    <h5 className="box1heading mt-2">Clients</h5>
                    <p className="box1value">
                      {foundClients ? foundClients?.length - 1 : 0}{" "}
                      <i
                        style={{ color: "#00E38C" }}
                        class="fas fa-caret-up "
                      ></i>
                    </p>

                    {/* <img src={Greenline} /> */}
                  </div>
                  <div className=" p-2">
                    <h5 className="box1heading mt-2">Texts Sent</h5>
                    <p className="box1value">
                      0{" "}
                      <i
                        style={{ color: "#00E38C" }}
                        class="fas fa-caret-up "
                      ></i>
                    </p>
                    {/* <img src={Greenline} /> */}
                  </div>
                  {/* <div className=" p-2">
                    <h5 className="box1heading mt-2">Emails Sent</h5>
                    <p className="box1value">
                      124,234{" "}
                      <i
                        style={{ color: "#D12E2F" }}
                        class="fas fa-caret-down "
                      ></i>
                    </p>
                    <img src={Redline} />
                  </div> */}
                  {/* <div className=" p-2">
                    <h5 className="box1heading mt-2">Donations Colleted</h5>
                    <p className="box1value">
                      439{" "}
                      <i
                        style={{ color: "#D12E2F" }}
                        class="fas fa-caret-down "
                      ></i>
                    </p>
                    <img src={Redline} />
                  </div> */}
                  <div className=" p-2">
                    <h5 className="box1heading mt-2">Phones Called</h5>
                    <p className="box1value">
                      0{" "}
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
                      0
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
                  <p className="mt-1">
                    {foundClients?.length > 0
                      ? foundClients?.length - 1
                      : foundClients?.length}{" "}
                    Active Members
                  </p>
                  <Link
                    // className={clsx({
                    //   selected: checkRoute("/surveys"),
                    //   "m-2": true,
                    //   nonselected: checkRoute("/surveys") === false,
                    // })}
                    to="/clients"
                  >
                    {" "}
                    <p
                      className=" mt-1"
                      style={{ color: "#D12E2F", fontSize: "15px" }}
                    >
                      View All
                    </p>
                  </Link>
                </div>
                <div>
                  {foundClients === undefined && (
                    <div class="spinner-border text-danger" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}

                  {foundClients && (
                    <div>
                      {foundClients?.map((client) => {
                        return (
                          client.active === true &&
                          client.role !== "superadmin" && (
                            <div
                              className="shadow p-2 px-3 d-flex justify-content-between my-2 "
                              style={{
                                height: "60px",
                                backgroundColor: "#FFFFFF",
                                borderRadius: "5px",
                              }}
                            >
                              <div className="d-flex">
                                <Avatar
                                  alt="Remy Sharp"
                                  src={client.campaignLogo}
                                />
                                <p className="mt-2 ml-2 text-muted">
                                  {client.campaignName}
                                </p>
                              </div>
                              <p
                                style={{ fontSize: "12px" }}
                                className="text-warning mt-2"
                              >
                                {client.level}
                              </p>
                            </div>
                          )
                        );
                      })}
                    </div>
                  )}

                  {foundClients?.length === 0 && (
                    <p>No Clients Found Make One</p>
                  )}
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
