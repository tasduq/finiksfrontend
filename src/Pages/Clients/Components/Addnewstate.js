import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { manageState } from "../../../Connection/Settings";
import { ToastContainer, toast } from "react-toastify";

export default function Addnewstate({ handleUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({
    stateKey: "",
    stateName: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    console.log(values, "i am values");
    let res = await manageState.addState(values);
    console.log(res, "i am response");
    if (res?.data.success) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleClose();
      handleUpdate();
      setValues({
        stateKey: "",
        stateName: "",
      });
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      {console.log(values)}
      <button
        style={{
          backgroundColor: "#d12e2f",
          color: "#FFFFFF",
          minWidth: "250px",
          width: "auto",
          heigth: "36px",
        }}
        className="btn "
        onClick={handleClickOpen}
      >
        Add New State
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-danger">Add New State</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will add new state to the finiks system to use while creating
            the campaign
          </DialogContentText>
          <br />
          <div class="form-group">
            <label for="exampleInputEmail1">State Key</label>
            <small id="emailHelp" class="form-text text-muted">
              State key should be the unique and value used for state in the
              sheet. i.e "FL" for Florida
            </small>

            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={values.stateKey}
              onChange={handleChange}
              name="stateKey"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">State Name</label>
            <small id="emailHelp" class="form-text text-muted">
              State Name must be the name to show in drop down i.e Florida
            </small>

            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={values.stateName}
              onChange={handleChange}
              name="stateName"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button className="text-danger" onClick={handleSubmit}>
            Add State
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
