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

export default function Primaryvotingscore({ handleFilterData }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [values, setValues] = React.useState({
    VP_PPP: { from: 0, to: 0 },
    VP_PRI: { from: 0, to: 0 },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangePPP = (evt) => {
    if (evt.target.name === "VP_PPPMIN") {
      setValues({
        ...values,
        VP_PPP: { ...values.VP_PPP, from: Number(evt.target.value) },
      });
    } else {
      setValues({
        ...values,
        VP_PPP: { ...values.VP_PPP, to: Number(evt.target.value) },
      });
    }
  };
  const handleChangePRI = (evt) => {
    if (evt.target.name === "VP_PRIMIN") {
      setValues({
        ...values,
        VP_PRI: { ...values.VP_PRI, from: Number(evt.target.value) },
      });
    } else {
      setValues({
        ...values,
        VP_PRI: { ...values.VP_PRI, to: Number(evt.target.value) },
      });
    }
  };

  const handleSubmit = () => {
    if (
      values.VP_PPP.from === "" ||
      values.VP_PPP.to === "" ||
      values.VP_PRI.from === "" ||
      values.VP_PRI.to === ""
    ) {
      toast.error("Please select all the field", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (values.VP_PPP.from >= values.VP_PPP.to) {
      toast.error("Score Min cannot be equal or greater than Score Max", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (values.VP_PRI.from >= values.VP_PRI.to) {
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
        <i class="fas fa-angle-down text-danger mx-2"></i> Primary voting score
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-danger">
          Primary voting score Filter
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is the Filter for filtering the Voters on the base of their
            Primary voting score
          </DialogContentText>
          <br />

          <p style={{ color: "#D12E2F" }}>Party Primary</p>

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
                name="VP_PRIMIN"
                value={values.VP_PRI.from}
                onChange={handleChangePRI}
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
                name="VP_PRIMAX"
                value={values.VP_PRI.to}
                onChange={handleChangePRI}
                size="small"
                type="number"
              />
            </div>
          </FormControl>
          <br />
          <br />
          <p style={{ color: "#D12E2F" }}>Presidential Primary</p>

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
                name="VP_PPPMIN"
                value={values.VP_PPP.from}
                onChange={handleChangePPP}
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
                name="VP_PPPMAX"
                value={values.VP_PPP.to}
                onChange={handleChangePPP}
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
