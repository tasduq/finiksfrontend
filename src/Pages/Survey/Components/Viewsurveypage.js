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
import { getClientSurveyResponses } from "../../../Connection/Survey";
import Viewsurveytable from "./Viewsurveytable";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Viewsurveypage({
  data,
  handleClickOpen,
  open,
  //   getDataFromServer,
  //   open,
  //   handleOpenSurvey,
}) {
  // const [open, setOpen] = React.useState(false);
  const [surveyData, setSurveyData] = React.useState();
  const [selected, setSelected] = React.useState([]);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClickOpen = () => {
  //   setOpen(false);
  // };

  const handleSelectAll = (type) => {
    if (type === "select") {
      console.log(surveyData);
      let allIds = surveyData.map((survey) => {
        return survey.voterId;
      });
      console.log(allIds);
      setSelected(allIds);
    } else {
      setSelected([]);
    }
  };

  const handleSelected = (data, type) => {
    if (type === "select") {
      console.log(data);
      setSelected([...selected, data]);
    } else {
      let yoo = selected.filter((tag) => {
        return tag !== data;
      });
      console.log(yoo);
      setSelected(yoo);
    }
  };

  const handleOpenTags = () => {};

  React.useEffect(() => {
    // setSurveyData(data);

    console.log(data, "i a data");
    const handleGetSurveyResponses = async () => {
      console.log("i am running");
      let res = await getClientSurveyResponses({
        campaignOwnerId: data?.campaignOwnerId,
        surveyId: data?.survey?.surveyId,
      });
      console.log(res);
      if (res.data.success) {
        setSurveyData(res.data.foundSurveys);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    handleGetSurveyResponses();
  }, [data]);

  return (
    <div>
      {console.log(surveyData, data, selected)}

      {/* {surveyData && (
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
          View
        </button>
      )} */}

      <Dialog
        fullScreen
        open={open}
        onClose={handleClickOpen}
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
              onClick={handleClickOpen}
              aria-label="close"
              style={{ color: "black" }}
            >
              <CloseIcon />
            </IconButton>
            <img style={{ width: "90px" }} src={Logo} />
            {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography> */}
            <Button autoFocus color="inherit" onClick={handleClickOpen}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <div className="mt-5 container">
            {console.log(surveyData)}
            <Header name={`Surveys `} purpose="Ability to View Surveys" />
            <div
              className="shadow p-5"
              style={{
                backgroundColor: "#FFFFFF",
                height: "auto",
                borderRadius: "12px",
              }}
            >
              <div className="d-flex justify-content-between">
                <p onClick={handleClickOpen} style={{ color: "#d12e2f" }}>
                  <i class="fas fa-angle-left mx-2"></i> Back
                </p>
                <div>
                  <button
                    style={{
                      width: "150px",
                      height: "36px",
                      backgroundColor: "#D12E2F",
                      color: "white",
                    }}
                    className="btn mx-1"
                    disabled={selected.length > 0 ? false : true}
                    onClick={selected.length > 0 && handleOpenTags()}
                  >
                    Tag Them
                  </button>
                  <button
                    style={{
                      width: "150px",
                      height: "36px",
                      backgroundColor: "#D12E2F",
                      color: "white",
                    }}
                    className="btn "
                    // onClick={
                    //   selectedTags.includes(list.voterId.toString())
                    //     ? () => handleUnSelect(list.voterId)
                    //     : () => handleSelect(list.voterId)
                    // }
                    onClick={
                      selected.length > 0
                        ? () => handleSelectAll("unselect")
                        : () => handleSelectAll("select")
                    }
                  >
                    {selected.length > 0 ? "Un Select All" : "Select All"}
                  </button>
                </div>
              </div>

              <div className="text-center">
                {" "}
                {surveyData === undefined && (
                  <div class="spinner-border text-danger" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                )}
                {surveyData && (
                  <Viewsurveytable
                    data={{ surveyData, campaignName: data.campaignName }}
                    handleSelected={handleSelected}
                    selected={selected}
                  />
                )}
                {surveyData?.length === 0 && <p>No Data Found </p>}
              </div>
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
