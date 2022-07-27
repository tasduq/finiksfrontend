import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { joinCampaign } from "../../../Connection/Team";
import { ToastContainer, toast } from "react-toastify";

export default function FormDialog({ handleGetJoinedcampaigns }) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    email: window.localStorage.getItem("email"),
    campaignCode: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleJoin = async () => {
    let res = await joinCampaign(values);
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleClose();
      handleGetJoinedcampaigns();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <p
        className=" mt-1"
        style={{ color: "#D12E2F", fontSize: "15px" }}
        onClick={handleClickOpen}
      >
        Join Campaign
      </p>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Join The Campaign</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can code of the campaign you are invited to join to join
            the campaign
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Campaign Code"
            type="text"
            fullWidth
            variant="standard"
            value={values.campaignCode}
            onChange={(evt) =>
              setValues({ ...values, campaignCode: evt.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button style={{ color: "#D12E2F" }} onClick={handleJoin}>
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
