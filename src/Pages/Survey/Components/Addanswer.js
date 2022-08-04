import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({ handleAns, open, handleOpenAddAns }) {
  // const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [ans, setAns] = React.useState("");

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  // const handleClose = () => {
  //   setOpenDialog(false);
  // };
  // const handleOpen = () => {
  //   alert("clicked");
  //   setOpenDialog(true);
  // };

  const handleChange = (evt) => {
    setAns(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    console.log(ans);
    handleAns(ans);
    handleOpenAddAns();
  };

  return (
    <div>
      {/* <button className="btn">
        <i
          style={{
            color: "#D12E2F",
            width: "25px",
            height: "25px",
          }}
          class="fas fa-plus-circle mt-3"
        ></i>
      </button> */}
      {/* <button
        style={{
          width: "150px",
          height: "36px",
          backgroundColor: "#D12E2F",
          color: "white",
        }}
        className="btn "
        // onClick={() => handleInfo(list._id)}
        onClick={handleOpen}
      >
        Add New Survey
      </button> */}
      <Dialog open={open} onClose={handleOpenAddAns}>
        <DialogTitle className="text-danger">Create New Answer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            There you can make a new Answer for the Survey Qustion
          </DialogContentText>
          <br />
          <div class="form-group">
            <label for="exampleInputEmail1">Answer</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={ans}
              onChange={handleChange}
              name="ans"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenAddAns}>Cancel</Button>
          <Button className="text-danger" onClick={handleSubmit}>
            Add Answer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
