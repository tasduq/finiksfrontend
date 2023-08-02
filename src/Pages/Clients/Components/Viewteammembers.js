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
import { getCampaignTeammembers } from "../../../Connection/Campaign";
import { ToastContainer, toast } from "react-toastify";
import Teamtable from "../../Team/Components/Teamtable";
import Addnewmember from "../../Team/Components/Addnewmember";
import Addvotertoteam from "../../Team/Components/Addvotertoteam";
import Invitedteammembers from "../../Team/Components/Invitedteammembers";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Viewteammemberspage({
  data,
  open,
  handleOpenTeammembers,
}) {
  console.log(data);
  // const [open, setOpen] = React.useState(false);
  const [foundTeammembers, setFoundTeammembers] = useState();
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(true);
  };

  // const handleOpenTeammembers = () => {
  //   setOpen(true);
  // };

  // const handleOpenTeammembers = () => {
  //   setOpen(false);
  // };

  const handleSelectedImage = (image) => {
    console.log(image);
  };
  const fetchTeammembers = async (value) => {
    let finiksDataRes = await getCampaignTeammembers({
      emails: value,
      campaignId: data.campaignId,
    });
    console.log(finiksDataRes);
    if (finiksDataRes.data.success === true) {
      console.log("see message");
      setFoundTeammembers(finiksDataRes.data.foundTeammembers);

      // setLoadingMore(false);
    } else {
      toast.error(finiksDataRes.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  React.useEffect(() => {
    if (data) {
      fetchTeammembers(data?.emails.map((member) => member.email));
    }

    // setUpdate(false);
  }, [data]);

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleOpenTeammembers}>
        Open full-screen dialog
      </Button> */}
      {console.log(data)}

      {/* <button
        style={{ color: "#FFFFFF", backgroundColor: "#d12e2f" }}
        className="btn mr-2"
        onClick={handleOpenTeammembers}
      >
        View Aristotle Database
      </button> */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleOpenTeammembers}
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
              onClick={handleOpenTeammembers}
              aria-label="close"
              style={{ color: "black" }}
            >
              <CloseIcon />
            </IconButton>
            <img style={{ width: "90px" }} src={Logo} />
           
            <Button autoFocus color="inherit" onClick={handleOpenTeammembers}>
              Close
            </Button>
          </Toolbar>
        </AppBar> */}
        <div>
          <div className=" container">
            <Header
              name="Campaign Team members"
              purpose="View Campaign Team members and their performance"
            />
            <div
              className="shadow p-5 "
              style={{
                backgroundColor: "#FFFFFF",
                height: "auto",
                borderRadius: "12px",
              }}
            >
              <button
                onClick={handleOpenTeammembers}
                className="text-left btn"
                style={{ color: "#d12e2f" }}
              >
                <i class="fas fa-angle-left mx-2"></i> Back
              </button>
              <div className="d-flex justify-content-between">
                <p onClick={handleOpenTeammembers} style={{ color: "#d12e2f" }}>
                  <i class="fas fa-angle-left mx-2"></i> Back
                </p>
                <div className="text-right d-flex justify-content-end">
                  <Invitedteammembers campaignId={data?.campaignId} />
                  <Addnewmember
                    campaignId={data?.campaignId}
                    data=""
                    handleUpdateData={handleUpdate}
                  />
                  <Addvotertoteam
                    campaignId={data?.campaignId}
                    handleUpdateData={handleUpdate}
                  />
                </div>
              </div>

              <div className="text-center">
                {foundTeammembers === undefined && (
                  <div class="spinner-border text-danger" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                )}
                {foundTeammembers && (
                  <Teamtable
                    campaignId={data?.campaignId}
                    data={foundTeammembers}
                    handleUpdate={handleUpdate}
                  />
                )}

                {foundTeammembers?.length === 0 && <p>No Team Members Found</p>}
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
