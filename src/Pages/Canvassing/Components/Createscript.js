import * as React from "react";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Header from "../../../Components/Header";

import Logo from "../../../Assets/logoword.png";
import Scripttable from "./Scripttable";
import Createnewscript from "./Createnewscript";
import { getScripts, deleteScript } from "../../../Connection/Script";
import { ToastContainer, toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Createscript({ handleScripts }) {
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [foundScripts, setFoundScripts] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    setUpdate(true);
  };

  const handleDelete = async (data) => {
    console.log(data);
    const res = await deleteScript({ id: data._id });
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

  useEffect(() => {
    const handleGetScripts = async () => {
      const res = await getScripts({
        campaignId: window.localStorage.getItem("id"),
      });
      console.log(res);
      if (res.data.success === true) {
        setFoundScripts(res.data.scripts);
        handleScripts(res.data.scripts);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    handleGetScripts();
    setUpdate(false);
  }, [update === true]);

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}

      <button
        style={{ color: "#d12e2f" }}
        className="btn btm-sm "
        onClick={handleClickOpen}
      >
        Create New
      </button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          style={{ backgroundColor: "#FFFFFF" }}
          sx={{ position: "relative" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              //   color=""
              onClick={handleClose}
              aria-label="close"
              style={{ color: "black" }}
            >
              <CloseIcon />
            </IconButton>
            <img style={{ width: "90px" }} src={Logo} />
            {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography> */}
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <div className="mt-5 container">
            <Header
              name="Scripts"
              purpose="Create, Edit Assign Campaign Scripts"
            />
            <div
              className="shadow px-4 py-4"
              style={{
                backgroundColor: "#FFFFFF",
                height: "auto",
                borderRadius: "12px",
              }}
            >
              <div className="d-flex">
                {/* <button
                  style={{ color: "#FFFFFF", backgroundColor: "#d12e2f" }}
                  className="btn px-3 py-1"
                  onClick={handleClickOpen}
                >
                  Create a New Script
                </button> */}
                <Createnewscript handleUpdate={handleUpdate} />
                <input
                  type="text"
                  className="form-control mx-2"
                  placeholder="Search"
                  style={{
                    width: "350px",
                    backgroundColor: "#F2F2F2",
                    border: "none",
                    // boxShadow: "0px 3px 10px #00000029",
                    // borderRadius: "15px",
                  }}
                ></input>
              </div>
              <div>
                {foundScripts?.length === 0 && <p>No Scripts Found</p>}
                {foundScripts && (
                  <Scripttable
                    data={foundScripts}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                  />
                )}
              </div>
            </div>

            <br />
            <br />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
