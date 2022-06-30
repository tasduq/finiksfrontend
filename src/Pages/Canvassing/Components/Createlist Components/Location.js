import * as React from "react";
import { useEffect, useState } from "react";
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

export default function Location({ handleFilterData, handleLocationActive }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [values, setValues] = React.useState({
    STATE: "",
    CITY: "",
    AI_COUNTY_NAME: "",
    PREC_NO1: { from: "", to: "" },
    ZIP: { from: "", to: "" },
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

  const handleChangePREC_NO1 = (evt) => {
    if (evt.target.name === "PREC_NO1FROM") {
      setValues({
        ...values,
        PREC_NO1: { ...values.PREC_NO1, from: evt.target.value },
      });
    } else {
      setValues({
        ...values,
        PREC_NO1: { ...values.PREC_NO1, to: evt.target.value },
      });
    }
  };
  const handleChangeZip = (evt) => {
    if (evt.target.name === "ZIPFROM") {
      setValues({
        ...values,
        ZIP: { ...values.ZIP, from: Number(evt.target.value) },
      });
    } else {
      setValues({
        ...values,
        ZIP: { ...values.ZIP, to: Number(evt.target.value) },
      });
    }
  };

  const handleSubmit = () => {
    if (
      values.STATE === "" ||
      values.CITY === "" ||
      values.AI_COUNTY_NAME === "" ||
      values.PREC_NO1.from === "" ||
      values.PREC_NO1.to === "" ||
      values.ZIP.from === "" ||
      values.ZIP.to === ""
    ) {
      toast.error("Please select all the field", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (values.ZIP.from >= values.ZIP.to) {
      toast.error("Zip From cannot be equal or greater than Zip To", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (values.PREC_NO1.from >= values.PREC_NO1.to) {
      toast.error("Precinct From cannot be equal or greater than Precinct To", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    handleFilterData(values);
    handleLocationActive(true);
    handleClose();
  };

  return (
    <div>
      {console.log(values)}
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
        <i class="fas fa-angle-down text-danger mx-2"></i> Location
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-danger">Location Filter</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is the Filter for filtering the Voters on the base of their
            location
          </DialogContentText>
          <br />

          <br />

          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="State"
              name="STATE"
              value={values.STATE}
              onChange={handleChange}
            >
              <MenuItem value="Alabama">Alabama</MenuItem>
              <MenuItem value="Alaska">Alaska</MenuItem>
              <MenuItem value="Arizona">Arizona</MenuItem>
              <MenuItem value="Arkansas">Arkansas</MenuItem>
              <MenuItem value="California">California</MenuItem>
              <MenuItem value="Colorada">Colorada</MenuItem>
              <MenuItem value="FL">Florida</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="City"
              name="CITY"
              value={values.CITY}
              onChange={handleChange}
            >
              <MenuItem value="Gainesville">Gainesville</MenuItem>
              {/* <MenuItem value={20}>General</MenuItem> */}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">County</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="County"
              name="AI_COUNTY_NAME"
              value={values.AI_COUNTY_NAME}
              onChange={handleChange}
            >
              <MenuItem value="ALACHUA">ALACHUA</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Precinct From</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Precinct From"
              name="PREC_NO1FROM"
              value={values.PREC_NO1.from}
              onChange={handleChangePREC_NO1}
            >
              <MenuItem value={27}>27</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Precinct To</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Precinct"
              name="PREC_NO1TO"
              value={values.PREC_NO1.to}
              onChange={handleChangePREC_NO1}
            >
              <MenuItem value={27}>27</MenuItem>
              <MenuItem value={28}>28</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            {/* <div class="form-group">
              <input
                type="text"
                className="form-control shadow-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                // label="Precinct"
                
              />
            </div> */}
            <TextField
              id="outlined-basic"
              label=" ZIP code From"
              variant="outlined"
              name="ZIPFROM"
              value={values.ZIP.from}
              onChange={handleChangeZip}
              size="small"
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            {/* <InputLabel id="demo-simple-select-label">Zip To</InputLabel> */}

            {/* <div class="form-group">
              <input
                type="text"
                className="form-control shadow-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="ZIPTO"
                value={values.ZIP.to}
                onChange={handleChangeZip}
              />
            </div> */}
            <TextField
              id="outlined-basic"
              label=" ZIP code To"
              variant="outlined"
              name="ZIPTO"
              value={values.ZIP.to}
              onChange={handleChangeZip}
              size="small"
            />
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
