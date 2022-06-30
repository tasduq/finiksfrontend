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

export default function Individualvoterinfo({ handleFilterData }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [values, setValues] = React.useState({
    MRTLSTATUS: "",
    OCCUPATION: "",
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
    if (
      values.MRTLSTATUS === "" ||
      values.OCCUPATION === "" ||
      values.PRESENCHLD === ""
    ) {
      toast.error("Please select all the field", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    handleFilterData(values);
    handleClose();
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

  return (
    <div>
      <button className="btn mx-1" onClick={handleClickOpen}>
        <i class="fas fa-angle-down text-danger mx-2"></i> Individual Voter Info
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-danger">
          Individual Voter Info Filter
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is the Filter for filtering the Voters on the base of their
            Individual Voter Info
          </DialogContentText>
          <br />

          <br />

          <FormControl fullWidth size="small">
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
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
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
