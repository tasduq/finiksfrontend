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

export default function Race({ handleFilterData }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [values, setValues] = React.useState({
    ETHNIC_INFER: "",
    ETHNICCODE: "",
    RELIGION: "",
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
      values.ETHNIC_INFER === "" ||
      values.ETHNICCODE === "" ||
      values.RELIGION === ""
    ) {
      toast.error("Please select all the field", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    handleFilterData(values);
    handleClose();
  };

  let ethnicOrigin = [
    "00 Unknown",
    "C1 Afghani",
    "C2 Bengladesh",
    "C3 Indian",
    "C4 Pakistani",
    "C5 Sri Lankan",
    "C6 Nepal",
    "C7 Telugan",
    "D0 Algerian",
    "D1 Arab",
    "D2 Bahrain",
    "D3 Egyptian",
    "D4 Greek",
    "D5 Iraqi",
    "D6 Kurdish",
    "D7 Jewish",
    "D8 Kuwaiti",
    "D9 Libyan",
    "DE Macedonian",
    "DF Moroccan",
    "DG Qatar",
    "DH Persian",
    "DJ Saudi",
    "DK Syrian",
    "DL Tunisian",
    "DM Turkish",
    "DN Yemeni",
    "DS Maltese",
    "HA Argentina",
    "HB Bolivia",
    "HC Cuba",
    "HD Dominican Republic",
    "HE El Salvador",
    "HG Guatemala",
    "HH Honduras",
    "HJ Colombia",
    "HK Panama",
    "HL Ecuador",
    "HM Mexico",
    "HN Nicaragua",
    "HP Puerto Rico",
    "HQ Chile",
    "HR Costa Rica",
    "HS Spain",
    "HU Uruguay",
    "HV Venezuela",
    "HX Peru",
    "HY Paraguay",
    "HZ Brazil",
    "KS Native American",
    "M0 African American 1",
    "M1 Angolan",
    "M2 Ashanti",
    "M3 Basotho",
    "M4 Benin",
    "M5 Bhutanese",
    "M6 Burkina Faso",
    "M7 Burundi",
    "M8 Cameroon",
    "M9 Cent Afric Rep",
    "MA Chad",
    "MB Comoros",
    "MC Congo",
    "MD Equat Guinea",
    "ME Ethiopian",
    "MF Gabon",
    "MG Gambia",
    "MH Ghana",
    "MJ Guinea-Bissea",
    "MK Guyana",
    "ML Ivory Coast",
    "MM Kenya",
    "MN Lesotho",
    "MO Liberian",
    "MP Madagascar",
    "MQ Malawi",
    "MR Mali",
    "MS Namibian",
    "MT Nigerian",
    "MU Mozambique",
    "MV Papua New Guinea",
    "MW Ruandan",
    "MX Senegalese",
    "MY Siere Leone",
    "MZ Somalia",
    "N1 Danish",
    "N2 Dutch",
    "N3 Finnish",
    "N4 Icelandic",
    "N5 Norwegian",
    "N6 Scotch",
    "N7 Swedish",
    "N8 Welsh",
    "R1 Aleut",
    "R2 Myanmar",
    "R3 Chinese",
    "R4 Fiji",
    "R5 Hawaiian",
    "R6 Indonesian",
    "R7 Japanese",
    "R8 Khmer",
    "R9 Korean",
    "RA Laotian",
    "RB Malay",
    "RC Mongolian",
    "RD Other Asian",
    "RE Filipino",
    "RF Thai",
    "RG Tibetan",
    "RH Vietnamese",
    "RJ Maldivian",
    "RK Nauruan",
    "RM New Zealand",
    "RP Australian",
    "RQ Vanuatuan",
    "RS Pili",
    "T1 Belgian",
    "T2 Basque",
    "T3 English",
    "T4 French",
    "T5 German",
    "T6 Irish",
    "T7 Italian",
    "T8 Portuguese",
    "T9 Hispanic",
    "TE Liechtenstein",
    "TF Luxembourgian",
    "TH Swiss",
    "TJ Manx",
    "U0 Albanian",
    "U1 Armenian",
    "U2 Austrian",
    "U3 Azerb",
    "U4 Bosnian",
    "U5 Bulgarian",
    "U6 Byelorussian",
    "U7 Chechnian",
    "U8 Croatian",
    "U9 Czech",
    "UA Estonian",
    "UB Georgian",
    "UC Hungarian",
    "UD Kazakh",
    "UE Kirghiz",
    "UF Kyrgyzstani",
    "UG Latvian",
    "UH Lithuanian",
    "UI Moldavian",
    "UJ Polish",
    "UK Romanian",
    "UL Russian",
    "UM Serbian",
    "UN Slovakian",
    "UP Slovenian",
    "UQ Tajikistan",
    "UR Tajik",
    "UT Turkmenistan",
    "UV Ukrainian",
    "UW Uzbekistani",
    "W0 South African",
    "W1 Surinam",
    "W2 Sudanese",
    "W3 Swaziland",
    "W4 Tanzanian",
    "W5 Togo",
    "W6 Tonga",
    "W7 Ugandan",
    "W8 Xhosa",
    "W9 Zaire",
    "WA Zambian",
    "WB Zimbabwe",
    "WC Zulu",
    "WE Djibouti",
    "WF Guinean",
    "WG Mauritania",
    "WH Niger",
    "WJ Seychelles",
    "WK Western Samoa",
    "WL African American 2",
    "WM Botswanian",
    "WN Hausa",
    "WP Caribbean African American",
    "WS Swahili",
    "XX Multi-Ethnic",
  ];

  let result = ethnicOrigin.reduce(
    (a, v) => ({ ...a, [v.split(" ")[0]]: v.split(" ")[1] }),
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
        <i class="fas fa-angle-down text-danger mx-2"></i>{" "}
        Race/Ethnicity/Religion
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-danger">
          Race/Ethnicity/Religion Filter
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is the Filter for filtering the Voters on the base of their
            Race/Ethnicity/Religion
          </DialogContentText>
          <br />

          <br />

          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Ethnicity</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Election"
              name="ETHNIC_INFER"
              value={values.ETHNIC_INFER}
              onChange={handleChange}
            >
              <MenuItem value="A">Asian</MenuItem>
              <MenuItem value="B">African American</MenuItem>
              <MenuItem value="C">Caucasian</MenuItem>
              <MenuItem value="H">Hispanic</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Ethnic Country of Origin
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Election"
              name="ETHNICCODE"
              value={values.CONG_DIST}
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
            <InputLabel id="demo-simple-select-label">Religion</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Election"
              name="RELIGION"
              value={values.CONG_DIST}
              onChange={handleChange}
            >
              <MenuItem value="B">Buddhist</MenuItem>
              <MenuItem value="C">Catholic</MenuItem>
              <MenuItem value="G">Greek Orthodox</MenuItem>
              <MenuItem value="H">Hindu</MenuItem>
              <MenuItem value="I">Islamic</MenuItem>
              <MenuItem value="J">Jewish</MenuItem>
              <MenuItem value="K">Siku</MenuItem>
              <MenuItem value="L">Lutheran</MenuItem>
              <MenuItem value="M">Mormon</MenuItem>
              <MenuItem value="O">Eastern Orthodox</MenuItem>
              <MenuItem value="P">Protestant</MenuItem>
              <MenuItem value="S">Shinto</MenuItem>
              <MenuItem value="X">Not Known or Unmatched</MenuItem>
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
