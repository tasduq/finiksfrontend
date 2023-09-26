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
import Table from "./Table";
import Logo from "../../../Assets/logoword.png";
import {
  getAristotleData,
  getAristotleDataCount,
} from "../../../Connection/Aristotle";
import { ToastContainer, toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Finiksdatapage({ data }) {
  const [open, setOpen] = React.useState(false);
  const [finiksVotersData, setFiniksVotersData] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [update, setUpdate] = useState(false);
  const [totalVoters, setTotalVoters] = useState("Counting");

  const handleLoadMore = () => {
    setLoadingMore(true);
    setPage(page + 1);
    fetchVoters(page + 1);
  };

  const handleUpdate = () => {
    setUpdate(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedImage = (image) => {
    console.log(image);
  };
  const fetchVoters = async (value) => {
    // let finiksDataRes = await getAristotleData({ bottomHit: value });
    const [finiksDataRes, resTotalCount] = await Promise.all([
      getAristotleData({ bottomHit: value }),
      getAristotleDataCount(),
    ]);
    console.log(finiksDataRes, resTotalCount, "i am response");
    if (finiksDataRes.data.success === true) {
      console.log("see message");
      setFiniksVotersData([
        ...finiksVotersData,
        ...finiksDataRes.data.aristotleData,
      ]);

      setLoadingMore(false);
      setTotalVoters(resTotalCount.data?.aristotleDataTotal);
    } else {
      toast.error(finiksDataRes.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  React.useEffect(() => {
    fetchVoters(1);
    setUpdate(false);
  }, [update === true]);

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      {console.log(data)}

      <button
        style={{ color: "#FFFFFF", backgroundColor: "#d12e2f" }}
        className="btn mr-2"
        onClick={handleClickOpen}
      >
        View Aristotle Database
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
            <Header name="Voters Record" purpose="Voters Data for Finiks" />
            <div
              className="shadow p-5"
              style={{
                backgroundColor: "#FFFFFF",
                height: "auto",
                borderRadius: "12px",
              }}
            >
              <div>
                <button
                  onClick={handleClose}
                  className="text-left btn px-0"
                  style={{ color: "#d12e2f" }}
                >
                  <i class="fas fa-angle-left mr-2"></i> Back
                </button>
                <p className="text-danger ml-2">Total Voters : {totalVoters}</p>
              </div>

              {finiksVotersData.length === 0 && (
                <div class="spinner-border text-danger" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
              {finiksVotersData.length > 0 && <Table data={finiksVotersData} />}
            </div>
            <br />
            <div className="text-right">
              {loadingMore && (
                <button class="btn btn-danger" type="button" disabled>
                  <span
                    class="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Loading...</span>
                </button>
              )}

              {loadingMore === false && (
                <button className="btn btn-danger" onClick={handleLoadMore}>
                  {" "}
                  <i class="fas fa-cloud-download-alt"></i> Load More{" "}
                </button>
              )}
            </div>
            <br />
            <br />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
