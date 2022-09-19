import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Header from "../../../Components/Header";
import Avatar from "@mui/material/Avatar";
import Imagepicker from "../../../Components/Imagepicker";
// import Taginfotable from "./Taginfotable";
import Logo from "../../../Assets/logoword.png";
import { addSurvey } from "../../../Connection/Survey.js";
import { ToastContainer, toast } from "react-toastify";
// import { getTagInfo } from "../../../Connection/Tags";
import Addanswer from "./Addanswer";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Taginfo({ data, handleUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [openAddAns, setOpenAddAns] = React.useState(false);
  //   const [usersData, setUsersData] = React.useState();
  //   const [answers, setAnswers] = React.useState(["Yes", "No", "Maybe"]);
  const [colors, setColors] = React.useState([
    { name: "Orange", code: "#FF914D" },
    { name: "Yellow", code: "#FFBD59" },
    { name: "Blue", code: "#5271FF" },
    { name: "Green", code: "#00C2CB" },
    { name: "Purple", code: "#8C52FF" },
    { name: "Red", code: "#FF5757" },
  ]);
  const [values, setValues] = React.useState({
    surveyName: "",
    surveyPreview: "",
    surveyQuestion: "",
    surveyAnswers: ["Yes", "No", "Maybe"],
    active: true,
    color: { name: "Orange", code: "#FF914D" },
    campaignId: window.localStorage.getItem("id"),
    campaignName: window.localStorage.getItem("campaignName"),
  });
  const [selectedAns, setSelectedAns] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenAddAns = () => {
    console.log("cic");
    setOpenAddAns(!openAddAns);
  };

  const handleAns = (ans) => {
    // setAnswers([...answers, ans]);
    setValues({
      ...values,
      surveyAnswers: [...values.surveyAnswers, ans],
    });
  };

  const handleChangeAns = (evt, i) => {
    console.log(evt.target.value, i);
    let yoo = values.surveyAnswers;
    yoo[i] = evt.target.value;
    console.log(yoo);
    setValues({
      ...values,
      surveyAnswers: yoo,
    });
  };

  const handleRemoveAns = (i) => {
    console.log("delete", i);
    setValues({
      ...values,
      surveyAnswers: values.surveyAnswers.filter((_, index) => index !== i),
    });
  };

  const handleChange = (evt) => {
    let { name, value } = evt.target;
    console.log(name, value);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleAnsChange = (ans) => {
    setValues({
      ...values,
      surveyAnswers: ans,
    });
  };

  const handleColorChange = (evt) => {
    console.log(evt.target.value);
    setValues({
      ...values,
      color: evt.target.value,
    });
  };

  const handleSubmit = async () => {
    if (values.surveyName === "") {
      toast.error("Survey Name cannot be empty", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (values.surveyQuestion === "") {
      toast.error("Survey Question cannot be empty", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (values.surveyPreview === "") {
      toast.error("Survey Preview cannot be empty", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (values.surveyAnswers.length === 0) {
      toast.error("Survey Answer cannot be less than one", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const res = await addSurvey({ ...values });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setValues({
        surveyName: "",
        surveyPreview: "",
        surveyQuestion: "",
        surveyAnswers: ["Yes", "No", "Maybe"],
        active: true,
        color: { name: "Orange", code: "#FF914D" },
        campaignId: window.localStorage.getItem("id"),
        campaignName: window.localStorage.getItem("campaignName"),
      });
      handleClose();
      handleUpdate();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //   React.useEffect(() => {
  //     const handleInfo = async (id) => {
  //       let res = await getTagInfo({ tagId: data });
  //       console.log(res);
  //       if (res.data.success === true) {
  //         setUsersData(res.data.tags);
  //       } else {
  //         toast.error(res.data.message, {
  //           position: toast.POSITION.TOP_RIGHT,
  //         });
  //       }
  //     };

  //     if (open === true) {
  //       //   handleInfo();
  //     }
  //   }, [open]);

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
        // onClick={() => handleInfo(list._id)}
        onClick={handleClickOpen}
      >
        Add New Survey
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
              name={`Surveys`}
              purpose="Create ,  Edit , Delete Surveys"
            />
            <div
              className="shadow p-5"
              style={{
                backgroundColor: "#FFFFFF",
                height: "auto",
                borderRadius: "12px",
              }}
            >
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="d-flex justify-content-between ">
                    <div>
                      {" "}
                      <p onClick={handleClose} style={{ color: "#d12e2f" }}>
                        <i class="fas fa-angle-left mx-2 mt-2"></i> Back
                      </p>
                    </div>

                    <div>
                      {" "}
                      <h4 style={{ color: "#D12E2F" }}>Create Survey</h4>
                    </div>

                    <div>
                      {" "}
                      <button
                        onClick={handleSubmit}
                        style={{ color: "#D12E2F" }}
                        className="btn "
                      >
                        Save
                      </button>
                    </div>
                  </div>
                  <div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Survey Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="surveyName"
                        onChange={handleChange}
                        value={values.surveyName}
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Survey Preview</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputPassword1"
                        name="surveyPreview"
                        onChange={handleChange}
                        value={values.surveyPreview}
                      />
                    </div>

                    <div class="form-group">
                      <label for="exampleFormControlTextarea1">
                        Survey Question
                      </label>
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        name="surveyQuestion"
                        onChange={handleChange}
                        value={values.surveyQuestion}
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlTextarea1">
                        Survey Answers
                      </label>
                      <div className="d-flex">
                        <div className="row">
                          {values.surveyAnswers.map((ans, i) => {
                            return (
                              <div
                                style={{ position: "relative" }}
                                class="form-group mx-1"
                              >
                                {/* <label for="exampleInputEmail1">
                                  Email address
                                </label> */}
                                <i
                                  style={{
                                    color: "#D12E2F",
                                    width: "25px",
                                    height: "25px",
                                    position: "absolute",
                                    bottom: 30,
                                    right: -12,
                                  }}
                                  onClick={() => handleRemoveAns(i)}
                                  class="fas fa-times-circle mt-3"
                                ></i>
                                {/* <i class="fas fa-times-circle"></i> */}
                                <input
                                  type="text"
                                  className="form-control shadow-sm p-3 text-center"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  value={ans}
                                  style={{
                                    width: "105px",
                                    height: "50px",
                                    borderRadius: "5px",
                                  }}
                                  onChange={(evt) => handleChangeAns(evt, i)}
                                />
                              </div>
                            );
                          })}
                        </div>
                        <button onClick={handleOpenAddAns} className="btn">
                          <i
                            style={{
                              color: "#D12E2F",
                              width: "25px",
                              height: "25px",
                            }}
                            class="fas fa-plus-circle mt-3"
                          ></i>
                        </button>
                        {openAddAns === true && (
                          <Addanswer
                            handleAns={handleAns}
                            handleOpenAddAns={handleOpenAddAns}
                            open={openAddAns}
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      {/* <button handleClick={handleOpenAddAns} className="btn">
                          <i
                            style={{
                              color: "#D12E2F",
                              width: "25px",
                              height: "25px",
                            }}
                            class="fas fa-plus-circle mt-3"
                          ></i>
                        </button> */}
                    </div>
                    <div>
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                          Choose Active Status
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue={true}
                          name="active"
                          onChange={handleChange}
                          value={values.active}
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
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 ">
                  <p className="mt-2">Preview</p>
                  <div className="d-flex mt-5">
                    <div
                      style={{
                        width: "50%",
                        height: "auto",
                        minHeight: "310px",
                        backgroundColor: `${
                          values.color.code ? values.color.code : "#FF914D"
                        }`,
                        borderRadius: "20px",
                        color: "white",
                        fontSize: "32px",
                        overflowWrap: "break-word",
                      }}
                      className="p-4 text-center mx-1"
                    >
                      {values.surveyPreview?.length > 0
                        ? values.surveyPreview
                        : "Write your Survey Preview"}
                    </div>
                    <div
                      style={{
                        width: "50%",
                        height: "auto",
                        minHeight: "310px",
                        backgroundColor: "#D9D9D959",
                        // borderRadius: "20px",
                        color: "black",
                        fontSize: "22px",
                        borderRight: `5px solid  ${
                          values.color.code ? values.color.code : "#FF914D"
                        }`,
                        overflowWrap: "break-word",
                      }}
                      className="p-4 text-center mx-1"
                    >
                      {values.surveyQuestion?.length > 0
                        ? values.surveyQuestion
                        : "Write your Survey Question"}
                    </div>
                  </div>
                  <br />
                  <div className="d-flex">
                    <div className="mt-2" style={{ width: "50%" }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          <div className="d-flex">
                            {" "}
                            <p>Select Color</p>
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: `${values.color.code}`,
                              }}
                              className="mt-2 mx-1"
                            ></div>
                          </div>
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={values.color}
                          label="Select Color"
                          onChange={handleColorChange}
                        >
                          {colors.map((color) => {
                            return (
                              <MenuItem value={color}>{color.name}</MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                    <div style={{ width: "50%" }}>
                      <h5
                        style={{
                          color: "#D12E2F",
                          fontWeight: "bold",
                          overflowWrap: "break-word",
                        }}
                        className="p-2 mx-1 shadow-sm"
                      >
                        {values?.surveyPreview
                          ? values.surveyPreview
                          : "Add Your Survey Preview"}
                      </h5>
                      {values.surveyAnswers.map((ans) => {
                        return (
                          <div
                            style={{
                              width: "175px",
                              height: "50px",
                              borderRadius: "5px",
                            }}
                            className="shadow-sm p-3 m-2 text-center"
                          >
                            {ans}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />

            <br />
            <br />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
