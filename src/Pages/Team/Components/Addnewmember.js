import * as React from "react";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";
import {
  inviteTeamMember,
  getCampaignData,
} from "../../../Connection/Campaign";
import TextField from "@mui/material/TextField";

import Logo from "../../../Assets/logoword.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Addnewmember({ handleUpdate, data, campaignId }) {
  // console.log(campaignData, "i am campaigndata");
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [values, setValues] = React.useState({
    // firstName: "",
    // lastName: "",
    // phoneNumber: "",
    email: data ?? "",
    // address: "",
    permission: "",
    campaignPosition: "",
    about: "",
    campaignId: window.localStorage.getItem("id"),
    campaignName: window.localStorage.getItem("username"),
    campaignCode: window.localStorage.getItem("campaignCode"),
  });

  // const handle

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedImage = (image) => {
    console.log(image);
    setValues({
      ...values,
      image: image,
    });
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (values.permission.length <= 0) {
      toast.error("Selecting Permission is Compulsary", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    setSaving(true);
    let campaignCode = window.localStorage.getItem("campaignCode");
    if (campaignCode) {
      let res = await inviteTeamMember({
        ...values,
        inviterEmail: window.localStorage.getItem("email"),
      });
      console.log(res);
      if (res.data.success === true) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setValues({
          email: "",
          permission: "",
          campaignPosition: "",
          about: "",
          campaignId: window.localStorage.getItem("id"),
          campaignName: window.localStorage.getItem("username"),
          campaignCode: window.localStorage.getItem("campaignCode"),
        });
        setSaving(false);
        handleClose();
        handleUpdate();
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      let campaignData = await getCampaignData({
        campaignId: campaignId,
      });
      console.log(campaignData, "i am campaignData");
      let res = await inviteTeamMember({
        ...values,
        campaignId: campaignId ? campaignId : window.localStorage.getItem("id"),
        inviterEmail: window.localStorage.getItem("email"),
        campaignCode: campaignData?.data.values.campaignCode,
        campaignName: campaignData?.data.values.campaignName,
      });
      console.log(res);
      if (res.data.success === true) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setValues({
          email: "",
          permission: "",
          campaignPosition: "",
          about: "",
          campaignId: window.localStorage.getItem("id"),
          campaignName: window.localStorage.getItem("username"),
          campaignCode: window.localStorage.getItem("campaignCode"),
        });
        setSaving(false);
        handleClose();
        handleUpdate();
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  React.useEffect(() => {
    setValues({
      ...values,
      email: data,
    });
  }, [data]);

  return (
    <div style={{ backgroundColor: "#FCFCFC" }}>
      {console.log(values)}
      <p
        style={{ color: "#FFFFFF", backgroundColor: "#583689" }}
        className="btn px-3 py-2 mt-2"
        onClick={handleClickOpen}
      >
        Add New
      </p>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {/* <AppBar
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
         
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar> */}
        <div style={{ backgroundColor: "#FCFCFC" }}>
          <div className=" container">
            <Header
              name="Organizational Chart"
              purpose="See contact information and chain of command for your team"
            />
            <div
              className="shadow-sm p-5"
              style={{
                backgroundColor: "#FFFFFF",
                height: "auto",
                borderRadius: "12px",
              }}
            >
              <button
                onClick={handleClose}
                className="text-left btn px-0"
                style={{ color: "#d12e2f" }}
              >
                <i class="fas fa-angle-left mr-2"></i> Back
              </button>
              <div className="row">
                <div className="col-12 col-md-6 text-left">
                  <h3 style={{ color: "#d12e2f" }}>Invite Team Member</h3>

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
                  </div>

                  <InputLabel
                    style={{ color: "#d12e2f" }}
                    id="demo-simple-select-label"
                  >
                    Permission Level
                  </InputLabel>
                  <FormControl fullWidth size="small">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      //   value={age}
                      label="Election"
                      name="permission"
                      value={values.permission}
                      onChange={handleChange}
                    >
                      <MenuItem value="campaignManager">Manager</MenuItem>
                      <MenuItem value="Volunteer">Volunteer</MenuItem>
                    </Select>
                  </FormControl>
                  <br />
                  <br />
                  <InputLabel
                    style={{ color: "#d12e2f" }}
                    id="demo-simple-select-label"
                  >
                    Campaign Position
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    label=""
                    name="campaignPosition"
                    value={values.campaignPosition}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Ex. Communication Director"
                    fullWidth
                    size="small"
                  />

                  <br />
                  <br />
                  <div>
                    <div className="text-left">
                      {" "}
                      <div className="text-center">
                        {saving === true && (
                          <div className="text-center">
                            <div
                              class="spinner-border text-danger"
                              role="status"
                            >
                              <span class="sr-only">Loading...</span>
                            </div>
                          </div>
                        )}
                      </div>
                      {saving === false && (
                        <button
                          style={{
                            color: "#FFFFFF",
                            backgroundColor: "#d12e2f",
                            width: "124.9px",
                            height: "35px",
                          }}
                          // className={`btn btn-sm mx-4 px-3 py-2 ${
                          //   locationActive === true ? "" : "disabled"
                          // }`}
                          onClick={handleSubmit}
                          className="btn btn-sm  px-3 py-2"
                        >
                          Invite
                        </button>
                      )}
                    </div>
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
}
