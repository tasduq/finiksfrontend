import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { updateVoterInfo } from "../../../../Connection/Team";
import { ToastContainer, toast } from "react-toastify";

export default function Addtoteam({ data, listId, handleUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    firstName: "",
    email: "",
    phoneNumber: "",
    mobileNumber: "",
    address: "",
    lastName: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (evt) => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log(values);
    let res = await updateVoterInfo({
      ...values,
      voterId: data?._id,
      listId: listId,
      campaignId: window.localStorage.getItem("id"),
    });
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
      handleClose();
    }
  };

  React.useEffect(() => {
    setValues({
      firstName: data?.FIRSTNAME ?? "",
      lastName: data?.LASTNAME ?? "",
      address: data?.ADDRESS ?? "",
      phoneNumber: data?.PHONE_NUM ?? "",
      mobileNumber: data?.MOBILE_NUM ?? "",
      email: data?.EMAIL ?? "",
    });
  }, [data]);

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}

      <div
        style={{ color: "#D12E2F" }}
        className="text-center  btn"
        onClick={handleClickOpen}
      >
        <i style={{ fontSize: "25px" }} class="fas fa-ellipsis-h"></i>
        <br /> <p style={{ fontSize: "12px" }}>Update</p>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Voter Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Is this person’s contact information incorrect? You can update it
            here!
          </DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleChange}
          /> */}
          <div
            style={{
              minHeight: "90vh",
              height: "auto",
              backgroundColor: "#FFFFFF",
            }}
            className=" shadow-sm p-3 text-center"
          >
            <div className="row  ">
              <div className="col-1"></div>
              <div className="col-10 mt-3">
                <div className=" d-flex justify-content-center">
                  {/* <Avatar
                    sx={{
                      bgcolor: "#FF914D",
                      width: 75,
                      height: 75,
                    }}
                    src={values.campaignLogo?.length > 1 && values.campaignLogo}
                    alt={window.localStorage.getItem("username")}
                  /> */}

                  {/* C
                            </Avatar> */}
                </div>
                {/* <Imagepi selectedImagecker selectedImage={handleSelectedImage} /> */}
                <br /> <br />
                <div>
                  <div class="form-group text-left">
                    <label
                      style={{ color: "#d12e2f" }}
                      for="exampleInputEmail1"
                    >
                      Prefered Name
                    </label>
                    <input
                      type="text"
                      className="form-control shadow-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={values?.firstName}
                      onChange={handleChange}
                      name="firstName"
                    />
                  </div>
                  {/* <div class="form-group text-left">
                    <label
                      style={{ color: "#d12e2f" }}
                      for="exampleInputEmail1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control shadow-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={values?.lastName}
                      onChange={handleChange}
                      name="lastName"
                    />
                  </div> */}
                  <div class="form-group text-left">
                    <label
                      style={{ color: "#d12e2f" }}
                      for="exampleInputEmail1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className="form-control shadow-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={values?.phoneNumber}
                      onChange={handleChange}
                      name="phoneNumber"
                    />
                  </div>
                  <div class="form-group text-left">
                    <label
                      style={{ color: "#d12e2f" }}
                      for="exampleInputEmail1"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="number"
                      className="form-control shadow-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={values?.mobileNumber}
                      onChange={handleChange}
                      name="mobileNumber"
                    />
                  </div>
                  <div class="form-group text-left">
                    <label
                      style={{ color: "#d12e2f" }}
                      for="exampleInputEmail1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control shadow-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={values?.email}
                      onChange={handleChange}
                      name="email"
                      //   disabled
                    />
                  </div>
                  {/* <div class="form-group text-left">
                    <label
                      style={{ color: "#d12e2f" }}
                      for="exampleInputEmail1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control shadow-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={values?.address}
                      onChange={handleChange}
                      name="address"
                    />
                  </div> */}
                  <br />
                </div>
              </div>
              <div className="col-1"></div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button className="text-danger" onClick={handleSubmit}>
            Update Voter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
