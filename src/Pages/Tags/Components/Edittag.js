import * as React from "react";
import { useState } from "react";
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
import { editTag } from "../../../Connection/Tags";
import { ToastContainer, toast } from "react-toastify";

export default function FormDialog({ handleUpdate, data }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [values, setValues] = useState({
    tagName: "",
    type: "",
    description: "",
    campaignId: "",
    creatorName: "",
    ownerName: "",
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

    let res = await editTag({
      ...values,
    });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleClose();
      setValues({
        ...values,
        tagName: "",
        description: "",
      });
      handleUpdate();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  React.useEffect(() => {
    setValues({ ...data });
  }, [data]);

  return (
    <div>
      {console.log(values)}
      <button
        style={{
          width: "150px",
          height: "36px",
          backgroundColor: "#D12E2F",
          color: "white",
        }}
        className="btn "
        onClick={handleClickOpen}
      >
        Edit Tag
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-danger">Edit Tag</DialogTitle>
        <DialogContent>
          <DialogContentText>
            There you can Edit a tag for the platform which clients can use
          </DialogContentText>
          <br />
          <div class="form-group">
            <label for="exampleInputEmail1">Tag Name</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={values.tagName}
              onChange={handleChange}
              name="tagName"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Description</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="description"
              value={values.description}
              onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button className="text-danger" onClick={handleSubmit}>
            Update Tag
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
