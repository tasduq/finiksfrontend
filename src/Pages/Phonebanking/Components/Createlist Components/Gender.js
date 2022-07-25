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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { ToastContainer, toast } from "react-toastify";

export default function SEX({ handleFilterData }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [applied, setApplied] = React.useState(false);

  const [values, setValues] = React.useState({
    SEX: "",
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
    // if (values.SEX === "") {
    //   toast.error("Please select all the field", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    //   return;
    // }

    handleFilterData(values);
    setApplied(true);

    handleClose();
  };

  const handleClearAll = () => {
    setValues({
      SEX: "",
    });
    handleFilterData({});
    handleClose();
    setApplied(false);
  };

  return (
    <div>
      <button className="btn mx-1" onClick={handleClickOpen}>
        {applied === true && <i class="fas fa-check text-success mx-2"></i>}{" "}
        {applied === false && (
          <i class="fas fa-angle-down text-danger mx-2"></i>
        )}{" "}
        Sex
      </button>
      <Dialog open={open} onClose={handleClose}>
        <div className="d-flex justify-content-between">
          {" "}
          <DialogTitle className="text-danger">Sex Filter</DialogTitle>
          <button className="btn text-danger" onClick={handleClearAll}>
            Clear All <i class="fas fa-times"></i>
          </button>
        </div>
        <DialogContent>
          <DialogContentText>
            This is the Filter for filtering the Voters on the base of their Sex
          </DialogContentText>
          <br />

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Sex</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              // name="radio-buttons-group"
              // label="STATUS"
              name="SEX"
              value={values.SEX}
              onChange={handleChange}
            >
              <FormControlLabel value="F" control={<Radio />} label="Female" />
              <FormControlLabel value="M" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
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
