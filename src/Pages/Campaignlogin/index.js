import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useAuth } from "../../Context/Auth-Context";
import Logo from "../../Assets/logoword.png";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";
import { loginCampaign } from "../../Connection/Auth";
import { Link, NavLink, useHistory, withRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Logincamapaign = () => {
  const [loaded, setLoaded] = useState(true);
  const { login, loggedIn } = useAuth();
  const [values, setValues] = useState({
    email: "",
    password: "",
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

    let res = await loginCampaign({
      ...values,
    });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      window.localStorage.setItem("username", res.data.username);
      window.localStorage.setItem("campaignName", res.data.campaignName);
      window.localStorage.setItem(
        "firstName",
        res.data.firstName ? res.data.firstName : ""
      );
      window.localStorage.setItem(
        "lastName",
        res.data.lastName ? res.data.lastName : ""
      );
      window.localStorage.setItem(
        "address",
        res.data.address ? res.data.address : ""
      );
      window.localStorage.setItem(
        "phoneNumber",
        res.data.phoneNumber ? res.data.phoneNumber : ""
      );
      window.localStorage.setItem("accessToken", res.data.access_token);
      window.localStorage.setItem("email", res.data.email);
      window.localStorage.setItem("id", res.data.id);
      window.localStorage.setItem("userId", res.data.userId);
      window.localStorage.setItem("role", res.data.role);
      window.localStorage.setItem("loggedin", true);
      window.localStorage.setItem("campaignCode", res.data.campaignCode);
      window.localStorage.setItem("campaignLogo", res.data.campaignLogo);
      window.localStorage.setItem("teamLogin", res.data.teamLogin);
      window.localStorage.setItem(
        "campaigns",
        JSON.stringify(res.data.campaigns)
      );
      // forceUpdate();

      if (res.data.teamLogin === true) {
        history.push({
          pathname: "/selectcampaign",
          state: { role: "campaignManager" },
        });
        // login();
      } else {
        history.push({
          pathname: "/",
        });
        login();
      }

      setLoaded(true);
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoaded(true);
    }
  };
  return (
    <div style={{ backgroundColor: "#FCFCFC", height: "100vh" }}>
      <div className="mt-5 container">
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-1 col-lg-4"></div>
          <div className="col-10 col-lg-4">
            <Paper
              className="p-3"
              style={{ width: "100%", minHeight: "500px", height: "auto" }}
            >
              <img style={{ width: "90px" }} src={Logo} />
              <h2>Campaign Login</h2>
              <br />
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                  />
                  <div className="d-flex justify-content-left ">
                    {" "}
                    <div className="d-flex justify-content-left ">
                      {" "}
                      <Link
                        className="text-danger"
                        to={{
                          pathname: "/forgot",
                          state: {
                            prevPath: location.pathname
                              ? location.pathname
                              : "",
                          }, // your data array of objects
                        }}
                      >
                        Forgot Password
                      </Link>
                    </div>
                  </div>
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
                    Sign In
                  </button>
                )}

                <p className="mt-2">
                  Not Registered Already?{" "}
                  <button className="btn text-danger">
                    <a className="text-danger" href="/team/register">
                      Register Here
                    </a>{" "}
                  </button>
                </p>
              </form>
            </Paper>
          </div>
          <div className="col-1 col-lg-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Logincamapaign;
