import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useAuth } from "../../Context/Auth-Context";
import Logo from "../../Assets/logoword.png";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";
import { loginTeam } from "../../Connection/Team";
import { Link, NavLink, useHistory, withRouter } from "react-router-dom";
import { newPassword } from "../../Connection/Team";

const Newpassword = (props) => {
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
  const [loaded, setLoaded] = useState(true);
  const { login, loggedIn, campaignsJoined, setCampaignsJoined } = useAuth();
  const [values, setValues] = useState({
    password: "",
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

  const handleNewPassword = async (evt) => {
    evt.preventDefault();
    const res = await newPassword({
      ...values,
      recentOtp: props.location.state?.otp,
      email: props.location.state?.email,
      prevPath: props.location.state?.prevPath,
    });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      history.push({
        pathname: "/logins",
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
              <h2>New Password</h2>
              <br />
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">New Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                  />
                </div>

                <div className="text-center">
                  {loaded === false && (
                    <div className="text-center">
                      <div class="spinner-border text-danger" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                  )}
                </div>

                {loaded === true && (
                  <button
                    style={{ color: "#FFFFFF", backgroundColor: "#d12e2f" }}
                    className="btn px-3 py-2"
                    //   onClick={handleClickOpen}
                    onClick={handleNewPassword}
                  >
                    Save New Password
                  </button>
                )}
              </form>
            </Paper>
          </div>
          <div className="col-1 col-md-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Newpassword;
