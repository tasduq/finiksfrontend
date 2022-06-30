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

export default function Generalvotingscore({ handleFilterData }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [values, setValues] = React.useState({
    VP_GEN: { from: "", to: "" },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (evt) => {
    if (evt.target.name === "VP_GENMIN") {
      setValues({
        ...values,
        VP_GEN: { ...values.VP_GEN, from: Number(evt.target.value) },
      });
    } else {
      setValues({
        ...values,
        VP_GEN: { ...values.VP_GEN, to: Number(evt.target.value) },
      });
    }
  };

  const handleSubmit = () => {
    if (values.VP_GEN.from === "" || values.VP_GEN.to === "") {
      toast.error("Please select all the field", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (values.VP_GEN.from >= values.VP_GEN.to) {
      toast.error("Score Min cannot be equal or greater than Score Max", {
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
        <i class="fas fa-angle-down text-danger mx-2"></i> General voting score
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-danger">
          General voting score Filter
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is the Filter for filtering the Voters on the base of their
            General voting score
          </DialogContentText>
          <br />

          <FormControl fullWidth size="small">
            {/* <InputLabel id="demo-simple-select-label">Minimum Score</InputLabel> */}

            <div class="form-group">
              {/* <input
                type="number"
                className="form-control shadow-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              /> */}
              <TextField
                id="outlined-basic"
                label=" Min Score"
                variant="outlined"
                name="VP_GENMIN"
                value={values.VP_GEN.from}
                onChange={handleChange}
                size="small"
                type="number"
              />
            </div>
          </FormControl>
          <br />
          <FormControl fullWidth size="small">
            {/* <InputLabel id="demo-simple-select-label">Maximum Score</InputLabel> */}

            <div class="form-group">
              {/* <input
                type="number"
                className="form-control shadow-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              /> */}
              <TextField
                id="outlined-basic"
                label=" Max Score"
                variant="outlined"
                name="VP_GENMAX"
                value={values.VP_GEN.to}
                onChange={handleChange}
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
