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
import { ToastContainer, toast } from "react-toastify";

export default function Electionhistory({ handleFilterData }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [values, setValues] = React.useState({
    VTR: { query: "", path: "" },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (evt) => {
    if (evt.target.name === "VTRQUERY") {
      setValues({
        ...values,
        VTR: { ...values.VTR, query: evt.target.value },
      });
    } else {
      setValues({
        ...values,
        VTR: { ...values.VTR, path: evt.target.value },
      });
    }
  };

  const handleSubmit = () => {
    if (values.VTR.path === "" || values.VTR.query === "") {
      toast.error("Please select all the field", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    handleFilterData(values);
    handleClose();
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
        <i class="fas fa-angle-down text-danger mx-2"></i> Election History
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-danger">
          Election History Filter
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is the Filter for filtering the Voters on the base of their
            Election History
          </DialogContentText>
          <br />

          <br />

          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Election"
              name="VTRQUERY"
              value={values.VTR.query}
              onChange={handleChange}
            >
              <MenuItem value="A">Absantee</MenuItem>
              <MenuItem value="E">Early Voting</MenuItem>
              <MenuItem value="Y">In Person</MenuItem>
            </Select>
          </FormControl>

          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Searching Path
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Election"
              name="VTRPATH"
              value={values.VTR.path}
              onChange={handleChange}
            >
              <MenuItem value="VTR_PPP12">VTR_PPP12</MenuItem>
              <MenuItem value="VTR_PPP16">VTR_PPP16</MenuItem>
              <MenuItem value="VTR_PPP20">VTR_PPP20</MenuItem>
              <MenuItem value="VTR_GEN12">VTR_GEN12</MenuItem>
              <MenuItem value="VTR_GEN16">VTR_GEN16</MenuItem>
              <MenuItem value="VTR_GEN20">VTR_GEN20</MenuItem>
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
