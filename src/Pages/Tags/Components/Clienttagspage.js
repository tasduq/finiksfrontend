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
import Tagstable from "./Tagstable";
import Logo from "../../../Assets/logoword.png";
import { getAristotleData } from "../../../Connection/Aristotle";
import { ToastContainer, toast } from "react-toastify";
import { getClientTags } from "../../../Connection/Tags";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Clienttagspage({
  data,
  dSelect,
  handleDSelect,
  getDataFromServer,
  open,
  handleOpenTags,
  selectButtonDisabled,
}) {
  // const [open, setOpen] = React.useState(false);
  const [clientData, setClientData] = React.useState();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleOpenTags = () => {
  //   setOpen(false);
  // };

  React.useEffect(() => {
    setClientData(data);
    if (getDataFromServer === true) {
      console.log(data, "i a data");
      const handleGetData = async () => {
        console.log("i am running");
        let res = await getClientTags({ id: data });
        console.log(res);
        if (res.data.success) {
          setClientData({
            tags: res.data.clientData,
            campaignName:
              res.data.clientData.length > 0
                ? res.data.clientData[0].ownerName
                : "Campaign Name Not Found",
          });
        } else {
          toast.error(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      };
      handleGetData();
    }
  }, [data]);

  return (
    <div>
      {/* {console.log(usersData)} */}

      {/* <button
        style={{
          width: "150px",
          height: "36px",
          backgroundColor: "#D12E2F",
          color: "white",
        }}
        className="btn "
        // onClick={() => handleInfo(list._id)}
        onClick={handleOpenTags}
      >
        View
      </button> */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleOpenTags}
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
              onClick={handleOpenTags}
              aria-label="close"
              style={{ color: "black" }}
            >
              <CloseIcon />
            </IconButton>
            <img style={{ width: "90px" }} src={Logo} />
            {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography> */}
            <Button autoFocus color="inherit" onClick={handleOpenTags}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <div className="mt-5 container">
            <Header
              name={`Tags - ${clientData?.campaignName}`}
              purpose="Ability to Edit , Merge , record campaign Tags"
            />
            <div
              className="shadow p-5"
              style={{
                backgroundColor: "#FFFFFF",
                height: "auto",
                borderRadius: "12px",
              }}
            >
              <p onClick={handleOpenTags} style={{ color: "#d12e2f" }}>
                <i class="fas fa-angle-left mx-2"></i> Back
              </p>
              {clientData === undefined && (
                <div class="spinner-border text-danger" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
              {clientData && (
                <Tagstable
                  dSelect={dSelect}
                  handleDSelect={handleDSelect}
                  data={clientData.tags}
                  selectButtonDisabled={selectButtonDisabled}
                />
              )}

              {clientData?.length === 0 && <p>No Data Found Make One</p>}
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
