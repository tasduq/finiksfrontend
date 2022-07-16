import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Confirmerge({
  handleMerge,
  data,
  open,
  handleOpenConfirmMerge,
}) {
  //   const handleOpenConfirmMerge = () => {
  //     setOpen(true);
  //   };

  //   const handleOpenConfirmMerge = () => {
  //     setOpen(false);
  //   };

  const handleClick = () => {
    handleMerge(data);
    handleOpenConfirmMerge();
  };

  const handleCloseClick = () => {
    handleMerge(false);
    handleOpenConfirmMerge();
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleOpenConfirmMerge}>
        Delete
      </Button> */}
      {/* <button
        style={{
          color: "white",
          backgroundColor: "#d12e2f",
          width: "143px",
          height: "36px",
        }}
        className="btn"
        // onClick={() => handleClick(script, "delete")}
        onClick={handleOpenConfirmMerge}
      >
        Delete
      </button> */}
      <Dialog
        open={open}
        onClose={handleOpenConfirmMerge}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Merge</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to Merge the Tags? This process cannot be Undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClick}>Cancel</Button>
          <button className="btn btn-danger" onClick={handleClick} autoFocus>
            Confirm Merge
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
