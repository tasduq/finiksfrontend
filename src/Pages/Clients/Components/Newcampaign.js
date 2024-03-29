import * as React from "react";
import { useState } from "react";
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
import validator from "validator";
import { register } from "../../../Connection/Auth";
import { getDistricts } from "../../../Connection/Clients";
import { ToastContainer, toast } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

export default function FormDialog({ foundStates, handleUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [districtsCount, setDistrictsCount] = React.useState([]);
  const [counties, setCounties] = React.useState([]);
  const [countiesCommission, setCountiesCommission] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [values, setValues] = useState({
    email: "",
    password: "",
    campaignName: "",
    startDate: "",
    endDate: "",
    election: "",
    state: "",
    district: [],
    level: "",
    role: "campaignManager",
    county: [],
    city: [],
    countyCommission: [],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetFields = () => {
    setValues({
      ...values,
      level: "",
      district: [],
      county: [],
      city: [],
      countyCommission: [],
    });
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setValues({
      ...values,
      [name]: value,
      level: "",
      district: [],
      county: [],
      city: [],
      countyCommission: [],
    });
  };

  const handleChangeLevel = async (evt) => {
    // setValues({
    //   ...values,
    //   level: evt.target.value,
    // });

    if (evt.target.value === "Federal - Senate") {
      setValues({
        ...values,
        district: [],
        county: [],
        city: [],
        level: evt.target.value,
        countyCommission: [],
      });
    }

    if (evt.target.value === "") {
      setValues({
        ...values,
        district: [],
        county: [],
        city: [],
        level: evt.target.value,
      });
    }

    if (evt.target.value === "Federal - House") {
      setValues({
        ...values,
        level: evt.target.value,
        district: [],
        county: [],
        city: [],
        countyCommission: [],
      });
      let res = await getDistricts({
        field: "CONG_DIST",
        state: values.state,
      });
      console.log(res);
      if (res.data.success === true) {
        setDistrictsCount(res.data.districts);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    if (evt.target.value === "State - Statewide") {
      setValues({
        ...values,
        district: [],
        level: evt.target.value,
        county: [],
        city: [],
        countyCommission: [],
      });
    }

    if (evt.target.value === "State - Senate") {
      setValues({
        ...values,
        level: evt.target.value,
        district: [],
        county: [],
        city: [],
        countyCommission: [],
      });
      let res = await getDistricts({
        field: "ST_UP_HOUS",
        state: values.state,
      });
      console.log(res);
      if (res.data.success === true) {
        setDistrictsCount(res.data.districts);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    if (evt.target.value === "State - House") {
      setValues({
        ...values,
        level: evt.target.value,
        district: [],
        county: [],
        city: [],
        countyCommission: [],
      });
      let res = await getDistricts({
        field: "ST_LO_HOUS",
        state: values.state,
      });
      console.log(res);
      if (res.data.success === true) {
        setDistrictsCount(res.data.districts);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    if (evt.target.value === "County - County Wide") {
      setValues({
        ...values,
        level: evt.target.value,
        district: [],
        county: [],
        city: [],
        countyCommission: [],
      });
      let res = await getDistricts({
        field: "AI_COUNTY_NAME",
        state: values.state,
      });
      console.log(res);
      if (res.data.success === true) {
        setCounties(res.data.districts);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    if (evt.target.value === "County - County Commision") {
      setValues({
        ...values,
        level: evt.target.value,
        district: [],
        county: [],
        city: [],
        countyCommission: [],
      });
      let res = await getDistricts({
        field: "AI_COUNTY_NAME",
        state: values.state,
      });
      console.log(res);
      if (res.data.success === true) {
        setCounties(res.data.districts);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    if (evt.target.value === "City - City Wide") {
      setValues({
        ...values,
        level: evt.target.value,
        district: [],
        county: [],
        city: [],
        countyCommission: [],
      });
      let res = await getDistricts({
        field: "MUNICIPALITY",
        state: values.state,
      });
      console.log(res);
      if (res.data.success === true) {
        setCity(res.data.districts);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const handleChangeDistrict = (event) => {
    console.log(event.target.value);
    const {
      target: { value },
    } = event;

    // if(values.district.indexOf(value) > -1){
    //   let yoo = values.district
    // }

    setValues(
      // On autofill we get a stringified value.
      {
        ...values,
        district: typeof value === "number" ? value.split(",") : value,
      }
    );
  };

  const handleChangeCounty = async (event) => {
    console.log(event, "i am target ====> county");
    const {
      target: { value },
    } = event;

    setValues(
      // On autofill we get a stringified value.
      {
        ...values,
        county: typeof value === "string" ? value.split(",") : value,
        countyCommission: value.length === 0 ? [] : values.countyCommission,
      }
    );
  };

  const handleCountyClose = async () => {
    let res = await getDistricts({
      field: "CNTY_COMM",
      state: values.county,
      fieldTwoName: "AI_COUNTY_NAME",
    });

    console.log(res);
    if (res.data.success === true) {
      setCountiesCommission(res.data.districts);
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleChangeCountyCommission = (event) => {
    console.log(event.target.value);
    const {
      target: { value },
    } = event;

    // if(values.district.indexOf(value) > -1){
    //   let yoo = values.district
    // }

    setValues(
      // On autofill we get a stringified value.
      {
        ...values,
        countyCommission: typeof value === "number" ? value.split(",") : value,
      }
    );
  };

  const handleChangeCity = (event) => {
    console.log(event.target.value);
    const {
      target: { value },
    } = event;

    // if(values.district.indexOf(value) > -1){
    //   let yoo = values.district
    // }

    setValues(
      // On autofill we get a stringified value.
      {
        ...values,
        city: typeof value === "string" ? value.split(",") : value,
      }
    );
  };

  const handleValidate = () => {
    let test = validator.isEmail(values.email);
    return test;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const testStatus = handleValidate(values.email);

    if (testStatus === false) {
      alert("Email is not valid");
      return;
    }
    console.log("I am called");

    let res = await register({
      ...values,
    });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleClose();
      handleUpdate();
      setValues({
        email: "",
        password: "",
        campaignName: "",
        startDate: "",
        endDate: "",
        election: "",
        state: "",
        district: [],
        level: "",
        role: "campaignManager",
        county: [],
        city: [],
        countyCommission: [],
      });
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      {console.log(values)}
      <button
        style={{
          backgroundColor: "#d12e2f",
          color: "#FFFFFF",
          width: "304px",
          heigth: "36px",
        }}
        className="btn mx-3"
        onClick={handleClickOpen}
      >
        Add New Campaign
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-danger">Create New Campaign</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This would be new Campaign or Client for the Software which can use
            this software
          </DialogContentText>
          <br />
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={values.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="campaignName"
              value={values.campaignName}
              onChange={handleChange}
            />
          </div>

          <br />
          <div className="d-flex">
            <div class="form-group ">
              <label for="exampleInputPassword1">Start</label>
              <input
                type="date"
                class="form-control"
                id="exampleInputPassword1"
                name="startDate"
                value={values.startDate}
                onChange={handleChange}
              />
            </div>
            <div class="form-group mx-3">
              <label for="exampleInputPassword1">End</label>
              <input
                type="date"
                class="form-control"
                id="exampleInputPassword1"
                name="endDate"
                value={values.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Election</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Election"
              value={values.election}
              onChange={handleChange}
              name="election"
            >
              <MenuItem value="Primary">Primary</MenuItem>
              <MenuItem value="General">General</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl
            fullWidth
            size="small"
            disabled={values.election.length > 0 ? false : true}
          >
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="State"
              value={values.state}
              onChange={handleChange}
              name="state"
              //   onChange={handleChange}
            >
              {/* <MenuItem value="Alabama">Alabama</MenuItem>
              <MenuItem value="Alaska">Alaska</MenuItem>
              <MenuItem value="Arizona">Arizona</MenuItem>
              <MenuItem value="Arkansas">Arkansas</MenuItem>
              <MenuItem value="California">California</MenuItem>
              <MenuItem value="Colorada">Colorada</MenuItem> */}
              {foundStates?.map((stateObj) => {
                return (
                  <MenuItem value={stateObj?.stateKey}>
                    {stateObj?.stateName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl
            fullWidth
            size="small"
            disabled={values.state.length > 0 ? false : true}
          >
            <InputLabel id="demo-simple-select-label">Level</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Level"
              //   onChange={handleChange}
              value={values.level}
              onChange={handleChangeLevel}
              name="level"
            >
              <MenuItem value="">Un Select</MenuItem>
              <MenuItem value="Federal - Senate">Federal - Senate</MenuItem>
              <MenuItem value="Federal - House">Federal - House</MenuItem>
              <MenuItem value="State - Statewide">State - Statewide</MenuItem>
              <MenuItem value="State - Senate">State - Senate</MenuItem>
              <MenuItem value="State - House">State - House</MenuItem>
              <MenuItem value="County - County Wide">
                County - County Wide
              </MenuItem>
              <MenuItem value="County - County Commision">
                County - County Commision
              </MenuItem>
              <MenuItem value="City - City Wide">City - City Wide</MenuItem>
            </Select>
          </FormControl>
          {(values.level === "County - County Wide" ||
            values.level === "County - County Commision") && (
            <>
              <br />
              <br />

              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">County</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  multiple
                  //   value={age}
                  label="County"
                  //   onChange={handleChange}
                  value={values.county}
                  onChange={handleChangeCounty}
                  name="County"
                  renderValue={(selected) => selected.join(", ")}
                  onClose={handleCountyClose}
                >
                  {counties.map((val) => {
                    return (
                      <MenuItem key={val} value={val}>
                        <Checkbox checked={values.county.indexOf(val) > -1} />
                        <ListItemText primary={val} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </>
          )}

          {(values.level === "County - County Wide" ||
            values.level === "County - County Commision") &&
            values.county?.length > 0 && (
              <>
                <br />
                <br />

                <FormControl
                  fullWidth
                  size="small"
                  // disabled={
                  //   values.level.length < 1 ||
                  //   values.level === "Federal - Senate" ||
                  //   values.level === "State - Statewide" ||
                  //   values.level === "County - County Wide" ||
                  //   values.level === "City - City Wide" < 0
                  //     ? true
                  //     : false
                  // }
                >
                  <InputLabel id="demo-simple-select-label">
                    County Commission
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    multiple
                    //   value={age}
                    label="County Commission"
                    //   onChange={handleChange}
                    value={values.countyCommission}
                    onChange={handleChangeCountyCommission}
                    name="County"
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {countiesCommission.map((val) => {
                      return (
                        <MenuItem key={val} value={val}>
                          <Checkbox
                            checked={values.countyCommission.indexOf(val) > -1}
                          />
                          <ListItemText primary={val} />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </>
            )}

          {values.level === "City - City Wide" && (
            <>
              <br />
              <br />

              <FormControl
                fullWidth
                size="small"
                // disabled={
                //   values.level.length < 1 ||
                //   values.level === "Federal - Senate" ||
                //   values.level === "State - Statewide" ||
                //   values.level === "County - County Wide" ||
                //   values.level === "City - City Wide" < 0
                //     ? true
                //     : false
                // }
              >
                <InputLabel id="demo-simple-select-label">
                  Municipality
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  multiple
                  //   value={age}
                  label="Municipality"
                  //   onChange={handleChange}
                  value={values.city}
                  onChange={handleChangeCity}
                  name="County"
                  renderValue={(selected) => selected.join(", ")}
                >
                  {city.map((val) => {
                    return (
                      <MenuItem key={val} value={val}>
                        <Checkbox checked={values.city.indexOf(val) > -1} />
                        <ListItemText primary={val} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </>
          )}

          <br />
          <br />
          <FormControl
            fullWidth
            size="small"
            disabled={
              values.level.length < 1 ||
              values.level === "Federal - Senate" ||
              values.level === "State - Statewide" ||
              values.level === "County - County Wide" ||
              values.level === "County - County Commision" ||
              values.level === "City - City Wide"
                ? true
                : false
            }
          >
            <InputLabel id="demo-simple-select-label">District</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              multiple
              //   value={age}
              label="District"
              //   onChange={handleChange}
              value={values.district}
              onChange={handleChangeDistrict}
              name="district"
              renderValue={(selected) => selected.join(", ")}
            >
              {districtsCount.map((val) => {
                return (
                  <MenuItem key={val} value={val}>
                    <Checkbox checked={values.district.indexOf(val) > -1} />
                    <ListItemText primary={val} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button className="text-danger" onClick={handleSubmit}>
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
