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

export default function Primaryvotingscore({
  handleFilterData,
  campaignFilterData,
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [applied, setApplied] = React.useState(false);

  const [filtersData, setFiltersData] = React.useState();

  const [values, setValues] = React.useState({
    VP_PPP: { from: "", to: "" },
    VP_PRI: { from: "", to: "" },
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

    let res2 = await getDistricts({
      field: "VP_PRI",
      state: campaignFilterData?.state,
      // fieldTwoName: "STATE",
    });
    console.log(res2);
    if (res2.data.success === true) {
      filters = {
        ...filters,
        VP_PRI: res2.data.districts,
      };
    } else {
      toast.error("Error getting Voter Prefference Values", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    let res3 = await getDistricts({
      field: "VP_PPP",
      state: campaignFilterData?.state,
      // fieldTwoName: "STATE",
    });
    console.log(res3);
    if (res3.data.success === true) {
      filters = {
        ...filters,
        VP_PPP: res3.data.districts,
      };
    } else {
      toast.error("Error getting Voter Prefference Values", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    setFiltersData(filters);
  };
  const handleChangePPP = (evt) => {
    if (evt.target.name === "VP_PPPMIN") {
      setValues({
        ...values,
        VP_PPP: { ...values.VP_PPP, from: Number(evt.target.value) },
      });
    } else {
      setValues({
        ...values,
        VP_PPP: { ...values.VP_PPP, to: Number(evt.target.value) },
      });
    }
  };
  const handleChangePRI = (evt) => {
    if (evt.target.name === "VP_PRIMIN") {
      setValues({
        ...values,
        VP_PRI: { ...values.VP_PRI, from: Number(evt.target.value) },
      });
    } else {
      setValues({
        ...values,
        VP_PRI: { ...values.VP_PRI, to: Number(evt.target.value) },
      });
    }
  };

  const handleSubmit = () => {
    if (
      (values.VP_PPP.from === "" && values.VP_PPP.to !== "") ||
      (values.VP_PPP.from !== "" && values.VP_PPP.to === "")
    ) {
      toast.error("Please select all the field", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (
      (values.VP_PRI.from === "" && values.VP_PRI.to !== "") ||
      (values.VP_PRI.from !== "" && values.VP_PRI.to === "")
    ) {
      toast.error("Please select all the field", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (values.VP_PPP.from > values.VP_PPP.to) {
      toast.error("Score Min cannot be greater than Score Max", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (values.VP_PRI.from > values.VP_PRI.to) {
      toast.error("Score Min cannot be greater than Score Max", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (
      values.VP_PPP.from === "" &&
      values.VP_PPP.to === "" &&
      values.VP_PRI.from === "" &&
      values.VP_PRI.to === ""
    ) {
      handleFilterData({});
      setApplied(true);

      handleClose();
      return;
    }

    handleFilterData({
      ...(values.VP_PPP.from && values.VP_PPP.to && { VP_PPP: values.VP_PPP }),
      ...(values.VP_PRI.from && values.VP_PRI.to && { VP_PRI: values.VP_PRI }),
    });
    setApplied(true);

    handleClose();
  };

  const handleClearAll = () => {
    setValues({
      VP_PPP: { from: "", to: "" },
      VP_PRI: { from: "", to: "" },
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
        Primary voting score
      </button>
      <Dialog open={open} onClose={handleClose}>
        <div className="d-flex justify-content-between">
          {" "}
          <DialogTitle className="text-danger">
            Primary voting score Filter
          </DialogTitle>
          <button className="btn text-danger" onClick={handleClearAll}>
            Clear All <i class="fas fa-times"></i>
          </button>
        </div>
        <DialogContent>
          <DialogContentText>
            This is the Filter for filtering the Voters on the base of their
            Primary voting score
          </DialogContentText>
          <br />

          <p style={{ color: "#D12E2F" }}>Party Primary</p>

          {/* <FormControl fullWidth size="small">
            <div class="form-group">
              
              <TextField
                id="outlined-basic"
                label=" Min Score"
                variant="outlined"
                name="VP_PRIMIN"
                value={values.VP_PRI.from}
                onChange={handleChangePRI}
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
              name="VP_PRIMIN"
              value={values.VP_PRI.from}
              onChange={handleChangePRI}
              // disabled={campaignFilterData?.level !== "Federal - House" && true}
            >
              <MenuItem value="">Un Select</MenuItem>
              {filtersData?.VP_PRI?.map((val, i) => {
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
                name="VP_PRIMAX"
                value={values.VP_PRI.to}
                onChange={handleChangePRI}
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
              name="VP_PRIMAX"
              value={values.VP_PRI.to}
              onChange={handleChangePRI}
              // disabled={campaignFilterData?.level !== "Federal - House" && true}
            >
              <MenuItem value="">Un Select</MenuItem>
              {filtersData?.VP_PRI?.map((val, i) => {
                return <MenuItem value={val}>{val}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <br />
          <br />
          <p style={{ color: "#D12E2F" }}>Presidential Primary</p>

          {/* <FormControl fullWidth size="small">

            <div class="form-group">
             
              <TextField
                id="outlined-basic"
                label=" Min Score"
                variant="outlined"
                name="VP_PPPMIN"
                value={values.VP_PPP.from}
                onChange={handleChangePPP}
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
              name="VP_PPPMIN"
              value={values.VP_PPP.from}
              onChange={handleChangePPP}
              // disabled={campaignFilterData?.level !== "Federal - House" && true}
            >
              <MenuItem value="">Un Select</MenuItem>
              {filtersData?.VP_PPP?.map((val, i) => {
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
                name="VP_PPPMAX"
                value={values.VP_PPP.to}
                onChange={handleChangePPP}
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
              name="VP_PPPMAX"
              value={values.VP_PPP.to}
              onChange={handleChangePPP}
              // disabled={campaignFilterData?.level !== "Federal - House" && true}
            >
              <MenuItem value="">Un Select</MenuItem>
              {filtersData?.VP_PPP?.map((val, i) => {
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
