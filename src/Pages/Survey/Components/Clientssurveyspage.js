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
import Surveystable from "./Surveystable";
import Logo from "../../../Assets/logoword.png";
import { getAristotleData } from "../../../Connection/Aristotle";
import { ToastContainer, toast } from "react-toastify";
import { getTagInfo } from "../../../Connection/Tags";
import { getClientSurvey } from "../../../Connection/Survey";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Clienttagspage({
  data,
  getDataFromServer,
  open,
  handleOpenSurvey,
}) {
  // const [open, setOpen] = React.useState(false);
  const [clientData, setClientData] = React.useState();

  const handleClickOpen = () => {
    // setOpen(true);
  };

  // const handleOpenSurvey = () => {
  //   // setOpen(false);
  // };

  React.useEffect(() => {
    setClientData(data);
    if (getDataFromServer === true) {
      console.log(data, "i a data");
      const handleGetData = async () => {
        console.log("i am running");
        let res = await getClientSurvey({ id: data });
        console.log(res);
        if (res.data.success) {
          setClientData(res.data.clientData);
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
      {console.log(clientData)}

      <button
        style={{
          width: "150px",
          height: "36px",
          backgroundColor: "#D12E2F",
          color: "white",
        }}
        className="btn "
        // onClick={() => handleInfo(list._id)}
        onClick={handleOpenSurvey}
      >
        View
      </button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleOpenSurvey}
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
              onClick={handleOpenSurvey}
              aria-label="close"
              style={{ color: "black" }}
            >
              <CloseIcon />
            </IconButton>
            <img style={{ width: "90px" }} src={Logo} />
            {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography> */}
            <Button autoFocus color="inherit" onClick={handleOpenSurvey}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <div className="mt-5 container">
            {console.log(clientData)}
            <Header
              name={`Surveys - ${clientData?.campaignName}`}
              purpose="Ability to View Surveys"
            />
            <div
              className="shadow p-5"
              style={{
                backgroundColor: "#FFFFFF",
                height: "auto",
                borderRadius: "12px",
              }}
            >
              <p onClick={handleOpenSurvey} style={{ color: "#d12e2f" }}>
                <i class="fas fa-angle-left mx-2"></i> Back
              </p>
              {/* {clientData === undefined && (
                <div class="spinner-border text-danger" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )} */}
              {clientData && <Surveystable data={clientData} />}

              {/* {clientData?.length === 0 && <p>No Data Found Make One</p>} */}
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
