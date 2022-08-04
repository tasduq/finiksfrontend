import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useAuth } from "../../Context/Auth-Context";
import Logo from "../../Assets/logoword.png";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";
import { register } from "../../Connection/Team";
import { Link, NavLink, useHistory, withRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Registerteam = () => {
  const [loaded, setLoaded] = useState(true);
  const { login, loggedIn } = useAuth();
  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
  });
  const history = useHistory();
  const location = useLocation();

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

    setLoaded(false);

    let res = await register({
      ...values,
    });
    console.log(res);
    if (res?.data?.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      history.push({
        pathname: "/team/otp",
        state: {
          email: values.email,
          path: "/team/login",
          prevPath: location.pathname,
        },
      });
      setLoaded(true);
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoaded(true);
    }
  };
  return (
    <div
      style={{ backgroundColor: "#FCFCFC", minHeight: "100vh", height: "auto" }}
    >
      <div className="mt-5 container">
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-1 col-lg-3"></div>
          <div className="col-10 col-lg-6">
            <Paper
              className="p-3"
              style={{ width: "100%", minHeight: "500px", height: "auto" }}
            >
              <img style={{ width: "90px" }} src={Logo} />
              <h2>Register</h2>
              <br />
              <form>
                <label className="text-danger d-flex" for="exampleInputEmail1">
                  First Name
                </label>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputtext1"
                    aria-describedby="textHelp"
                    value={values.firstName}
                    onChange={handleChange}
                    name="firstName"
                  />
                </div>
                <div class="form-group">
                  <label
                    className="text-danger d-flex"
                    for="exampleInputEmail1"
                  >
                    last Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputtext1"
                    aria-describedby="textHelp"
                    value={values.lastName}
                    onChange={handleChange}
                    name="lastName"
                  />
                </div>
                <div class="form-group">
                  <label
                    className="text-danger d-flex"
                    for="exampleInputEmail1"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                  />
                </div>
                <div class="form-group">
                  <label
                    className="text-danger d-flex"
                    for="exampleInputPassword1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                  />
                </div>
                <div class="form-group">
                  <label
                    className="text-danger d-flex"
                    for="exampleInputEmail1"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputtext1"
                    aria-describedby="textHelp"
                    value={values.address}
                    onChange={handleChange}
                    name="address"
                  />
                </div>
                <div class="form-group">
                  <label
                    className="text-danger d-flex"
                    for="exampleInputEmail1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputtext1"
                    aria-describedby="textHelp"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    name="phoneNumber"
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
                    onClick={handleSubmit}
                  >
                    Register
                  </button>
                )}
              </form>
            </Paper>
          </div>
          <div className="col-1 col-lg-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Registerteam;
