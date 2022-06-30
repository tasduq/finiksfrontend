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
import validator from "validator";
import { editClient } from "../../../Connection/Clients";
import { ToastContainer, toast } from "react-toastify";

export default function FormDialog({ data, handleUpdate }) {
  console.log(data);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [values, setValues] = useState({
    email: data.email,
    campaignName: data.campaignName,
    startDate: data.startDate,
    endDate: data.endDate,
    election: data.election,
    state: data.state,
    district: data.district,
    level: data.level,
    id: data._id,
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

  const handleValidate = () => {
    let test = validator.isEmail(values.email);
    return test;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const testStatus = handleValidate(values.email);

    if (testStatus === false) {
      alert("Email is not valid");
      return;
    }
    console.log("I am called");

    let res = await editClient({
      ...values,
    });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleClose();
      handleUpdate();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    setValues({
      email: data.email,
      campaignName: data.campaignName,
      startDate: data.startDate,
      endDate: data.endDate,
      election: data.election,
      state: data.state,
      district: data.district,
      level: data.level,
      id: data._id,
    });
  }, [data]);

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}

      <button
        style={{
          color: "white",
          backgroundColor: "#d12e2f",
          width: "88px",
          height: "36px",
        }}
        className="btn"
        onClick={handleClickOpen}
      >
        Edit
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-danger">Edit Campaign</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can update the Campaign Details of your client
          </DialogContentText>
          <br />
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={values.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="campaignName"
              value={values.campaignName}
              onChange={handleChange}
            />
          </div>

          <br />
          <div className="d-flex">
            <div class="form-group ">
              <label for="exampleInputPassword1">Start</label>
              <input
                type="date"
                class="form-control"
                id="exampleInputPassword1"
                name="startDate"
                value={values.startDate}
                onChange={handleChange}
              />
            </div>
            <div class="form-group mx-3">
              <label for="exampleInputPassword1">End</label>
              <input
                type="date"
                class="form-control"
                id="exampleInputPassword1"
                name="endDate"
                value={values.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Election</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Election"
              value={values.election}
              onChange={handleChange}
              name="election"
            >
              <MenuItem value="primary">Primary</MenuItem>
              <MenuItem value="general">General</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="State"
              value={values.state}
              onChange={handleChange}
              name="state"
              //   onChange={handleChange}
            >
              <MenuItem value="Alabama">Alabama</MenuItem>
              <MenuItem value="Alaska">Alaska</MenuItem>
              <MenuItem value="Arizona">Arizona</MenuItem>
              <MenuItem value="Arkansas">Arkansas</MenuItem>
              <MenuItem value="California">California</MenuItem>
              <MenuItem value="Colorada">Colorada</MenuItem>
              <MenuItem value="Florida">Florida</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Level</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Level"
              //   onChange={handleChange}
              value={values.level}
              onChange={handleChange}
              name="level"
            >
              <MenuItem value="Fedral - Senate">Fedral - Senate</MenuItem>
              <MenuItem value="Fedral - House">Fedral - House</MenuItem>
              <MenuItem value="State - Statewide">State - Statewide</MenuItem>
              <MenuItem value="State - Senate">State - Senate</MenuItem>
              <MenuItem value="State - House">State - House</MenuItem>
              <MenuItem value="County - County Wide">
                County - County Wide
              </MenuItem>
              <MenuItem value="County - County Commision">
                County - County Commision
              </MenuItem>
              <MenuItem value="City - City Wide">City - City Wide</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">District</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="District"
              //   onChange={handleChange}
              value={values.district}
              onChange={handleChange}
              name="district"
            >
              <MenuItem value="N/A">N/A</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button className="text-danger" onClick={handleSubmit}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
