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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { editScript } from "../../../Connection/Script";
import { ToastContainer, toast } from "react-toastify";

export default function Editscript({ handleUpdate, data }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [values, setValues] = React.useState({
    scriptName: data.scriptName,
    description: data.description,
    status: data.status,
    script: data.script,
    campaignOwnerId: window.localStorage.getItem("id"),
    id: data._id,
  });

  const handleChange = (evt) => {
    let { name, value } = evt.target;
    console.log(name, value);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    handleClose();
    const res = await editScript({ ...values });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      handleUpdate();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setValues({
      scriptName: data.scriptName,
      description: data.description,
      status: data.status,
      script: data.script,
      campaignOwnerId: window.localStorage.getItem("id"),
      id: data._id,
    });
  }, [data]);

  return (
    <div>
      {/* <button
        style={{ color: "#FFFFFF", backgroundColor: "#d12e2f" }}
        className="btn px-3 py-1"
        onClick={handleClickOpen}
      >
        Edit
      </button> */}
      <button
        style={{
          color: "white",
          backgroundColor: "#d12e2f",
          width: "143px",
          height: "36px",
        }}
        className="btn"
        onClick={handleClickOpen}
      >
        Edit
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-danger">Script</DialogTitle>
        <DialogContent>
          <DialogContentText>
            There you can update the scripts for you campaign select them later
            while creating lists
          </DialogContentText>
          <br />

          <br />
          <InputLabel id="demo-simple-select-label">Script Name</InputLabel>
          <FormControl fullWidth size="small">
            <div class="form-group">
              <input
                type="text"
                className="form-control shadow-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="scriptName"
                value={values.scriptName}
                onChange={handleChange}
              />
            </div>
          </FormControl>
          <br />
          <InputLabel id="demo-simple-select-label">
            Script Description
          </InputLabel>
          <FormControl fullWidth size="small">
            <div class="form-group">
              <input
                type="text"
                className="form-control shadow-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </div>
          </FormControl>
          <br />
          <InputLabel id="demo-simple-select-label">Your Script</InputLabel>
          <FormControl fullWidth size="small">
            <div class="form-group">
              <textarea
                type="text"
                className="form-control shadow-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                rows="6"
                name="script"
                value={values.script}
                onChange={handleChange}
              />
            </div>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Choose Active Status
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={true}
              value={values.status}
              name="status"
              onChange={handleChange}
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Active"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Inactive"
              />
            </RadioGroup>
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
