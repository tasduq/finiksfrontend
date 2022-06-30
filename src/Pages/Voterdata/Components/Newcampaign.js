import * as React from "react";
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

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <button
        style={{ backgroundColor: "#d12e2f", color: "#FFFFFF" }}
        className="btn mx-1"
        onClick={handleClickOpen}
      >
        Add New Campaign
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-danger">Create New Campaign</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This would be new Campaign or Client for the Software which can use
            this software
          </DialogContentText>
          <br />
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
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
                onChange={(value) => {
                  console.log(value.target.value);
                }}
              />
            </div>
            <div class="form-group mx-3">
              <label for="exampleInputPassword1">End</label>
              <input
                type="date"
                class="form-control"
                id="exampleInputPassword1"
                onChange={(value) => {
                  console.log(value.target.value);
                }}
              />
            </div>
          </div>

          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Election</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Election"
              //   onChange={handleChange}
            >
              <MenuItem value={10}>Primary</MenuItem>
              <MenuItem value={20}>General</MenuItem>
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
              label="Election"
              //   onChange={handleChange}
            >
              <MenuItem value={10}>Alabama</MenuItem>
              <MenuItem value={20}>Alaska</MenuItem>
              <MenuItem value={20}>Arizona</MenuItem>
              <MenuItem value={20}>Arkansas</MenuItem>
              <MenuItem value={20}>California</MenuItem>
              <MenuItem value={20}>Colorada</MenuItem>
              <MenuItem value={20}>Florida</MenuItem>
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
              label="Election"
              //   onChange={handleChange}
            >
              <MenuItem value={10}>Fedral - Senate</MenuItem>
              <MenuItem value={20}>Fedral - House</MenuItem>
              <MenuItem value={20}>State - Statewide</MenuItem>
              <MenuItem value={20}>State - Senate</MenuItem>
              <MenuItem value={20}>State - House</MenuItem>
              <MenuItem value={20}>County - County Wide</MenuItem>
              <MenuItem value={20}>County - County Commision</MenuItem>
              <MenuItem value={20}>City - City Wide</MenuItem>
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
              label="Election"
              //   onChange={handleChange}
            >
              <MenuItem value={10}>N/A</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button className="text-danger" onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
