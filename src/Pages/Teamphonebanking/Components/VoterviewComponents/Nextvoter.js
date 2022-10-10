import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({
  handleNextVoter,
  open,
  handleOpen,
  doNotCall,
  contactLater,
  handleUnSelectChoosedOption,
}) {
  console.log(doNotCall, contactLater);
  // const [open, setOpen] = React.useState(false);
  const [yes, setYes] = React.useState(false);
  const [connected, setConnected] = React.useState();
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // const handleOpen = () => {
  //   setOpen(true);
  // };
  // const handleOpen = () => {
  //   setOpen(false);
  // };

  const handleYes = () => {
    setYes(true);
  };

  const handleNo = () => {
    setYes(false);
    setConnected();
    setValue("");
    handleUnSelectChoosedOption();
    handleOpen();
  };

  const handleConnected = () => {
    setConnected(true);
    setValue("");
  };

  const handleNotConnected = () => {
    setConnected(false);
    setValue("");
  };

  const handleNext = () => {
    handleNextVoter(value);
    handleOpen();
    setYes(false);
    setConnected();
    handleUnSelectChoosedOption();
    setValue("");
  };
  React.useEffect(() => {
    if (doNotCall === true) {
      console.log("do not call running");

      handleYes();
      handleConnected();
      setValue("doNotCall");
    }
    if (contactLater === true) {
      console.log("contact later running");

      handleYes();
      handleConnected();
      setValue("contactLater");
    }
  }, [doNotCall, contactLater]);

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleOpen}>
        Open dialog
      </Button> */}
      <button
        style={{
          borderRadius: "8px",
          backgroundColor: "#FF914D",
          color: "white",
        }}
        className="btn w-100 p-2 mr-1  text-center"
        //   onClick={handleNextVoterCheck}
        onClick={handleOpen}
      >
        Next Voter
      </button>
      <BootstrapDialog
        onClose={handleNo}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        className="text-light"
        style={{ color: "white" }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleNo}
          className="text-center "
          style={{ backgroundColor: "#FF914D", color: "white" }}
        >
          Record Interaction
        </BootstrapDialogTitle>
        <DialogContent className="text-center" dividers>
          <div>
            <h5 className="text-danger mt-4">
              Are You Finished Calling This Voter?
            </h5>
            <br />
            <div>
              <button
                style={{
                  width: "208px",
                  height: "49px",
                  backgroundColor: `${yes === true ? "#FF914D" : ""}`,
                  color: `${yes === true ? "white" : "black"}`,
                }}
                className="btn shadow-sm mx-1"
                onClick={handleYes}
              >
                Yes
              </button>
              <button
                style={{ width: "208px", height: "49px" }}
                className="btn shadow-sm mx-1"
                onClick={handleNo}
              >
                No
              </button>
            </div>
          </div>
          <br />
          <br />
          {yes === true ? (
            <div>
              <h5 className="text-danger mt-4">
                Please Record Your Interaction
              </h5>
              <br />
              <div>
                <button
                  style={{
                    width: "208px",
                    height: "49px",
                    backgroundColor: `${connected === true ? "#FF914D" : ""}`,
                    color: `${connected === true ? "white" : "black"}`,
                  }}
                  className="btn shadow-sm mx-1"
                  onClick={handleConnected}
                >
                  Called , Connected
                </button>
                <button
                  style={{
                    width: "208px",
                    height: "49px",
                    backgroundColor: `${connected === false ? "#FF914D" : ""}`,
                    color: `${connected === false ? "white" : "black"}`,
                  }}
                  className="btn shadow-sm mx-1"
                  onClick={handleNotConnected}
                >
                  Called , No answer
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
          {connected === false && (
            <div>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel value="" control={<Radio />} label="None" />
                  <FormControlLabel
                    value="sentText"
                    control={<Radio />}
                    label="Sent Text"
                  />
                  <FormControlLabel
                    value="leftVoicemail"
                    control={<Radio />}
                    label="Left Voicemail"
                  />
                  <FormControlLabel
                    value="sentEmail"
                    control={<Radio />}
                    label="Sent Email"
                  />
                  <FormControlLabel
                    value="hungUp"
                    control={<Radio />}
                    label="Hung up"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          )}
          {connected === true && (
            <div>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  {/* <FormControlLabel
                    value=""
                    control={<Radio />}
                    label="Un Select"
                  /> */}
                  {doNotCall === true && (
                    <FormControlLabel
                      value="doNotCall"
                      control={<Radio />}
                      label="Do Not Call"
                    />
                  )}

                  {contactLater === true && (
                    <FormControlLabel
                      value="contactLater"
                      control={<Radio />}
                      label="Contact Later"
                    />
                  )}

                  {/* <FormControlLabel
                    value="surveyed"
                    control={<Radio />}
                    label="Surveyed"
                  /> */}
                </RadioGroup>
              </FormControl>
            </div>
          )}
          {(connected === true || connected === false) && (
            <button
              style={{
                borderRadius: "8px",
                // backgroundColor: `${value?.length > 0 ? "#FF914D" : "grey"}`,
                backgroundColor: `${"#FF914D"}`,
                color: "white",
              }}
              className="btn w-75 p-2 m-1  text-center"
              // onClick={value?.length > 0 && handleNext}
              onClick={handleNext}
            >
              Next Voter
            </button>
          )}
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleOpen}>
            Save changes
          </Button> */}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
