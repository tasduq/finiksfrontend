import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Screenshotpicker from "./Screenshotspicker";
import Slide from "@mui/material/Slide";
import { toast } from "react-toastify";

import { submitReportaproblem } from "../Connection/Reportaproblem";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FloatingButton = () => {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    email: "",
    issue: "",
    issueDetail: "",
    screenshots: [],
  });
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    console.log("clickedddddd ====>");
    setOpen(true);
  };
  const floatingButtonStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px 20px",
    backgroundColor: "#d12e2f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const selectedFile = async (images) => {
    console.log(images, "hello images =====>");
    setValues({
      ...values,
      screenshots: images,
    });
  };

  const handleSubmit = async () => {
    console.log(values, "this is submit data ====>");
    setLoading(true);
    let response = await submitReportaproblem(values);
    console.log(response);
    if (response?.data.success === true) {
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
      handleClose();
    } else {
      toast.error(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    }
  };
  return (
    <div>
      {console.log(values, "=======> values")}
      <button
        onClick={handleClickOpen}
        className="btn btn-sm"
        style={floatingButtonStyle}
      >
        Report a problem
      </button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div>
          <div className=" container mt-5">
            <div className="text-left">
              {" "}
              <h1 className="mt-4 ">Report A Problem</h1>
              <p>Report an Error or Bug</p>
            </div>
            <div
              className="shadow px-4 py-4 mt-5"
              style={{
                backgroundColor: "#FFFFFF",
                height: "auto",
                borderRadius: "12px",
              }}
            >
              <div className="">
                <button
                  className="text-left btn"
                  style={{ color: "#d12e2f" }}
                  onClick={handleClose}
                >
                  <i className="fas fa-angle-left mx-2"></i> Back
                </button>
                <div>
                  <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                      <div class="form-group">
                        <label
                          style={{ color: "#d12e2f" }}
                          for="exampleInputEmail1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control shadow-sm"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={values.email}
                          onChange={handleChange}
                          name="email"
                        />
                        <br />
                        <label
                          style={{ color: "#d12e2f" }}
                          for="exampleInputEmail1"
                        >
                          Issue
                        </label>
                        <input
                          type="text"
                          className="form-control shadow-sm"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={values.issue}
                          onChange={handleChange}
                          name="issue"
                        />
                        <br />
                        <label
                          style={{ color: "#d12e2f" }}
                          for="exampleInputEmail1"
                        >
                          Issue Detail (Please Explain What is Wrong)
                        </label>
                        <textarea
                          type="text"
                          rows="5"
                          className="form-control shadow-sm"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={values.issueDetail}
                          onChange={handleChange}
                          name="issueDetail"
                        />
                        <br />
                        <p>
                          {values?.screenshots?.length} screenshots selected
                        </p>
                        <Screenshotpicker selectedFile={selectedFile} />
                        <br />
                        <div className="text-center">
                          {loading ? (
                            <div className="text-center">
                              <div
                                class="spinner-border text-danger"
                                role="status"
                              >
                                <span class="sr-only">Loading...</span>
                              </div>
                            </div>
                          ) : (
                            <button
                              style={{
                                color: "#FFFFFF",
                                backgroundColor: "#d12e2f",
                                width: "124.9px",
                                height: "35px",
                              }}
                              onClick={handleSubmit}
                              className="btn btn-sm  px-3 py-2"
                            >
                              Submit
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-1"></div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default FloatingButton;
