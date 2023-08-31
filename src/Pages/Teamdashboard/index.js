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
import { useAuth } from "../../Context/Auth-Context";
import Linechart from "./Components/Linechart";
import Greenline from "../../Assets/greenline.JPG";
import Redline from "../../Assets/redline.JPG";
import { getCampaignTeammembers } from "../../Connection/Phonebank";
import { getJoinedCampaigns } from "../../Connection/Team";
import { ToastContainer, toast } from "react-toastify";

import Profile from "../../Assets/profile.jpeg";
import Img1 from "../../Assets/img1.jpeg";
import Img2 from "../../Assets/img2.png";
import Img3 from "../../Assets/img3.jpeg";
import { getCampaignData } from "../../Connection/Campaign";
import Joincampaign from "./Components/Joincampaign";

const settings = ["Settings"];

const Dashboardteam = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [campaignTeammembers, setCampaignTeammembers] = React.useState();
  const [campaignData, setCampaignData] = React.useState();
  // const [campaignsJoined, setCampaignsJoined] = React.useState(
  //   window.localStorage.getItem("campaignsJoined")
  // );
  const { campaignsJoined, setCampaignsJoined } = useAuth();

  console.log("props");
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

  const handleDateFormat = (dateToBeFormatted) => {
    const date = new Date(dateToBeFormatted);

    // Get the month, day, and year from the Date object
    const month = date.getMonth() + 1; // January is 0, so we need to add 1
    const day = date.getDate();
    const year = date.getFullYear();

    // Format the date in the desired format
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  };

  const handleSetData = (data) => {
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

  const handleSelectCampaign = () => {
    // console.log(campaignId);
    // window.localStorage.setItem("selectedCampaignId", campaignId);

    const handleGetCampaignData = async () => {
      const res = await getCampaignData({
        campaignId: window.localStorage.getItem("id"),
      });
      console.log(res);
      if (res.data.success === true) {
        handleSetData(res.data.values);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    handleGetCampaignData();
  };
  // const handleGetJoinedcampaigns = async () => {
  //   let res = await getJoinedCampaigns({
  //     id: window.localStorage.getItem("id"),
  //   });
  //   console.log(res);
  //   if (res.data.success === true) {
  //     setCampaignsJoined(res.data.joinedCampaigns);
  //   } else {
  //     toast.error(res.data.message, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }
  // };

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
              campaignPosition: campaign.campaignPosition,
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

    handleSelectCampaign();

    handleGetTeammembers();
  }, []);

  return (
    <div style={{ backgroundColor: "#FCFCFC", height: "100%" }}>
      {console.log(campaignData)}{" "}
      <div className="pl-xl-5 pr-4">
        <br />
        <div className="row">
          <div className="col-2"></div>
          <div className="col-9 col-lg-10 col-xl-9">
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
                <div className="d-flex justify-content-between">
                  <h4 className="">Team Members</h4>
                  <p className="mt-1">
                    {campaignTeammembers?.length} Team Members
                  </p>
                </div>
                <div>
                  {campaignTeammembers?.slice(0, 4).map((member, idx) => {
                    console.log(member, "=====>");
                    return (
                      <div
                        className="shadow pt-3 p-2 d-flex justify-content-between my-2"
                        style={{
                          height: "70px",
                          backgroundColor: "#FFFFFF",
                          borderRadius: "5px",
                        }}
                      >
                        <div className="d-flex">
                          <div className="">
                            <Avatar alt="Remy Sharp" src={member?.image} />
                          </div>

                          <p className="mt-2 ml-2 text-muted">
                            {member?.firstName} {member?.lastName}
                          </p>
                        </div>
                        <p
                          style={{
                            fontSize: "12px",
                            color: `${idx % 2 === 0 ? "#FF914D" : "#583689"}`,
                          }}
                          className="font-weight-bold mt-3"
                        >
                          {member?.campaignPosition?.toUpperCase()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-12 col-md-6 ">
                <div className="d-flex justify-content-between ">
                  <h4 className="mb-3">Selected Campaign</h4>
                </div>
                <div
                  style={{
                    // height: "100%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "5px",
                  }}
                  className="shadow   p-3  pt-1 mt-2"
                >
                  <h5 style={{ fontWeight: "bold" }} className="px-1 text-left">
                    {campaignData?.campaignName}
                  </h5>
                  <div className=" row mt-3">
                    <div className="col-7 pb-1">
                      <div className="d-flex justify-content-between">
                        <p className="text-left font-weight-bold">
                          Election Day
                        </p>
                        <p className="text-right" style={{ color: "#D12E2F" }}>
                          {handleDateFormat(
                            campaignData?.campaignDates?.electionDay
                          )}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="text-left font-weight-bold">
                          Campaign Filling Date
                        </p>
                        <p className="text-right" style={{ color: "#D12E2F" }}>
                          {}
                          {handleDateFormat(
                            campaignData?.campaignDates?.campaignFilingDates
                          )}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between ">
                        <p className="text-left font-weight-bold">
                          Last Day VBM Signup
                        </p>
                        <p className="text-right" style={{ color: "#D12E2F" }}>
                          {}
                          {handleDateFormat(
                            campaignData?.campaignDates?.lastDateSignup
                          )}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="text-left font-weight-bold">
                          Last Day Of Voter Registration
                        </p>
                        <p className="text-right" style={{ color: "#D12E2F" }}>
                          {}
                          {handleDateFormat(
                            campaignData?.campaignDates?.lastDateRegister
                          )}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="text-left font-weight-bold">
                          Early Voting Begins
                        </p>
                        <p>
                          {}
                          {handleDateFormat(
                            campaignData?.campaignDates?.voteEarlyDate
                          )}
                        </p>
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
                            campaignData.daysLeft > 0 &&
                            `${campaignData?.daysLeft} Days Until The Election`}
                          {campaignData === undefined &&
                            `Campaign Not Selected`}
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
          <div className="col-xl-1"></div>
        </div>
      </div>
    </div>
  );
};
export default Dashboardteam;
