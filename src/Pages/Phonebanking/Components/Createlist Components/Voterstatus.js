import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";

export default function Voterstatus({ handleFilterData }) {
  // console.log(data, "this is data");
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [applied, setApplied] = React.useState(false);

  const [values, setValues] = React.useState({
    STATUS: "",
    VOT_PREF: "",
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

  const handleSubmit = () => {
    // if (values.STATUS === "" || values.VOT_PREF === "") {
    //   toast.error("Please select all the field", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    //   return;
    // }

    handleFilterData({
      ...(values.STATUS.length > 0 && { STATUS: values.STATUS }),
      ...(values.VOT_PREF.length > 0 && { VOT_PREF: values.VOT_PREF }),
    });
    setApplied(true);
    handleClose();
  };

  const handleClearAll = () => {
    setValues({
      STATUS: "",
      VOT_PREF: "",
    });
    handleFilterData({});
    handleClose();
    setApplied(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <button
        // style={{
        //   backgroundColor: "#d12e2f",
        //   color: "#FFFFFF",
        //   //   width: "304px",
        //   //   heigth: "36px",
        // }}
        className="btn mx-1"
        onClick={handleClickOpen}
      >
        {applied === true && <i class="fas fa-check text-success mx-2"></i>}{" "}
        {applied === false && (
          <i class="fas fa-angle-down text-danger mx-2"></i>
        )}{" "}
        Voterstatus
      </button>
      <Dialog open={open} onClose={handleClose}>
        <div className="d-flex justify-content-between">
          {" "}
          <DialogTitle className="text-danger">Voterstatus Filter</DialogTitle>
          <button className="btn text-danger" onClick={handleClearAll}>
            Clear All <i class="fas fa-times"></i>
          </button>
        </div>
        <DialogContent>
          <DialogContentText>
            This is the Filter for filtering the Voters on the base of their
            Voterstatus
          </DialogContentText>
          <br />

          <br />

          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="STATUS"
              name="STATUS"
              value={values.STATUS}
              onChange={handleChange}
            >
              <MenuItem value="">Un Select</MenuItem>
              <MenuItem value="A">Active</MenuItem>
              <MenuItem value="I">InActive</MenuItem>
              <MenuItem value="S">Suspense</MenuItem>
              <MenuItem value="F">Felon</MenuItem>
              <MenuItem value="D">Deceased</MenuItem>
              <MenuItem value="C">Unknown Cancellation</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Preference</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Preference"
              name="VOT_PREF"
              value={values.VOT_PREF}
              onChange={handleChange}
            >
              <MenuItem value="">Un Select</MenuItem>
              <MenuItem value="A">
                {" "}
                Individual is likely to vote absentee
              </MenuItem>
              <MenuItem value="E"> Individual is likely to vote early</MenuItem>
              <MenuItem value="I">
                {" "}
                Individual is likely to vote in person on election day
              </MenuItem>
              <MenuItem value="U">
                {" "}
                Individual’s preferred method of voting is not known
              </MenuItem>
              {/* <MenuItem value={20}>General</MenuItem> */}
            </Select>
          </FormControl>
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button className="text-danger" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
