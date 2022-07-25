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

export default function Legislativedistrict({
  handleFilterData,
  data,
  campaignFilterData,
}) {
  // console.log(data, "i am data");
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [filtersData, setFiltersData] = React.useState();
  const [applied, setApplied] = React.useState(false);

  const [values, setValues] = React.useState({
    CONG_DIST: { from: "", to: "" },
    ST_UP_HOUS: { from: "", to: "" },
    ST_LO_HOUS: { from: "", to: "" },
  });
  let mapper = new Array(100).fill("");

  const handleClickOpen = () => {
    setOpen(true);
    handleGetFiltersData();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeDist = (evt) => {
    console.log(evt.target.value);
    if (evt.target.name === "CONG_DISTFROM") {
      setValues({
        ...values,
        CONG_DIST: { ...values.CONG_DIST, from: evt.target.value },
      });
    } else {
      setValues({
        ...values,
        CONG_DIST: { ...values.CONG_DIST, to: evt.target.value },
      });
    }
  };

  const handleChangeSTUP = (evt) => {
    console.log(evt.target.value);
    if (evt.target.name === "ST_UP_HOUSFROM") {
      setValues({
        ...values,
        ST_UP_HOUS: { ...values.ST_UP_HOUS, from: evt.target.value },
      });
    } else {
      setValues({
        ...values,
        ST_UP_HOUS: { ...values.ST_UP_HOUS, to: evt.target.value },
      });
    }
  };

  const handleChangeSTLO = (evt) => {
    console.log(evt.target.value);
    if (evt.target.name === "ST_LO_HOUSFROM") {
      setValues({
        ...values,
        ST_LO_HOUS: { ...values.ST_LO_HOUS, from: evt.target.value },
      });
    } else {
      setValues({
        ...values,
        ST_LO_HOUS: { ...values.ST_LO_HOUS, to: evt.target.value },
      });
    }
  };

  const handleSubmit = () => {
    if (
      values.CONG_DIST.from.length > 0 ||
      (values.CONG_DIST.to > 0 &&
        (values.CONG_DIST.from.length === 0 ||
          values.CONG_DIST.to.length === 0))
    ) {
      toast.error("Please select both From and to range for Congressional", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (
      values.ST_UP_HOUS.from.length > 0 ||
      (values.ST_UP_HOUS.to > 0 &&
        (values.ST_UP_HOUS.from.length === 0 ||
          values.ST_UP_HOUS.to.length === 0))
    ) {
      toast.error("Please select both From and to range for State Senate", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (
      values.ST_LO_HOUS.from.length > 0 ||
      (values.ST_LO_HOUS.to > 0 &&
        (values.ST_LO_HOUS.from.length === 0 ||
          values.ST_LO_HOUS.to.length === 0))
    ) {
      toast.error("Please select both From and to range for State House", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (values.CONG_DIST.from > values.CONG_DIST.to) {
      toast.error(
        "Congresstional District From cannot be  greater than Congresstional District To",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      return;
    }
    if (values.ST_UP_HOUS.from > values.ST_UP_HOUS.to) {
      toast.error("State Senate From cannot be  greater than State Senate To", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (values.ST_LO_HOUS.from > values.ST_LO_HOUS.to) {
      toast.error("State House From cannot be  greater than State House To", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    handleFilterData({
      ...(values.CONG_DIST.from &&
        values.CONG_DIST.to && { CONG_DIST: values.CONG_DIST }),
      ...(values.ST_LO_HOUS.from &&
        values.ST_LO_HOUS.to && { ST_LO_HOUS: values.ST_LO_HOUS }),
      ...(values.ST_UP_HOUS.from &&
        values.ST_UP_HOUS.to && { ST_UP_HOUS: values.ST_UP_HOUS }),
    });
    setApplied(true);

    handleClose();
  };

  const handleGetFiltersData = async () => {
    let filters = {};
    console.log("useeffect is running", campaignFilterData);
    if (campaignFilterData?.level === "Federal - House") {
      let res = await getDistricts({
        field: "CONG_DIST",
        state: campaignFilterData?.state,
        // fieldTwoName: "STATE",
      });
      console.log(res);
      if (res.data.success === true) {
        // setFiltersData({ ...filters, CONG_DIST: res.data.districts });
        filters = {
          ...filters,
          CONG_DIST: res.data.districts,
        };
      } else {
        toast.error("Error getting Congressional District Values", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    if (campaignFilterData?.level === "State - Senate") {
      console.log("useeffect is running");
      let res2 = await getDistricts({
        field: "ST_UP_HOUS",
        state: campaignFilterData?.state,
        // fieldTwoName: "STATE",
      });
      console.log(res2);
      if (res2.data.success === true) {
        filters = {
          ...filters,
          ST_UP_HOUS: res2.data.districts,
        };
      } else {
        toast.error("Error getting Voter Prefference Values", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    if (campaignFilterData?.level === "State - House") {
      console.log("useeffect is running");
      let res3 = await getDistricts({
        field: "ST_UP_HOUS",
        state: campaignFilterData?.state,
        // fieldTwoName: "STATE",
      });
      console.log(res3);
      if (res3.data.success === true) {
        filters = {
          ...filters,
          ST_LO_HOUS: res3.data.districts,
        };
      } else {
        toast.error("Error getting Voter Prefference Values", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    setFiltersData(filters);
  };

  const handleClearAll = () => {
    setValues({
      CONG_DIST: { from: "", to: "" },
      ST_UP_HOUS: { from: "", to: "" },
      ST_LO_HOUS: { from: "", to: "" },
    });
    handleFilterData({});
    handleClose();
    setApplied(false);
  };

  return (
    <div>
      {console.log(filtersData)}
      <button className="btn mx-1" onClick={handleClickOpen}>
        {applied === true && <i class="fas fa-check text-success mx-2"></i>}{" "}
        {applied === false && (
          <i class="fas fa-angle-down text-danger mx-2"></i>
        )}{" "}
        Legislative District
      </button>
      <Dialog open={open} onClose={handleClose}>
        <div className="d-flex justify-content-between">
          {" "}
          <DialogTitle className="text-danger">
            Legislative District Filter
          </DialogTitle>
          <button className="btn text-danger" onClick={handleClearAll}>
            Clear All <i class="fas fa-times"></i>
          </button>
        </div>
        <DialogContent>
          <DialogContentText>
            This is the Filter for filtering the Voters on the base of their
            Legislative District
          </DialogContentText>
          <br />

          <br />

          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Congressional From
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Congressional"
              name="CONG_DISTFROM"
              value={values.CONG_DIST.from}
              onChange={handleChangeDist}
              disabled={campaignFilterData?.level !== "Federal - House" && true}
            >
              <MenuItem value="">Un Select</MenuItem>
              {filtersData?.CONG_DIST?.map((val, i) => {
                return <MenuItem value={val}>{val}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <br />

          <br />

          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Congressional To
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Congressional"
              name="CONG_DISTTO"
              value={values.CONG_DIST.to}
              onChange={handleChangeDist}
              disabled={campaignFilterData?.level !== "Federal - House" && true}
            >
              <MenuItem value="">Un Select</MenuItem>
              {filtersData?.CONG_DIST?.map((val, i) => {
                return <MenuItem value={val}>{val}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              State Senate From
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="State Senate"
              name="ST_UP_HOUSFROM"
              value={values.ST_UP_HOUS.from}
              onChange={handleChangeSTUP}
              disabled={campaignFilterData?.level !== "State - Senate" && true}
            >
              <MenuItem value="">Un Select</MenuItem>
              {filtersData?.ST_UP_HOUS?.map((val, i) => {
                return <MenuItem value={val}>{val}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              State Senate To
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="State Senate"
              name="ST_UP_HOUSTO"
              value={values.ST_UP_HOUS.to}
              onChange={handleChangeSTUP}
              disabled={campaignFilterData?.level !== "State - Senate" && true}
            >
              <MenuItem value="">Un Select</MenuItem>
              {filtersData?.ST_UP_HOUS?.map((val, i) => {
                return <MenuItem value={val}>{val}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              State House From
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="State House"
              name="ST_LO_HOUSFROM"
              value={values.ST_LO_HOUS.from}
              onChange={handleChangeSTLO}
              disabled={campaignFilterData?.level !== "State - House" && true}
            >
              <MenuItem value="">Un Select</MenuItem>
              {filtersData?.ST_LO_HOUS?.map((val, i) => {
                return <MenuItem value={val}>{val}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              State House To
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="State House"
              name="ST_LO_HOUSTO"
              value={values.ST_LO_HOUS.to}
              onChange={handleChangeSTLO}
              disabled={campaignFilterData?.level !== "State - House" && true}
            >
              <MenuItem value="">Un Select</MenuItem>
              {filtersData?.ST_LO_HOUS?.map((val, i) => {
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
