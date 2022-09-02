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
import { getCampaignTeammembers } from "../../Connection/Phonebank";
import { ToastContainer, toast } from "react-toastify";

import Profile from "../../Assets/profile.jpeg";
import Img1 from "../../Assets/img1.jpeg";
import Img2 from "../../Assets/img2.png";
import Img3 from "../../Assets/img3.jpeg";

const settings = ["Settings", "Contacts", "Scripts", "Surveys", "Tags"];

const Dashboard = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [campaignTeammembers, setCampaignTeammembers] = React.useState();
  const [campaignData, setCampaignData] = React.useState();

  // console.log("props");
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const days = (date_1, date_2) => {
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  };

  const handleGetCampaignData = (data) => {
    console.log(data);
    if (data && data?.campaignDates?.electionDay?.length > 0) {
      console.log("in ifff");
      let electionDate = new Date(data.campaignDates.electionDay);
      let todayDate = new Date();

      let daysLeft = days(electionDate, todayDate);
      setCampaignData({ ...data, daysLeft });
    } else {
      setCampaignData(data);
    }
  };

  React.useEffect(() => {
    const handleGetTeammembers = async () => {
      const res = await getCampaignTeammembers({
        campaignId: window.localStorage.getItem("id"),
      });
      console.log(res);
      if (res.data.success === true) {
        if (res?.data?.teamMembers.length > 0) {
          let yoo = res.data.teamMembers.map((member) => {
            let campaign = member.campaignJoined.find(
              (campaign) =>
                campaign.campaignId === window.localStorage.getItem("id")
            );
            return {
              firstName: member.firstName,
              lastName: member.lastName,
              permission: campaign.permission,
              image: member.image,
            };
          });
          setCampaignTeammembers(yoo);
        } else {
          setCampaignTeammembers(res.data.teamMembers);
        }
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    handleGetTeammembers();
  }, []);

  return (
    <div style={{ backgroundColor: "#FCFCFC", height: "100%" }}>
      {console.log(campaignData)}{" "}
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
                    <h1 style={{ textDecoration: "line-through" }}>
                      0{" "}
                      <i
                        style={{ color: "#00E38C" }}
                        class="fas fa-caret-up "
                      ></i>
                    </h1>

                    <img src={Greenline} />
                  </div>
                  <div className="col-4 p-2">
                    <h5 className="text-muted mt-2">Phone Calls Made</h5>
                    <h1 style={{ textDecoration: "line-through" }}>
                      0{" "}
                      <i
                        style={{ color: "#00E38C" }}
                        class="fas fa-caret-up "
                      ></i>
                    </h1>
                    <img src={Greenline} />
                  </div>
                  <div className="col-4 p-2">
                    <h5 className="text-muted mt-2">Doors Knocked</h5>
                    <h1 style={{ textDecoration: "line-through" }}>
                      0{" "}
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
                {/* <div className="d-flex justify-content-between">
                  <h5 className="">Team Memebers</h5>
                  <p className="">51 Team Members</p>
                  <p
                    className=" mt-1"
                    style={{ color: "#D12E2F", fontSize: "10px" }}
                  >
                    View All
                  </p>
                </div> */}
                <div className="d-flex justify-content-between">
                  <h4 className="">Team Members</h4>
                  <p className="mt-1">
                    {campaignTeammembers?.length} Team Members
                  </p>
                  <Link
                    // className={clsx({
                    //   selected: checkRoute("/surveys"),
                    //   "m-2": true,
                    //   nonselected: checkRoute("/surveys") === false,
                    // })}
                    to="/team"
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
                  {campaignTeammembers?.map((member) => {
                    return (
                      <div
                        className="shadow p-2 d-flex justify-content-between my-2"
                        style={{
                          height: "60px",
                          backgroundColor: "#FFFFFF",
                          borderRadius: "5px",
                        }}
                      >
                        <div className="d-flex">
                          <Avatar alt="Remy Sharp" src={member?.campaignLogo} />
                          <p className="mt-2 ml-2 text-muted">
                            {member?.firstName} {member?.lastName}
                          </p>
                        </div>
                        <p
                          style={{ fontSize: "12px" }}
                          className="text-warning mt-2"
                        >
                          {member?.permission?.toUpperCase()}
                        </p>
                      </div>
                    );
                  })}
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
                  <Campaignsettings handleGetData={handleGetCampaignData} />
                </div>
                <div
                  style={{
                    // height: "100%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "5px",
                  }}
                  className="shadow   p-3"
                >
                  <h5 style={{ fontWeight: "bold" }} className="px-1 text-left">
                    {campaignData?.campaignName}
                  </h5>
                  <div className=" row">
                    <div className="col-7 pb-1">
                      <div className="d-flex justify-content-between">
                        <p className="text-left">Election Day</p>
                        <p className="text-right" style={{ color: "#D12E2F" }}>
                          {campaignData?.campaignDates?.electionDay}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="text-left">Campaign Filling Date</p>
                        <p className="text-right" style={{ color: "#D12E2F" }}>
                          {campaignData?.campaignDates?.campaignFilingDates}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between ">
                        <p className="text-left">Last Day VBM Signup</p>
                        <p className="text-right" style={{ color: "#D12E2F" }}>
                          {campaignData?.campaignDates?.lastDateSignup}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="text-left">Last Date to register</p>
                        <p className="text-right" style={{ color: "#D12E2F" }}>
                          {campaignData?.campaignDates?.lastDateRegister}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="text-left">Early Voting Days</p>
                        <p>{campaignData?.campaignDates?.voteEarlyDate}</p>
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
                          overflowWrap: "break-word",
                        }}
                      >
                        <h4 className="mx-2" style={{ color: "#D12E2F" }}>
                          {console.log(new Date().toISOString())}
                          {campaignData &&
                          campaignData?.daysLeft &&
                          campaignData.daysLeft > 0
                            ? `${campaignData?.daysLeft} Days Until the Elections!`
                            : `Elections Happened`}
                        </h4>
                      </div>
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
