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
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

export default function Individualvoterinfo({ handleFilterData }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [applied, setApplied] = React.useState(false);

  const [values, setValues] = React.useState({
    MRTLSTATUS: [],
    OCCUPATION: [],
    PRESENCHLD: "",
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

  const handleSubmit = () => {
    // if (
    //   values.MRTLSTATUS.length <= 0 &&
    //   values.OCCUPATION <=0 &&
    //   values.PRESENCHLD === ""
    // ) {
    //   handleFilterData({});
    //   return;
    // }

    handleFilterData({
      ...(values.MRTLSTATUS.length > 0 && { MRTLSTATUS: values.MRTLSTATUS }),
      ...(values.OCCUPATION.length > 0 && { OCCUPATION: values.OCCUPATION }),
      ...(values.PRESENCHLD.length > 0 && { PRESENCHLD: values.PRESENCHLD }),
    });
    setApplied(true);

    handleClose();
  };
  const handleClear = (field) => {
    setValues({
      ...values,
      [field]: [],
    });
  };

  let languages = [
    "A = Professional / Technical",
    "B = Administration / Managerial",
    "C = Sales / Service",
    "D = Clerical / White Collar",
    "E = Craftsman / Blue Collar",
    "F = Student",
    "G = Homemaker",
    "H = Retired",
    "J = Military",
    "K = Religious",
    "L = Self Employed",
    "M = Self Employed - Professional / Technical",
    "N = Self Employed - Administration / Managerial",
    "O = Self Employed - Sales / Service",
    "P = Self Employed - Clerical / White Collar",
    "Q = Self Employed - Craftsman / Blue Collar",
    "R = Self Employed - Student",
    "S = Self Employed - Homemaker",
    "T = Self Employed - Retired",
    "U = Self Employed - Other",
    "V = Educator",
    "W = Financial Professional",
    "X = Legal Professional",
    "Y = Medical Professional",
    "Z = Other",
  ];

  let result = languages.reduce(
    (a, v) => ({ ...a, [v.split(" ")[0]]: v.split("=")[1] }),
    {}
  );
  console.log(result);

  const handleClearAll = () => {
    setValues({
      MRTLSTATUS: [],
      OCCUPATION: [],
      PRESENCHLD: "",
    });
    handleFilterData({});
    handleClose();
    setApplied(false);
  };

  return (
    <div>
      <button className="btn mx-1" onClick={handleClickOpen}>
        {applied === true && <i class="fas fa-check text-success mx-2"></i>}{" "}
        {applied === false && (
          <i class="fas fa-angle-down text-danger mx-2"></i>
        )}{" "}
        Individual Voter Info
      </button>
      <Dialog open={open} onClose={handleClose}>
        <div className="d-flex justify-content-between">
          {" "}
          <DialogTitle className="text-danger">
            Individual Voter Info Filter
          </DialogTitle>
          <button className="btn text-danger" onClick={handleClearAll}>
            Clear All <i class="fas fa-times"></i>
          </button>
        </div>
        <DialogContent>
          <DialogContentText>
            This is the Filter for filtering the Voters on the base of their
            Individual Voter Info
          </DialogContentText>
          <br />

          <br />

          {/* <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Marital Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Election"
              name="MRTLSTATUS"
              value={values.MRTLSTATUS}
              onChange={handleChange}
            >
              <MenuItem value="M">Married</MenuItem>
              <MenuItem value="S">Single</MenuItem>
              <MenuItem value="A">Inferred Married</MenuItem>
              <MenuItem value="B">Inferred Single</MenuItem>
            </Select>
          </FormControl> */}
          <div className="text-right">
            {" "}
            <button
              onClick={() => handleClear("MRTLSTATUS")}
              className="btn btn-sm text-danger"
            >
              Clear All <i class="fas fa-times"></i>
            </button>
          </div>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              {" "}
              Marital Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              multiple
              //   value={age}
              label=" Marital Status"
              //   onChange={handleChange}
              value={values.MRTLSTATUS}
              onChange={handleChange}
              name="MRTLSTATUS"
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="M">
                <Checkbox checked={values?.MRTLSTATUS.indexOf("M") > -1} />{" "}
                <ListItemText primary={`Married , (M)`} />
              </MenuItem>
              <MenuItem value="S">
                <Checkbox checked={values.MRTLSTATUS.indexOf("S") > -1} />{" "}
                <ListItemText primary={"Single , (S)"} />
              </MenuItem>
              <MenuItem value="A">
                <Checkbox checked={values.MRTLSTATUS.indexOf("A") > -1} />{" "}
                <ListItemText primary={"Inferred Married , (A)"} />
              </MenuItem>
              <MenuItem value="B">
                <Checkbox checked={values.MRTLSTATUS.indexOf("B") > -1} />{" "}
                <ListItemText primary={"Inferred Single , (B)"} />
              </MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          {/* <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Occupation Details
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Election"
              name="OCCUPATION"
              value={values.OCCUPATION}
              onChange={handleChange}
            >
              {Object.entries(result).map(([key, value]) => {
                return <MenuItem value={key}>{value}</MenuItem>;
              })}
            </Select>
          </FormControl> */}
          <div className="text-right">
            {" "}
            <button
              onClick={() => handleClear("OCCUPATION")}
              className="btn btn-sm text-danger"
            >
              Clear All <i class="fas fa-times"></i>
            </button>
          </div>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Occupation Details
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              multiple
              label="Occupation Details"
              name="OCCUPATION"
              value={values.OCCUPATION}
              onChange={handleChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {Object.entries(result).map(([key, value]) => {
                return (
                  <MenuItem value={key}>
                    <Checkbox checked={values.OCCUPATION.indexOf(key) > -1} />{" "}
                    <ListItemText primary={`${value} , (${key})`} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Children in Household
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Election"
              name="PRESENCHLD"
              value={values.PRESENCHLD}
              onChange={handleChange}
            >
              <MenuItem value="">Un Select</MenuItem>
              <MenuItem value="Y">Yes</MenuItem>
              <MenuItem value="0">No</MenuItem>
            </Select>
          </FormControl>
          <br />
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
