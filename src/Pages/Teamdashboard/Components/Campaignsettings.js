import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Header from "../../../Components/Header";
import Avatar from "@mui/material/Avatar";
import Imagepicker from "../../../Components/Imagepicker";
import Logo from "../../../Assets/logoword.png";
import { getNewCode } from "../../../Connection/Campaign";
import { ToastContainer, toast } from "react-toastify";
import {
  updateCampaignData,
  getCampaignData,
} from "../../../Connection/Campaign";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Campaignsettings({ handleGetData }) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    campaignCode: "",
    campaignLogo: "",
    campaignDates: {
      electionDay: "",
      campaignFilingDates: "",
      lastDateSignup: "",
      lastDateRegister: "",
      voteEarlyDate: "",
    },
    campaignId: window.localStorage.getItem("id"),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedImage = (image) => {
    console.log(image);
    setValues({
      ...values,
      campaignLogo: image,
    });
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      campaignDates: {
        ...values.campaignDates,
        [name]: value,
      },
    });
  };

  const handleCodeChange = (evt) => {
    setValues({
      ...values,
      campaignCode: evt.target.value,
    });
  };

  const handleNewCode = async () => {
    let res = await getNewCode();
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setValues({
        ...values,
        campaignCode: res.data.code,
      });
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleSubmit = async () => {
    let res = await updateCampaignData({ ...values });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleClose();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    const handleGetCampaignData = async () => {
      const res = await getCampaignData({
        campaignId: window.localStorage.getItem("id"),
      });
      console.log(res);
      if (res.data.success === true) {
        setValues({
          ...res.data.values,
          campaignId: window.localStorage.getItem("id"),
        });
        handleGetData(res.data.values);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    handleGetCampaignData();
    // setUpdate(false);
  }, []);

  return (
    <div>
      {console.log(values)}
      <p
        className=" mt-1"
        style={{ color: "#D12E2F", fontSize: "10px" }}
        onClick={handleClickOpen}
      >
        Edit
      </p>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {/* <AppBar
          style={{ backgroundColor: "#FFFFFF" }}
          sx={{ position: "relative" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              //   color=""
              onClick={handleClose}
              aria-label="close"
              style={{ color: "black" }}
            >
              <CloseIcon />
            </IconButton>
            <img style={{ width: "90px" }} src={Logo} />
            
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar> */}
        <div>
          <div className=" container">
            <Header
              name="Campaign Settings"
              purpose="Edit Your Campaign Information"
            />
            <div
              className="shadow-sm p-5"
              style={{
                backgroundColor: "#FFFFFF",
                height: "auto",
                borderRadius: "12px",
              }}
            >
              <button
                onClick={handleClose}
                className="text-left btn px-0"
                style={{ color: "#d12e2f" }}
              >
                <i class="fas fa-angle-left mr-2"></i> Back
              </button>
              <div className="row">
                <div className="col-12 col-md-6 text-center">
                  <h3 style={{ color: "#d12e2f" }}>Campaign</h3>
                  <div className=" d-flex justify-content-center">
                    <Avatar
                      sx={{ bgcolor: "#FF914D", width: 150, height: 150 }}
                      src={
                        values.campaignLogo?.length > 1
                          ? values.campaignLogo
                          : ""
                      }
                    >
                      C
                    </Avatar>
                  </div>
                  <Imagepicker selectedImage={handleSelectedImage} />
                </div>
                <div className="col-12 col-md-6">
                  <div class="form-group">
                    <label
                      style={{ color: "#d12e2f" }}
                      for="exampleInputEmail1"
                    >
                      When Is Your Election Day:
                    </label>
                    <input
                      type="date"
                      className="form-control shadow-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={values.campaignDates.electionDay}
                      onChange={handleChange}
                      name="electionDay"
                    />
                  </div>
                  <div class="form-group">
                    <label
                      style={{ color: "#d12e2f" }}
                      for="exampleInputEmail1"
                    >
                      WWhat Is The First Day You Can File For The Campaign:
                    </label>
                    <input
                      type="date"
                      className="form-control shadow-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={values.campaignDates.campaignFilingDates}
                      onChange={handleChange}
                      name="campaignFilingDates"
                    />
                  </div>
                  <div class="form-group">
                    <label
                      style={{ color: "#d12e2f" }}
                      for="exampleInputEmail1"
                    >
                      What Is The Last Day For Voter “Vote By Mail” Signup:
                    </label>
                    <input
                      type="date"
                      className="form-control shadow-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={values.campaignDates.lastDateSignup}
                      onChange={handleChange}
                      name="lastDateSignup"
                    />
                  </div>
                  <div class="form-group">
                    <label
                      style={{ color: "#d12e2f" }}
                      for="exampleInputEmail1"
                    >
                      What Is The Last Day To Register Voters To Vote:
                    </label>
                    <input
                      type="date"
                      className="form-control shadow-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={values.campaignDates.lastDateRegister}
                      onChange={handleChange}
                      name="lastDateRegister"
                    />
                  </div>
                  <div class="form-group">
                    <label
                      style={{ color: "#d12e2f" }}
                      for="exampleInputEmail1"
                    >
                      What Is The First Day Of Early Voting:
                    </label>

                    <input
                      type="date"
                      className="form-control shadow-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={values.campaignDates.voteEarlyDate}
                      onChange={handleChange}
                      name="voteEarlyDate"
                    />
                  </div>
                  <div class="form-group">
                    <label
                      style={{ color: "#d12e2f" }}
                      for="exampleInputEmail1"
                    >
                      Campaign joining Code
                    </label>
                    <input
                      type="text"
                      className="form-control shadow-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={values.campaignCode}
                      onChange={handleCodeChange}
                      name="campaignCode"
                      disabled
                    />
                    <br />
                    {/* <button
                      onClick={handleNewCode}
                      className="btn btn-sm btn-danger"
                    >
                      Genrate New Code
                    </button> */}
                    <button
                      style={{
                        color: "#FFFFFF",
                        backgroundColor: "#d12e2f",
                        width: "124.9px",
                        height: "35px",
                      }}
                      // className={`btn btn-sm mx-4 px-3 py-2 ${
                      //   locationActive === true ? "" : "disabled"
                      // }`}
                      onClick={handleSubmit}
                      className="btn btn-sm  px-3 py-2"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
