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
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

export default function Electionhistory({ handleFilterData }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [applied, setApplied] = React.useState(false);

  const [values, setValues] = React.useState({
    VTR: { query: [], path: "" },
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

  const handleChangeType = (event) => {
    console.log(event.target.value);
    const {
      target: { value },
    } = event;

    // if(values.district.indexOf(value) > -1){
    //   let yoo = values.district
    // }

    setValues(
      // On autofill we get a stringified value.
      {
        ...values,
        VTR: {
          ...values.VTR,
          query: typeof value === "string" ? value.split(",") : value,
        },
      }
    );
  };

  const handleSubmit = () => {
    if (values.VTR.query.length > 0 && values.VTR.path.length > 0) {
      handleFilterData(values);
      setApplied(true);

      handleClose();
      return;
    }

    if (values.VTR.query.length <= 0 && values.VTR.path === "") {
      handleFilterData({});
      setApplied(true);

      handleClose();
      return;
    }
    if (values.VTR.query.length <= 0 || values.VTR.path === "") {
      toast.error("Please select all the field", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
  };

  const handleClearAll = () => {
    setValues({
      VTR: { query: [], path: "" },
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
        Election History
      </button>
      <Dialog open={open} onClose={handleClose}>
        <div className="d-flex justify-content-between">
          {" "}
          <DialogTitle className="text-danger">
            Election History Filter
          </DialogTitle>
          <button className="btn text-danger" onClick={handleClearAll}>
            Clear All <i class="fas fa-times"></i>
          </button>
        </div>
        <DialogContent>
          <DialogContentText>
            This is the Filter for filtering the Voters on the base of their
            Election History
          </DialogContentText>
          <br />

          <br />

          {/* <FormControl fullWidth size="small">
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
          </FormControl> */}
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              multiple
              //   value={age}
              label="Type"
              //   onChange={handleChange}
              value={values.VTR.query}
              onChange={handleChangeType}
              name="VTRQUERY"
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="A">
                <Checkbox checked={values?.VTR.query.indexOf("A") > -1} />{" "}
                <ListItemText primary={`Absantee , (A)`} />
              </MenuItem>
              <MenuItem value="E">
                <Checkbox checked={values.VTR.query.indexOf("E") > -1} />{" "}
                <ListItemText primary={"Early Voting , (E)"} />
              </MenuItem>
              <MenuItem value="Y">
                <Checkbox checked={values.VTR.query.indexOf("Y") > -1} />{" "}
                <ListItemText primary={"In Person , (Y)"} />
              </MenuItem>
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
              <MenuItem value="">Un Select</MenuItem>
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
