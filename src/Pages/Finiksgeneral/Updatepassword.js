import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { updatePassword } from "../../Connection/Team";
import { ToastContainer, toast } from "react-toastify";

export default function Updatepassword({ role }) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    id: window.localStorage.getItem("userId"),
    passwordUpdate: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdatePassword = async () => {
    if (
      values.passwordUpdate.oldPassword == "" ||
      values.passwordUpdate.newPassword === ""
    ) {
      toast.error("Fill all the fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    let res = await updatePassword({
      ...values,
      teamLogin: window.localStorage.getItem("teamLogin"),
    });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleClose();
      setValues({
        id: window.localStorage.getItem("userId"),
        passwordUpdate: {
          oldPassword: "",
          newPassword: "",
        },
      });
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      <button onClick={handleClickOpen} className="btn text-danger">
        Change Password
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can update the password of your account
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Old Password"
            type="text"
            fullWidth
            variant="standard"
            value={values.passwordUpdate.oldPassword}
            onChange={(evt) =>
              setValues({
                ...values,
                passwordUpdate: {
                  ...values.passwordUpdate,
                  oldPassword: evt.target.value,
                },
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Password"
            type="text"
            fullWidth
            variant="standard"
            value={values.passwordUpdate.newPassword}
            onChange={(evt) =>
              setValues({
                ...values,
                passwordUpdate: {
                  ...values.passwordUpdate,
                  newPassword: evt.target.value,
                },
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button style={{ color: "#D12E2F" }} onClick={handleUpdatePassword}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
