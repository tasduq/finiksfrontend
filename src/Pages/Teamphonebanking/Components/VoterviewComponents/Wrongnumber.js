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
import Checkbox from "@mui/material/Checkbox";

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
            color: (theme) => theme.palette.grey[500],
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
  handleWrongNumber,
  data,
  open,
  handleOpen,
}) {
  // const [open, setOpen] = React.useState(false);
  const [yes, setYes] = React.useState(false);
  const [connected, setConnected] = React.useState();
  const [value, setValue] = React.useState(data);
  const [wrongNumber, setWrongNumber] = React.useState([]);

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event, i) => {
    console.log(event.target.value);
    setChecked(event.target.checked);

    // if (i === 0 && event.target.checked === true) {
    //   let yoo = wrongNumber;
    //   yoo.splice(0, 0, {
    //     number: event.target.value.toString(),
    //     name: "MOBILE_NUM",
    //   });
    //   console.log(yoo);

    //   setWrongNumber(yoo);
    // } else {
    //   wrongNumber.splice(0, 1);
    // }
    // if (i === 1 && event.target.checked === true) {
    //   let yoo = wrongNumber;
    //   yoo.splice(1, 0, {
    //     number: event.target.value.toString(),
    //     name: "PHONE_NUM",
    //   });
    //   console.log(yoo);

    //   setWrongNumber(yoo);
    // } else {
    //   wrongNumber.splice(1, 1);
    // }
    if (event.target.checked) {
      setWrongNumber([...wrongNumber, i === 0 ? "MOBILE_NUM" : "PHONE_NUM"]);
    } else {
      let arr = wrongNumber.filter(
        (number) => number !== event.target.value.toString()
      );
      setWrongNumber(arr);
    }
  };

  // const handleClickOpen = () => {
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
    handleOpen();
  };

  const handleConnected = () => {
    setConnected(true);
    setValue("Called");
  };

  const handleNotConnected = () => {
    setConnected(false);
    setValue("sentText");
  };

  const handleNext = () => {
    handleWrongNumber(wrongNumber);
    handleOpen();
    setWrongNumber([]);
  };

  React.useEffect(() => {
    setValue(data);
  }, [data]);

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      {/* <button
        style={{
          borderRadius: "8px",
          backgroundColor: "#D9D9D9",
        }}
        className="btn w-100 p-2 m-1  text-center"
        // onClick={handleWrongNumber}
        onClick={handleClickOpen}
      >
        Wrong Number
      </button> */}
      <BootstrapDialog
        onClose={handleOpen}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        {/* <BootstrapDialogTitle
          // id="customized-dialog-title"
          onClose={handleOpen}
          className="text-center"
          style={{ backgroundColor: "#FF914D", color: "white" }}
        >
          hello
        </BootstrapDialogTitle> */}
        <div
          onClose={handleOpen}
          className="text-center pt-3"
          style={{ backgroundColor: "#FF914D", color: "white" }}
        >
          <p> Please select which number is incorrect</p>
        </div>
        <DialogContent className="text-center" dividers>
          <div>
            {value?.map((val, i) => {
              console.log(val);
              return (
                <>
                  <div className="d-flex jutify-content-between">
                    <Checkbox
                      checked={wrongNumber[i]?.number?.includes(
                        val?.toString()
                      )}
                      onChange={(evt) => handleChange(evt, i)}
                      inputProps={{ "aria-label": "controlled" }}
                      value={i === 0 ? "MOBILE_NUM" : "PHONE_NUM"}
                    />
                    <p className="mt-3">
                      {" "}
                      {i === 0 ? "Mobile Number" : "Phone Number"} :{val}
                    </p>

                    <br />
                  </div>
                </>
              );
            })}
          </div>
          {/* {(connected === true || connected === false) && (
            <button
              style={{
                borderRadius: "8px",
                backgroundColor: "#FF914D",
                color: "white",
              }}
              className="btn w-75 p-2 m-1  text-center"
              onClick={handleNext}
            >
              Next Voter
            </button>
          )} */}
        </DialogContent>
        <DialogActions>
          <button onClick={handleOpen} className="btn text-primary">
            Close
          </button>
          <Button className="text-danger" autoFocus onClick={handleNext}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
