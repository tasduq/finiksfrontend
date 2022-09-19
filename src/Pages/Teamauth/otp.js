import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useAuth } from "../../Context/Auth-Context";
import Logo from "../../Assets/logoword.png";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";
import { otpTeam, newOtp } from "../../Connection/Team";
import { Link, NavLink, useHistory, withRouter } from "react-router-dom";

const Otp = (props) => {
  React.useEffect(() => {
    if (
      props.location.state?.prevPath === "" ||
      props.location.state === undefined
    ) {
      toast.error("You cannot access Directly", {
        position: toast.POSITION.TOP_RIGHT,
      });
      history.push("/logins");
    }
  }, []);
  console.log(props);
  const [loaded, setLoaded] = useState(false);
  const { login, loggedIn } = useAuth();
  const [values, setValues] = useState({
    email: props.location.state?.email,
    otp: "",
  });
  const history = useHistory();
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handleValidate = () => {
    let test = validator.isEmail(values.email);
    return test;
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const testStatus = handleValidate(values.email);

    if (testStatus === false) {
      alert("Email is not valid");
      return;
    }
    console.log("I am called");

    let res = await otpTeam({
      ...values,
      prevPath: props.location.state?.prevPath,
    });
    console.log(res);
    if (res?.data?.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      history.push({
        pathname: props.location.state.path,
        state: {
          otp: values.otp,
          email: props.location.state?.email,
          prevPath: props.location.state?.prevPath,
        },
      });
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleNewOtp = async (evt) => {
    evt.preventDefault();
    const res = await newOtp({
      ...values,
      prevPath: props.location.state?.prevPath,
    });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div style={{ backgroundColor: "#FCFCFC", height: "100vh" }}>
      <div className="mt-5 container">
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-1 col-md-4"></div>
          <div className="col-10 col-md-4">
            <Paper className="p-3" style={{ width: "100%", height: "500px" }}>
              <img style={{ width: "90px" }} src={Logo} />
              <h2>Email Verification</h2>
              <br />
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">OTP</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={values.otp}
                    onChange={handleChange}
                    name="otp"
                  />
                </div>

                <button
                  style={{ color: "#FFFFFF", backgroundColor: "#d12e2f" }}
                  className="btn px-3 py-2"
                  //   onClick={handleClickOpen}
                  onClick={handleSubmit}
                >
                  Verify Email
                </button>
                <p className="mt-2">
                  OTP not recieved?{" "}
                  <button className="btn text-danger" onClick={handleNewOtp}>
                    <a className="text-danger" href="/team/register">
                      Request New
                    </a>{" "}
                  </button>
                </p>
              </form>
            </Paper>
          </div>
          <div className="col-1 col-md-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
