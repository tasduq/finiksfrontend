import * as React from "react";
import { useState, useEffect } from "react";
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
import { editClient } from "../../../Connection/Clients";
import { ToastContainer, toast } from "react-toastify";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { getDistricts } from "../../../Connection/Clients";

export default function FormDialog({ data, handleUpdate }) {
  console.log(data);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [districtsCount, setDistrictsCount] = React.useState([]);
  const [counties, setCounties] = React.useState([]);
  const [countiesCommission, setCountiesCommission] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [values, setValues] = useState({
    email: data.email,
    campaignName: data.campaignName,
    startDate: data.startDate,
    endDate: data.endDate,
    election: data.election,
    state: data.state,
    district: data.district,
    level: data.level,
    id: data._id,
    active: data.active,
    city: data.city,
    county: data.county,
    countyCommission: data.countyCommission,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    console.log(name, value);
    setValues({
      ...values,
      [name]: value,
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
        county: typeof value === "string" ? value.split(",") : value,
        countyCommission: value.length === 0 ? [] : values.countyCommission,
      }
    );

    // if (value?.length === 0) {
    //   setValues(
    //     // On autofill we get a stringified value.
    //     {
    //       ...values,
    //       countyCommission: [],
    //     }
    //   );
    // }

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

  const handleActive = (evt) => {
    if (evt.target.value === "true") {
      setValues({ ...values, active: true });
    } else {
      setValues({ ...values, active: false });
    }
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

    let res = await editClient({
      ...values,
    });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleClose();
      handleUpdate();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    setValues({
      email: data.email,
      campaignName: data.campaignName,
      startDate: data.startDate,
      endDate: data.endDate,
      election: data.election,
      state: data.state,
      district: data.district,
      level: data.level,
      id: data._id,
      active: data.active,
      city: data.city,
      county: data.county,
      countyCommission: data.countyCommission,
    });
  }, [data]);

  return (
    <div>
      {console.log(values)}

      <button
        style={{
          color: "white",
          backgroundColor: "#d12e2f",
          width: "88px",
          height: "36px",
        }}
        className="btn"
        onClick={handleClickOpen}
      >
        Edit
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-danger">Edit Campaign</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can update the Campaign Details of your client
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
              <MenuItem value="FL">Florida</MenuItem>
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
                >
                  {counties.map((val) => {
                    return (
                      <MenuItem key={val} value={val}>
                        <Checkbox checked={values.county?.indexOf(val) > -1} />
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
                            checked={values.countyCommission?.indexOf(val) > -1}
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
                        <Checkbox checked={values?.city?.indexOf(val) > -1} />
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
          <br />
          <br />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Choose Active Status
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={true}
              value={values.active}
              name="active"
              onChange={handleActive}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button className="text-danger" onClick={handleSubmit}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
