import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { addToTeam } from "../../../../Connection/Team";
import { ToastContainer, toast } from "react-toastify";

export default function Addtoteam({ data }) {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handleSubmit = async () => {
    let res = await addToTeam({
      email: email,
      campaignId: window.localStorage.getItem("id"),
    });
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleClose();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleClose();
    }
  };

  React.useEffect(() => {
    setEmail(data?.length > 0 ? data : "No Email Found in System");
  }, [data]);

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <div
        style={{ color: "#D12E2F" }}
        className="text-center  btn"
        //   onClick = {handleAddToTeam}
        onClick={handleClickOpen}
      >
        <i style={{ fontSize: "25px" }} class="fas fa-user-plus"></i>
        <br /> <p style={{ fontSize: "12px" }}>Add to Team</p>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Invite Voter to Team</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can invite the Voter with email. The voter will recieve the
            Campaign Code to join the campaign
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button className="text-danger" onClick={handleSubmit}>
            Send Invite
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
