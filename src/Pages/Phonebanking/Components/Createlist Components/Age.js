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

export default function Age({ handleFilterData }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [applied, setApplied] = React.useState(false);
  const [values, setValues] = React.useState({
    AGE: { from: "", to: "" },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeAge = (evt) => {
    if (evt.target.name === "AGEMIN") {
      setValues({
        ...values,
        AGE: { ...values.AGE, from: Number(evt.target.value) },
      });
    } else {
      setValues({
        ...values,
        AGE: { ...values.AGE, to: Number(evt.target.value) },
      });
    }
  };

  const handleSubmit = () => {
    if (values.AGE.from === "" || values.AGE.to === "") {
      toast.error("Please select all the field", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (values.AGE.from > values.AGE.to) {
      toast.error("AGE Min cannot be equal or greater than AGE Max", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    handleFilterData(values);
    setApplied(true);
    handleClose();
  };

  const handleClearAll = () => {
    setValues({
      AGE: { from: "", to: "" },
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
        Age
      </button>
      <Dialog open={open} onClose={handleClose}>
        <div className="d-flex justify-content-between">
          {" "}
          <DialogTitle className="text-danger">Age Filter</DialogTitle>
          <button className="btn text-danger" onClick={handleClearAll}>
            Clear All <i class="fas fa-times"></i>
          </button>
        </div>
        <DialogContent>
          <DialogContentText>
            This is the Filter for filtering the Voters on the base of their Age
          </DialogContentText>
          <br />

          <FormControl fullWidth size="small">
            {/* <InputLabel id="demo-simple-select-label">Minimum Age</InputLabel> */}

            <div class="form-group">
              {/* <input
                type="text"
                className="form-control shadow-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="AGEMIN"
                value={values.AGE.from}
                onChange={handleChangeAge}
              /> */}
              <TextField
                id="outlined-basic"
                label=" AGE Min"
                variant="outlined"
                name="AGEMIN"
                value={values.AGE.from}
                onChange={handleChangeAge}
                size="small"
                type="number"
              />
            </div>
          </FormControl>
          <br />
          <FormControl fullWidth size="small">
            {/* <InputLabel id="demo-simple-select-label">Maximum Age</InputLabel> */}

            <div class="form-group">
              <TextField
                id="outlined-basic"
                label=" AGE Max"
                variant="outlined"
                name="AGEMAX"
                value={values.AGE.to}
                onChange={handleChangeAge}
                size="small"
                type="number"
              />
            </div>
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
