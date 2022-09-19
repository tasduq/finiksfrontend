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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { ToastContainer, toast } from "react-toastify";

export default function Partyaffiliation({ handleFilterData }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [values, setValues] = React.useState({
    PARTY_CODE: "",
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
    if (values.PARTY_CODE === "") {
      toast.error("Please select all the field", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    handleFilterData(values);
    handleClose();
  };

  let languages = [
    "A- American Independent",
    "B- Constitution Party",
    "C- Consumer",
    "D- Democrat",
    "E- Inferred Democrat",
    "F- Reform",
    "G- Green",
    "H- Liberal",
    "I- Independent",
    "J- UMOJA",
    "K- Independent NM Party",
    "L- Libertarian",
    "N- None/Non-Partisan/No-Party/No-Preference/Undeclared/Declined-to-State/Undecided/Unaffiliated",
    "O- Other",
    "P- Peace & Freedom",
    "R- Republican",
    "S- Inferred Republican",
    "T- Right to Life",
    "U- Unknown",
    "V- Conservative",
    "W- Natural Law",
    "Z- Independence",
  ];

  let result = languages.reduce(
    (a, v) => ({ ...a, [v.split("-")[0]]: v.split(" ")[1] }),
    {}
  );
  console.log(result);

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
        <i class="fas fa-angle-down text-danger mx-2"></i> Party Affiliation
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-danger">
          Party Affiliation Filter
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is the Filter for filtering the Voters on the base of their
            Party Affiliation
          </DialogContentText>
          <br />

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Parties</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              // name="radio-buttons-group"
              name="PARTY_CODE"
              value={values.PARTY_CODE}
              onChange={handleChange}
            >
              {Object.entries(result).map(([key, value]) => {
                return (
                  <FormControlLabel
                    value={key}
                    control={<Radio />}
                    label={value}
                  />
                );
              })}
            </RadioGroup>
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
