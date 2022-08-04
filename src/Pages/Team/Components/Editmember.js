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
import { editTeamMember } from "../../../Connection/Campaign";

import Logo from "../../../Assets/logoword.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Editmember({ handleUpdate, data }) {
  console.log(data);
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    permission: "",
    campaignId: window.localStorage.getItem("id"),
    campaignName: window.localStorage.getItem("username"),
    campaignCode: window.localStorage.getItem("campaignCode"),
    disabled: false,
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

  const handleSubmit = async () => {
    if (values.permission.length <= 0) {
      toast.error("Selecting Permission is Compulsary", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    setSaving(true);
    let res = await editTeamMember({ ...values });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setValues({
        firstName: "",
        lastName: "",
        // phoneNumber: "",
        email: "",
        // address: "",
        permission: "",
        // image: "",
        about: "",
        campaignId: window.localStorage.getItem("id"),
        campaignName: window.localStorage.getItem("username"),
        campaignCode: window.localStorage.getItem("campaignCode"),
        disabled: false,
      });
      setSaving(false);
      handleClose();
      handleUpdate();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  React.useEffect(() => {
    setValues({
      firstName: data?.memberName.split(" ")[0],
      lastName: data?.memberName.split(" ")[1],
      // phoneNumber: data?.,
      email: data?.email,
      // address: data?.,
      permission: data?.permission,
      about: data?.about,
      campaignId: window.localStorage.getItem("id"),
      campaignName: window.localStorage.getItem("username"),
      campaignCode: window.localStorage.getItem("campaignCode"),
      disabled: data?.disabled,
    });
  }, []);

  return (
    <div style={{ backgroundColor: "#FCFCFC" }}>
      {console.log(values)}
      {/* <p
        style={{ color: "#FFFFFF", backgroundColor: "#583689" }}
        className="btn px-3 py-2"
        onClick={handleClickOpen}
      >
        Add New
      </p> */}
      <a onClick={handleClickOpen} class="dropdown-item">
        {" "}
        Edit
      </a>
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
        <div style={{ backgroundColor: "#FCFCFC" }}>
          <div className="mt-5 container">
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
              {/* <p style={{ color: "#d12e2f" }}>
                <i class="fas fa-angle-left mx-2"></i> Back
              </p> */}
              <div className="row">
                {/* <div className="col-12 col-md-6 text-center"></div> */}
                <div className="col-12 col-md-6">
                  <h3 style={{ color: "#d12e2f" }}>
                    Update Team Member Access
                  </h3>
                  <br />
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
                      label="EPermission"
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
                    Disable from Campaign
                  </InputLabel>
                  <FormControl fullWidth size="small">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      //   value={age}
                      label="Disable from Campaign"
                      name="disabled"
                      value={values.disabled}
                      onChange={handleChange}
                    >
                      <MenuItem value={false}>Active</MenuItem>
                      <MenuItem value={true}>In Active</MenuItem>
                    </Select>
                  </FormControl>
                  <br /> <br />
                  <div className="text-left">
                    {" "}
                    <div className="text-center">
                      {saving === true && (
                        <div className="text-center">
                          <div class="spinner-border text-danger" role="status">
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
                        Update
                      </button>
                    )}
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
