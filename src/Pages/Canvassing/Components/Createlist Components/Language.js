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

export default function Language({ handleFilterData }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [values, setValues] = React.useState({
    LANGUAGE: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let languages = [
    "Afrikaans=A1",
    "Albanian=A2",
    "Amharic=A3",
    "Arabic=A4",
    "Armenian=A5",
    "Ashanti=A6",
    "Azeri=A7",
    "Bantu=B1",
    "Basque=B2",
    "Bengali=B3",
    "Bulgarian=B4",
    "Burmese=B5",
    "Chinese (Mandarin, Cantonese and other dialects)=C1",
    "Comorian=C2",
    "Czech=C3",
    "Danish=D1",
    "Dutch=D2",
    "Dzongha=D3",
    "English=E1",
    "Estonian=E2",
    "Farsi=F1",
    "Finnish=F2",
    "French=F3",
    "Georgian=G1",
    "German=G2",
    "Ga=G3",
    "Greek=G4",
    "Hausa=H1",
    "Hebrew=H2",
    "Hindi=H3",
    "Hungarian=H4",
    "Icelandic=I1",
    "Indonesian=I2",
    "Italian=I3",
    "Japanese=J1",
    "Kazakh=K1",
    "Khmer=K2",
    "Kirghiz=K3",
    "Korean=K4",
    "Laotian (Include Hmong)=L1",
    "Latvian=L2",
    "Lithuanian=L3",
    "Macedonian=M1",
    "Malagasy=M2",
    "Malay=M3",
    "Moldavian=M4",
    "Mongolian=M5",
    "Nepali=N1",
    "Norwegian=N2",
    "Oromo=O1",
    "Pashto=P1",
    "Polish=P2",
    "Portuguese=P3",
    "Romanian=R1",
    "Russian=R2",
    "Samoan=S1",
    "Serbo-Croatian=S2",
    "Sinhalese=S3",
    "Slovakian=S4",
    "Slovenian=S5",
    "Somali=S6",
    "Sotho=S7",
    "Spanish=S8",
    "Swahili=S9",
    "Swazi=SA",
    "Swedish=SB",
    "Tagalog=T1",
    "Tajik=T2",
    "Thai=T3",
    "Tibetan=T4",
    "Tongan=T5",
    "Turkish=T6",
    "Turkmeni=T7",
    "Tswana=T8",
    "Unknown=UX",
    "Urdu=U1",
    "Uzbeki=U2",
    "Vietnamese=V1",
    "Xhosa=X1",
    "Zulu=Z1",
  ];

  let result = languages.reduce(
    (a, v) => ({ ...a, [v.split("=")[1]]: v.split(" ")[0].split("=")[0] }),
    {}
  );
  console.log(result);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    if (values.LANGUAGE === "") {
      toast.error("Please select all the field", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    handleFilterData(values);
    handleClose();
  };

  return (
    <div>
      <button className="btn mx-1" onClick={handleClickOpen}>
        <i class="fas fa-angle-down text-danger mx-2"></i> Language
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-danger">Language Filter</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is the Filter for filtering the Voters on the base of their
            Language
          </DialogContentText>
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
              name="LANGUAGE"
              value={values.LANGUAGE}
              onChange={handleChange}
            >
              {Object.entries(result).map(([key, value]) => {
                return <MenuItem value={key}>{value}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <br />
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
