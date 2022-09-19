import * as React from "react";
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
import { ToastContainer, toast } from "react-toastify";

export default function Registrationdate({ handleFilterData }) {
  const [open, setOpen] = React.useState(false);
  // const [date, setDate] = React.useState(null);
  const [applied, setApplied] = React.useState(false);

  const [values, setValues] = React.useState({
    REGIS_DATE: { from: "", to: "" },
  });
  const [date, setDate] = React.useState({
    from: "",
    to: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (evt) => {
    console.log(
      evt.target.value.split("-")[0],
      evt.target.value.split("-")[1],
      evt.target.value.split("-")[2]
    );

    if (evt.target.name === "REGIS_DATEMIN") {
      setDate({
        ...date,
        from: evt.target.value,
      });
      setValues({
        ...values,
        REGIS_DATE: {
          ...values.REGIS_DATE,
          from: Number(
            `${evt.target.value.split("-")[0]}${
              evt.target.value.split("-")[1]
            }${evt.target.value.split("-")[2]}`
          ),
        },
      });
    } else {
      setDate({
        ...date,
        to: evt.target.value,
      });
      setValues({
        ...values,
        REGIS_DATE: {
          ...values.REGIS_DATE,
          to: Number(
            `${evt.target.value.split("-")[0]}${
              evt.target.value.split("-")[1]
            }${evt.target.value.split("-")[2]}`
          ),
        },
      });
    }
  };

  const handleSubmit = () => {
    if (
      (values.REGIS_DATE.from !== "" && values.REGIS_DATE.to === "") ||
      (values.REGIS_DATE.from === "" && values.REGIS_DATE.to !== "")
    ) {
      toast.error("Please select all the field", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (values.REGIS_DATE.from > values.REGIS_DATE.to) {
      toast.error("Date Min cannot be equal or greater than Date Max", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    handleFilterData({
      ...(values.REGIS_DATE.from !== "" &&
        values.REGIS_DATE.to !== "" && { REGIS_DATE: values.REGIS_DATE }),
    });
    setApplied(true);

    handleClose();
  };

  const handleClear = (field) => {
    setValues({
      ...values,
      REGIS_DATE: { from: "", to: "" },
    });
    setDate({
      from: "",
      to: "",
    });
    handleFilterData({});
    handleClose();
    setApplied(false);
  };

  // const handleClearAll = () => {
  //   setValues({
  //     REGIS_DATE: { from: "", to: "" },
  //   });
  //   setDate({
  //     from: "",
  //     to: "",
  //   });
  //   handleFilterData({});
  //   handleClose();
  //   setApplied(false);
  // };

  return (
    <div>
      {console.log(values)}
      <button
        // style={{
        //   backgroundColor: "#d12e2f",
        //   color: "#FFFFFF",
        //   //   width: "304px",
        //   //   heigth: "36px",
        // }}
        className="btn mx-1"
        onClick={handleClickOpen}
      >
        {applied === true && <i class="fas fa-check text-success mx-2"></i>}{" "}
        {applied === false && (
          <i class="fas fa-angle-down text-danger mx-2"></i>
        )}{" "}
        Registration Date
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-danger">
          Registration Date Filter
        </DialogTitle>
        {/* <div className="d-flex justify-content-between">
          {" "}
          
          <button className="btn text-danger" onClick={handleClearAll}>
            Clear All <i class="fas fa-times"></i>
          </button>
        </div> */}
        <DialogContent>
          <DialogContentText>
            This is the Filter for filtering the Voters on the base of their
            Registration Date
          </DialogContentText>
          <br />
          <div className="text-right">
            {" "}
            <button
              onClick={() => handleClear("RELIGION")}
              className="btn btn-sm text-danger"
            >
              Clear All <i class="fas fa-times"></i>
            </button>
          </div>
          <InputLabel id="demo-simple-select-label">
            Minimum Registration Date
          </InputLabel>
          <FormControl fullWidth size="small">
            <div class="form-group">
              <input
                type="date"
                className="form-control shadow-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="REGIS_DATEMIN"
                value={date.from}
                onChange={handleChange}
              />
            </div>
          </FormControl>
          <br />
          <InputLabel id="demo-simple-select-label">
            Maximum Registration Date
          </InputLabel>
          <FormControl fullWidth size="small">
            <div class="form-group">
              <input
                type="date"
                className="form-control shadow-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="REGIS_DATEMAX"
                value={date.to}
                onChange={handleChange}
              />
            </div>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button className="text-danger" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
