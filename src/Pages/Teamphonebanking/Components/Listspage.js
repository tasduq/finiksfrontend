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
import Header from "../../../Components/Header";
import Logo from "../../../Assets/logoword.png";
import { ToastContainer, toast } from "react-toastify";
import Listtable from "./Listtable";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Listspage({ data }) {
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    setUpdate(true);
  };

  useEffect(() => {
    setUpdate(false);
  }, [update === true]);

  return (
    <div>
      <button
        style={{
          width: "491px",
          height: "58px",
          backgroundColor: "#D12E2F",
          color: "white",
        }}
        className="btn"
        onClick={handleClickOpen}
      >
        Use Your Own Number
      </button>

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
        <div
          className="container"
          style={{ backgroundColor: "#FCFCFC", height: "100vh" }}
        >
          <Header name="Phone bank" purpose="" />
          <br />
          <div>
            <div
              className=" p-4 mb-2"
              style={{
                minHeight: "500px",
                height: "auto",
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                boxShadow: " 0px 10px 24px #00000029",
              }}
            >
              <button
                onClick={handleClose}
                className="text-left btn px-0"
                style={{ color: "#d12e2f" }}
              >
                <i class="fas fa-angle-left mr-2"></i> Back
              </button>
              <Listtable data={data} />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
