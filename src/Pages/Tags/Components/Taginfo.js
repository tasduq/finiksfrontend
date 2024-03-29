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
import Taginfotable from "./Taginfotable";
import Logo from "../../../Assets/logoword.png";
import { getAristotleData } from "../../../Connection/Aristotle";
import { ToastContainer, toast } from "react-toastify";
import { getTagInfo } from "../../../Connection/Tags";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Taginfo({ data }) {
  const [open, setOpen] = React.useState(false);
  const [usersData, setUsersData] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const handleInfo = async (id) => {
      let res = await getTagInfo({ tagId: data });
      console.log(res);
      if (res.data.success === true) {
        setUsersData(res.data.tags);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    if (open === true) {
      handleInfo();
    }
  }, [open]);

  return (
    <div>
      {console.log(usersData)}

      <button
        style={{
          width: "150px",
          height: "36px",
          backgroundColor: "#D12E2F",
          color: "white",
        }}
        className="btn "
        // onClick={() => handleInfo(list._id)}
        onClick={handleClickOpen}
      >
        View Info
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
        <div>
          <div className=" container">
            <Header
              name={`Tags - ${usersData?.tagName}`}
              purpose="Information of what user recorded and tag voters with this tag"
            />
            <div
              className="shadow p-5"
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
              {usersData === undefined && (
                <div class="spinner-border text-danger" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
              {usersData && <Taginfotable data={usersData} />}
              <br />
              {usersData?.users?.length === 0 && (
                <p className="text-center">No Data Found Make One</p>
              )}
            </div>
            <br />

            <br />
            <br />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
