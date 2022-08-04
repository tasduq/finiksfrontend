import * as React from "react";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Logo from "../../Assets/logoword.png";
import { ToastContainer, toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import Imagepicker from "../../Components/Imagepicker";
import { updateProfile } from "../../Connection/Finiksgeneral";
import { useAuth } from "../../Context/Auth-Context";
import Updatepassword from "./Updatepassword";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Profile({ btn1, currentRole }) {
  console.log(currentRole);
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    campaignLogo: "",
    phoneNumber: "",
    email: "",
  });

  const { logout, role } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    setUpdate(true);
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
      [name]: value,
    });
  };

  const handleUpdateProfile = async (evt) => {
    console.log(values);
    let res = await updateProfile({
      ...values,
      teamLogin: window.localStorage.getItem("teamLogin"),
      id:
        window.localStorage.getItem("teamLogin") === "true"
          ? window.localStorage.getItem("userId")
          : window.localStorage.getItem("id"),
    });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      window.localStorage.setItem("firstName", values.firstName);
      window.localStorage.setItem("lastName", values.lastName);
      window.localStorage.setItem("address", values.address);
      window.localStorage.setItem("phoneNumber", values.phoneNumber);
      window.localStorage.setItem("campaignLogo", values.campaignLogo);
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    setValues({
      ...values,
      firstName: window.localStorage.getItem("firstName"),
      lastName: window.localStorage.getItem("lastName"),
      address: window.localStorage.getItem("address"),
      campaignLogo: window.localStorage.getItem("campaignLogo"),
      phoneNumber: window.localStorage.getItem("phoneNumber"),
      email: window.localStorage.getItem("email"),
    });
    setUpdate(false);
  }, [update === true]);

  return (
    <div>
      {btn1 ? (
        <button onClick={handleClickOpen} className="btn p-0">
          Profile
        </button>
      ) : (
        <button
          className="btn shadow-sm d-flex justify-content-between align-items-center p-3"
          style={{
            height: "60px",
            width: "100%",
            borderRadius: "5px",
          }}
          onClick={handleClickOpen}
        >
          <Avatar
            sx={{ bgcolor: "#FF914D" }}
            alt={window.localStorage.getItem("username")}
            src={window.localStorage.getItem("campaignLogo")}
          />

          <p className="mt-2"> {window.localStorage.getItem("username")}</p>
          <i
            style={{ fontSize: "30px", color: "#FF914D" }}
            className="far fa-arrow-alt-circle-right"
          ></i>
        </button>
      )}

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
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
            {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography> */}
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ backgroundColor: "#FCFCFC", height: "auto" }}>
          <div className="mt-3 container">
            <br />
            <div className="row">
              <div className="col-1"></div>
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
                      className=" shadow-sm p-3 text-center"
                    >
                      <h5>Profile</h5>
                      <div className="row  ">
                        <div className="col-1"></div>
                        <div className="col-10 mt-3">
                          <div className=" d-flex justify-content-center">
                            <Avatar
                              sx={{
                                bgcolor: "#FF914D",
                                width: 75,
                                height: 75,
                              }}
                              src={
                                values.campaignLogo?.length > 1 &&
                                values.campaignLogo
                              }
                              alt={window.localStorage.getItem("username")}
                            />

                            {/* C
                            </Avatar> */}
                          </div>
                          <Imagepicker selectedImage={handleSelectedImage} />
                          <br /> <br />
                          <div>
                            <div class="form-group text-left">
                              <label
                                style={{ color: "#d12e2f" }}
                                for="exampleInputEmail1"
                              >
                                First Name
                              </label>
                              <input
                                type="text"
                                className="form-control shadow-sm"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={values?.firstName}
                                onChange={handleChange}
                                name="firstName"
                              />
                            </div>
                            <div class="form-group text-left">
                              <label
                                style={{ color: "#d12e2f" }}
                                for="exampleInputEmail1"
                              >
                                Last Name
                              </label>
                              <input
                                type="text"
                                className="form-control shadow-sm"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={values?.lastName}
                                onChange={handleChange}
                                name="lastName"
                              />
                            </div>
                            <div class="form-group text-left">
                              <label
                                style={{ color: "#d12e2f" }}
                                for="exampleInputEmail1"
                              >
                                Phone Number
                              </label>
                              <input
                                type="number"
                                className="form-control shadow-sm"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={values?.phoneNumber}
                                onChange={handleChange}
                                name="phoneNumber"
                              />
                            </div>
                            <div class="form-group text-left">
                              <label
                                style={{ color: "#d12e2f" }}
                                for="exampleInputEmail1"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control shadow-sm"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={values?.email}
                                onChange={handleChange}
                                name="email"
                                disabled
                              />
                            </div>
                            <div class="form-group text-left">
                              <label
                                style={{ color: "#d12e2f" }}
                                for="exampleInputEmail1"
                              >
                                Address
                              </label>
                              <input
                                type="text"
                                className="form-control shadow-sm"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={values?.address}
                                onChange={handleChange}
                                name="address"
                              />
                            </div>
                            <br />
                            <Updatepassword role={currentRole} />
                            <br />
                            <button
                              style={{
                                backgroundColor: "#D12E2F",
                                width: "150px",
                                height: "42px",
                              }}
                              className="btn text-light"
                              onClick={handleUpdateProfile}
                            >
                              Update
                            </button>
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
                        </div>
                        <div className="col-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-3"></div>
                </div>
              </div>
              <div className="col-1"></div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
