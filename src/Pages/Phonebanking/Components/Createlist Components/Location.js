import * as React from "react";
import { useEffect, useState } from "react";
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
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

export default function Location({
  handleFilterData,
  handleLocationActive,
  campaignFilterData,
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [prec, setPrec] = React.useState([]);
  const [zips, setZips] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [county, setCounty] = React.useState([]);
  const [applied, setApplied] = React.useState(false);
  const [values, setValues] = React.useState({
    STATE: "",
    CITY: "",
    AI_COUNTY_NAME: "",
    PREC_NO1: { from: "", to: "" },
    ZIP: { from: "", to: "" },
  });

  const handleClickOpen = () => {
    setOpen(true);
    handleGetLocationFilterData();
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

  const handleChangePREC_NO1 = (evt) => {
    console.log(evt.target.value);
    if (evt.target.name === "PREC_NO1FROM") {
      setValues({
        ...values,
        PREC_NO1: { ...values.PREC_NO1, from: evt.target.value },
      });
    } else {
      setValues({
        ...values,
        PREC_NO1: { ...values.PREC_NO1, to: evt.target.value },
      });
    }
  };
  const handleChangeZip = (evt) => {
    console.log(evt.target.value);
    if (evt.target.name === "ZIPFROM") {
      setValues({
        ...values,
        ZIP: { ...values.ZIP, from: evt.target.value },
      });
    } else {
      setValues({
        ...values,
        ZIP: { ...values.ZIP, to: evt.target.value },
      });
    }
  };

  const handleSubmit = () => {
    if (
      values.PREC_NO1.from.length > 0 ||
      (values.PREC_NO1.to > 0 &&
        (values.PREC_NO1.from.length === 0 || values.PREC_NO1.to.length === 0))
    ) {
      toast.error("Please select both From and to range for Zip code", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (
      values.ZIP.from.length > 0 ||
      (values.ZIP.to > 0 &&
        (values.ZIP.from.length === 0 || values.ZIP.to.length === 0))
    ) {
      toast.error("Please select both From and to range for Zip code", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (values.ZIP.from > values.ZIP.to) {
      toast.error("Zip From cannot be  greater than Zip To", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (values.PREC_NO1.from > values.PREC_NO1.to) {
      toast.error("Precinct From cannot be  greater than Precinct To", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    handleFilterData(
      {
        ...(values.STATE.length > 0 && { STATE: values.STATE }),
        ...(values.CITY.length > 0 && { CITY: values.CITY }),
        ...(values.AI_COUNTY_NAME.length > 0 && {
          AI_COUNTY_NAME: values.AI_COUNTY_NAME,
        }),
        ...(values.ZIP.from && values.ZIP.to && { ZIP: values.ZIP }),
        ...(values.PREC_NO1.from &&
          values.PREC_NO1.to && { PREC_NO1: values.PREC_NO1 }),
      },
      "location"
    );
    console.log({
      ...(values.STATE.length > 0 && { STATE: values.STATE }),
      ...(values.CITY.length > 0 && { CITY: values.CITY }),
      ...(values.AI_COUNTY_NAME.length > 0 && {
        AI_COUNTY_NAME: values.AI_COUNTY_NAME,
      }),
      ...(values.ZIP.from && values.ZIP.to && { ZIP: values.ZIP }),
      ...(values.PREC_NO1.from &&
        values.PREC_NO1.to && { PREC_NO1: values.PREC_NO1 }),
    });
    handleLocationActive(true);
    setApplied(true);
    handleClose();
  };

  const handleClearAll = () => {
    setValues({
      ...values,
      CITY: "",
      AI_COUNTY_NAME: "",
      PREC_NO1: { from: "", to: "" },
      ZIP: { from: "", to: "" },
    });
    handleLocationActive(true);
    setApplied(true);
  };

  const handleGetLocationFilterData = async () => {
    let res = await getDistricts({
      field: "PREC_NO1",
      state: campaignFilterData?.state,
      // fieldTwoName: "STATE",
    });
    console.log(res);
    if (res.data.success === true) {
      setPrec(res.data.districts);
    } else {
      toast.error("Error getting Precinct Values", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    let res2 = await getDistricts({
      field: "ZIP",
      state: campaignFilterData?.state,
      // fieldTwoName: "STATE",
    });
    console.log(res2);
    if (res2.data.success === true) {
      setZips(res2.data.districts);
    } else {
      toast.error("Error getting Zip Codes Values", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    let res3 = await getDistricts({
      field: "CITY",
      state: campaignFilterData?.state,
      // fieldTwoName: "STATE",
    });
    console.log(res3);
    if (res3.data.success === true) {
      setCity(res3.data.districts);
    } else {
      toast.error("Error getting Zip Codes Values", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    let res4 = await getDistricts({
      field: "AI_COUNTY_NAME",
      state: campaignFilterData?.state,
      // fieldTwoName: "STATE",
    });
    console.log(res4);
    if (res4.data.success === true) {
      setCounty(res4.data.districts);
    } else {
      toast.error("Error getting Zip Codes Values", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  React.useEffect(
    (val) => {
      setValues({
        ...values,
        STATE: campaignFilterData?.state,
      });
    },
    [campaignFilterData]
  );

  return (
    <div>
      {console.log(values, campaignFilterData)}
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
        Location
      </button>
      <Dialog open={open} onClose={handleClose}>
        <div className="d-flex justify-content-between">
          {" "}
          <DialogTitle className="text-danger">Location Filter</DialogTitle>
          <button className="btn text-danger" onClick={handleClearAll}>
            Clear All <i class="fas fa-times"></i>
          </button>
        </div>

        <DialogContent>
          <DialogContentText>
            This is the Filter for filtering the Voters on the base of their
            location
          </DialogContentText>
          <br />

          <br />

          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="State"
              name="STATE"
              value={campaignFilterData?.state}
              onChange={handleChange}
              disabled
            >
              <MenuItem value="FL">Florida</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="City"
              name="CITY"
              value={values.CITY}
              onChange={handleChange}
              // disabled={campaignFilterData?.city?.length > 0 ? false : true}
            >
              {/* {campaignFilterData?.city.map((subCity) => {
                return <MenuItem value={subCity}>{subCity}</MenuItem>;
              })} */}
              <MenuItem value="">Un Select</MenuItem>
              {city.map((subCity) => {
                return <MenuItem value={subCity}>{subCity}</MenuItem>;
              })}

              {/* <MenuItem value={20}>General</MenuItem> */}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">County</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="County"
              name="AI_COUNTY_NAME"
              value={values.AI_COUNTY_NAME}
              onChange={handleChange}
              // disabled={campaignFilterData?.county?.length > 0 ? false : true}
            >
              {/* {campaignFilterData?.county.map((subCounty) => {
                return <MenuItem value={subCounty}>{subCounty}</MenuItem>;
              })} */}
              <MenuItem value="">Un Select</MenuItem>
              {county.map((subCounty) => {
                return <MenuItem value={subCounty}>{subCounty}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <br />
          <br />
          {/* <div className="text-right">
//             <button
              onClick={() => handleClear("PREC")}
              className="btn btn-sm text-danger"
            >
              Clear All Precinct <i class="fas fa-times"></i>
            </button>
          </div> */}
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Precinct From</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Precinct From"
              name="PREC_NO1FROM"
              value={values.PREC_NO1.from}
              onChange={handleChangePREC_NO1}
            >
              <MenuItem value="">Un Select</MenuItem>
              {prec?.map((subPrec) => {
                return <MenuItem value={subPrec}>{subPrec}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Precinct To</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Precinct"
              name="PREC_NO1TO"
              value={values.PREC_NO1.to}
              onChange={handleChangePREC_NO1}
            >
              <MenuItem value="">Un Select</MenuItem>
              {prec?.map((subPrec) => {
                return <MenuItem value={subPrec}>{subPrec}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Zip From</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Zip From"
              name="ZIPFROM"
              value={values.ZIP.from}
              onChange={handleChangeZip}
            >
              <MenuItem value="">Un Select</MenuItem>
              {zips?.map((subzips) => {
                return <MenuItem value={subzips}>{subzips}</MenuItem>;
              })}
            </Select>
          </FormControl>
          {/* <FormControl fullWidth size="small">
            {/* <div class="form-group">
              <input
                type="text"
                className="form-control shadow-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                // label="Zip"
                
              />
            </div> */}
          {/* <TextField
              id="outlined-basic"
              label=" ZIP code From"
              variant="outlined"
              name="ZIPFROM"
              value={values.ZIP.from}
              onChange={handleChangeZip}
              size="small"
            />
          </FormControl> */}
          <br />
          <br />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Zip To</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Zip From"
              name="ZIPTO"
              value={values.ZIP.to}
              onChange={handleChangeZip}
            >
              <MenuItem value="">Un Select</MenuItem>
              {zips?.map((subzips) => {
                return <MenuItem value={subzips}>{subzips}</MenuItem>;
              })}
            </Select>
          </FormControl>
          {/* <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Zip To</InputLabel>

            <div class="form-group">
              <input
                type="text"
                className="form-control shadow-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="ZIPTO"
                value={values.ZIP.to}
                onChange={handleChangeZip}
              />
            </div>
            <TextField
              id="outlined-basic"
              label=" ZIP code To"
              variant="outlined"
              name="ZIPTO"
              value={values.ZIP.to}
              onChange={handleChangeZip}
              size="small"
            />
          </FormControl> */}
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

// import * as React from "react";
// import { useEffect, useState } from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { ToastContainer, toast } from "react-toastify";
// import { getDistricts } from "../../../../Connection/Clients";
// import Checkbox from "@mui/material/Checkbox";
// import ListItemText from "@mui/material/ListItemText";

// export default function Location({
//   handleFilterData,
//   handleLocationActive,
//   campaignFilterData,
// }) {
//   const [open, setOpen] = React.useState(false);
//   const [date, setDate] = React.useState(null);
//   const [values, setValues] = React.useState({
//     STATE: "",
//     CITY: "",
//     AI_COUNTY_NAME: "",
//     PREC_NO1: [],
//     ZIP: [],
//   });
//   const [prec, setPrec] = React.useState([]);
//   const [zips, setZips] = React.useState([]);
//   const [applied, setApplied] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleChange = (evt) => {
//     const { name, value } = evt.target;

//     setValues({
//       ...values,
//       [name]: value,
//     });
//   };

//   const handleChangePREC_NO1 = (event) => {
//     // if (evt.target.name === "PREC_NO1FROM") {
//     //   setValues({
//     //     ...values,
//     //     PREC_NO1: { ...values.PREC_NO1, from: evt.target.value },
//     //   });
//     // } else {
//     //   setValues({
//     //     ...values,
//     //     PREC_NO1: { ...values.PREC_NO1, to: evt.target.value },
//     //   });
//     // }
//     console.log(event.target.value);
//     const {
//       target: { value },
//     } = event;

//     // if(values.district.indexOf(value) > -1){
//     //   let yoo = values.district
//     // }

//     setValues(
//       // On autofill we get a stringified value.
//       {
//         ...values,

//         PREC_NO1: typeof value === "string" ? value.split(",") : value,
//       }
//     );
//   };
//   const handleChangeZip = (event) => {
//     // if (evt.target.name === "ZIPFROM") {
//     //   setValues({
//     //     ...values,
//     //     ZIP: { ...values.ZIP, from: Number(evt.target.value) },
//     //   });
//     // } else {
//     //   setValues({
//     //     ...values,
//     //     ZIP: { ...values.ZIP, to: Number(evt.target.value) },
//     //   });
//     // }
//     console.log(event.target.value);
//     const {
//       target: { value },
//     } = event;

//     // if(values.district.indexOf(value) > -1){
//     //   let yoo = values.district
//     // }

//     setValues(
//       // On autofill we get a stringified value.
//       {
//         ...values,

//         ZIP: typeof value === "string" ? value.split(",") : value,
//       }
//     );
//   };

//   const handleSubmit = () => {
//     // if (
//     //   values.STATE === "" ||
//     //   values.CITY === "" ||
//     //   values.AI_COUNTY_NAME === "" ||
//     //   values.PREC_NO1.from === "" ||
//     //   values.PREC_NO1.to === "" ||
//     //   values.ZIP.from === "" ||
//     //   values.ZIP.to === ""
//     // ) {
//     //   toast.error("Please select all the field", {
//     //     position: toast.POSITION.TOP_RIGHT,
//     //   });
//     //   return;
//     // }
//     // if (values.ZIP.from >= values.ZIP.to) {
//     //   toast.error("Zip From cannot be equal or greater than Zip To", {
//     //     position: toast.POSITION.TOP_RIGHT,
//     //   });
//     //   return;
//     // }
//     // if (values.PREC_NO1.from >= values.PREC_NO1.to) {
//     //   toast.error("Precinct From cannot be equal or greater than Precinct To", {
//     //     position: toast.POSITION.TOP_RIGHT,
//     //   });
//     //   return;
//     // }
//     console.log(zips);

//     // let precTemp = {
//     //   from: prec[0],
//     //   to: prec[prec?.length - 1],
//     // };

//     // let zipsTemp = {
//     //   from: zips[0],
//     //   to: zips[zips?.length - 3],
//     // };

//     // if (values.PREC_NO1.length > 0) {
//     //   precTemp = {
//     //     from: Math.min(...values.PREC_NO1),
//     //     to: Math.max(...values.PREC_NO1),
//     //   };
//     // }

//     // if (values.ZIP.length > 0) {
//     //   zipsTemp = {
//     //     from: Math.min(...values.ZIP),
//     //     to: Math.max(...values.ZIP),
//     //   };
//     // }

//     handleFilterData({
//       ...(values.STATE.length > 0 && { STATE: values.STATE }),
//       ...(values.CITY.length > 0 && { CITY: values.CITY }),
//       ...(values.AI_COUNTY_NAME.length > 0 && {
//         AI_COUNTY_NAME: values.AI_COUNTY_NAME,
//       }),
//       ...(values.ZIP.length > 0 && { ZIP: values.ZIP }),
//       ...(values.PREC_NO1.length > 0 && { PREC_NO1: values.PREC_NO1 }),
//     });
//     handleLocationActive(true);
//     setApplied(true);
//     handleClose();
//   };

//   const handleClear = (field) => {
//     setValues({
//       ...values,
//       [field]: [],
//     });
//   };

//   React.useEffect((val) => {
//     const handleGetLocationFilterData = async () => {
//       let res = await getDistricts({
//         field: "PREC_NO1",
//         state: campaignFilterData?.state,
//         // fieldTwoName: "STATE",
//       });
//       console.log(res);
//       if (res.data.success === true) {
//         setPrec(res.data.districts);
//       } else {
//         toast.error("Error getting Precinct Values", {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//       }

//       let res2 = await getDistricts({
//         field: "ZIP",
//         state: campaignFilterData?.state,
//         // fieldTwoName: "STATE",
//       });
//       console.log(res2);
//       if (res2.data.success === true) {
//         setZips(res2.data.districts);
//       } else {
//         toast.error("Error getting Zip Codes Values", {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//       }
//     };
//     handleGetLocationFilterData();
//     setValues({
//       ...values,
//       STATE: campaignFilterData.state,
//     });
//   }, []);

//   return (
//     <div>
//       {console.log(values, campaignFilterData)}
//       <button
//         // style={{
//         //   backgroundColor: "#d12e2f",
//         //   color: "#FFFFFF",
//         //   //   width: "304px",
//         //   //   heigth: "36px",
//         // }}
//         className="btn mx-1"
//         onClick={handleClickOpen}
//       >
//         {applied === true && <i class="fas fa-check text-success mx-2"></i>}
//         {applied === false && (
//           <i class="fas fa-angle-down text-danger mx-2"></i>
//         )}
//         Location
//       </button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle className="text-danger">Location Filter</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             This is the Filter for filtering the Voters on the base of their
//             location
//           </DialogContentText>
//           <br />

//           <br />

//           <FormControl fullWidth size="small">
//             <InputLabel id="demo-simple-select-label">State</InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               //   value={age}
//               label="State"
//               name="STATE"
//               value={campaignFilterData?.state}
//               onChange={handleChange}
//               disabled
//             >
//               <MenuItem value="FL">Florida</MenuItem>
//             </Select>
//           </FormControl>
//           <br />
//           <br />
//           <FormControl fullWidth size="small">
//             <InputLabel id="demo-simple-select-label">City</InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               //   value={age}
//               label="City"
//               name="CITY"
//               value={values.CITY}
//               onChange={handleChange}
//               disabled={campaignFilterData?.city?.length > 0 ? false : true}
//             >
//               {campaignFilterData?.city.map((subCity) => {
//                 return <MenuItem value={subCity}>{subCity}</MenuItem>;
//               })}

//               {/* <MenuItem value={20}>General</MenuItem> */}
//             </Select>
//           </FormControl>
//           <br />
//           <br />
//           <FormControl fullWidth size="small">
//             <InputLabel id="demo-simple-select-label">County</InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               //   value={age}
//               label="County"
//               name="AI_COUNTY_NAME"
//               value={values.AI_COUNTY_NAME}
//               onChange={handleChange}
//               disabled={campaignFilterData?.county?.length > 0 ? false : true}
//             >
//               {campaignFilterData?.county.map((subCounty) => {
//                 return <MenuItem value={subCounty}>{subCounty}</MenuItem>;
//               })}
//             </Select>
//           </FormControl>
//           <br />
//           {/* <FormControl fullWidth size="small">
//             <InputLabel id="demo-simple-select-label">Precinct From</InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               //   value={age}
//               label="Precinct From"
//               name="PREC_NO1FROM"
//               value={values.PREC_NO1.from}
//               onChange={handleChangePREC_NO1}
//             >
//               <MenuItem value={27}>27</MenuItem>
//             </Select>
//           </FormControl> */}
//           <div className="text-right">
//             <button
//               onClick={() => handleClear("PREC_NO1")}
//               className="btn btn-sm text-danger"
//             >
//               Clear All <i class="fas fa-times"></i>
//             </button>
//           </div>
//           <FormControl fullWidth size="small">
//             <InputLabel id="demo-simple-select-label">
//               Select Precinct
//             </InputLabel>

//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               multiple
//               //   value={age}
//               label="District"
//               //   onChange={handleChange}
//               value={values.PREC_NO1}
//               onChange={handleChangePREC_NO1}
//               name="PREC_NO1"
//               renderValue={(selected) => selected.join(", ")}
//             >
//               {prec?.map((val) => {
//                 return (
//                   <MenuItem key={val._id} value={val}>
//                     <Checkbox checked={values?.PREC_NO1?.indexOf(val) > -1} />
//                     <ListItemText primary={`${val}`} />
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//           </FormControl>
//           <br />

//           <div className="text-right">
//             <button
//               onClick={() => handleClear("ZIP")}
//               className="btn btn-sm text-danger"
//             >
//               Clear All <i class="fas fa-times"></i>
//             </button>
//           </div>
//           <FormControl fullWidth size="small">
//             <InputLabel id="demo-simple-select-label">
//               Select Zip Codes
//             </InputLabel>

//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               multiple
//               //   value={age}
//               label="Zip Codes"
//               //   onChange={handleChange}
//               value={values.ZIP}
//               onChange={handleChangeZip}
//               name="ZIP"
//               renderValue={(selected) => selected.join(", ")}
//             >
//               {zips?.map((val) => {
//                 return (
//                   <MenuItem key={val._id} value={val}>
//                     <Checkbox checked={values?.ZIP?.indexOf(val) > -1} />
//                     <ListItemText primary={`${val}`} />
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//           </FormControl>

//           {/* <FormControl fullWidth size="small">

//             <TextField
//               id="outlined-basic"
//               label=" ZIP code From"
//               variant="outlined"
//               name="ZIPFROM"
//               value={values.ZIP.from}
//               onChange={handleChangeZip}
//               size="small"
//             />
//           </FormControl> */}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button className="text-danger" onClick={handleSubmit}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
