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
import { getDistricts } from "../../../../Connection/Clients";

export default function Generalvotingscore({
  handleFilterData,
  campaignFilterData,
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [filtersData, setFiltersData] = React.useState();
  const [applied, setApplied] = React.useState(false);
  const [values, setValues] = React.useState({
    VP_GEN: { from: "", to: "" },
  });

  const handleClickOpen = () => {
    setOpen(true);
    handleGetFiltersData();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGetFiltersData = async () => {
    let filters = {};

    let res3 = await getDistricts({
      field: "VP_GEN",
      state: campaignFilterData?.state,
      // fieldTwoName: "STATE",
    });
    console.log(res3);
    if (res3.data.success === true) {
      filters = {
        ...filters,
        VP_GEN: res3.data.districts,
      };
    } else {
      toast.error("Error getting Voter Prefference Values", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    setFiltersData(filters);
  };

  const handleChange = (evt) => {
    if (evt.target.name === "VP_GENMIN") {
      setValues({
        ...values,
        VP_GEN: { ...values.VP_GEN, from: Number(evt.target.value) },
      });
    } else {
      setValues({
        ...values,
        VP_GEN: { ...values.VP_GEN, to: Number(evt.target.value) },
      });
    }
  };

  const handleSubmit = () => {
    if (values.VP_GEN.from === "" || values.VP_GEN.to === "") {
      toast.error("Please select all the field", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (values.VP_GEN.from > values.VP_GEN.to) {
      toast.error("Score Min cannot be greater than Score Max", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (values.VP_GEN.from === "" && values.VP_GEN.to === "") {
      handleFilterData({});
      setApplied(true);

      handleClose();
      return;
    }

    handleFilterData(values);
    setApplied(true);

    handleClose();
  };

  const handleClearAll = () => {
    setValues({
      VP_GEN: { from: "", to: "" },
    });
    handleFilterData({});
    handleClose();
    setApplied(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
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
        General voting score
      </button>
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle className="text-danger">
          General voting score Filter
        </DialogTitle> */}
        <div className="d-flex justify-content-between">
          {" "}
          <DialogTitle className="text-danger">
            General voting score Filter
          </DialogTitle>
          <button className="btn text-danger" onClick={handleClearAll}>
            Clear All <i class="fas fa-times"></i>
          </button>
        </div>
        <DialogContent>
          <DialogContentText>
            This is the Filter for filtering the Voters on the base of their
            General voting score
          </DialogContentText>
          <br />

          {/* <FormControl fullWidth size="small">
            <div class="form-group">
           
              <TextField
                id="outlined-basic"
                label=" Min Score"
                variant="outlined"
                name="VP_GENMIN"
                value={values.VP_GEN.from}
                onChange={handleChange}
                size="small"
                type="number"
              />
            </div>
          </FormControl> */}
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Min Score</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Min Score"
              name="VP_GENMIN"
              value={values.VP_GEN.from}
              onChange={handleChange}
              // disabled={campaignFilterData?.level !== "Federal - House" && true}
            >
              <MenuItem value="">Un Select</MenuItem>
              {filtersData?.VP_GEN?.map((val, i) => {
                return <MenuItem value={val}>{val}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <br />
          <br />
          {/* <FormControl fullWidth size="small">

            <div class="form-group">
           
              <TextField
                id="outlined-basic"
                label=" Max Score"
                variant="outlined"
                name="VP_GENMAX"
                value={values.VP_GEN.to}
                onChange={handleChange}
                size="small"
                type="number"
              />
            </div>
          </FormControl> */}
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Max Score</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Max Score"
              name="VP_GENMAX"
              value={values.VP_GEN.to}
              onChange={handleChange}
              // disabled={campaignFilterData?.level !== "Federal - House" && true}
            >
              <MenuItem value="">Un Select</MenuItem>
              {filtersData?.VP_GEN?.map((val, i) => {
                return <MenuItem value={val}>{val}</MenuItem>;
              })}
            </Select>
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
