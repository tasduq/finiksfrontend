import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useAuth } from "../../Context/Auth-Context";
import Logo from "../../Assets/logoword.png";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";
import { loginCampaign } from "../../Connection/Auth";
import { Link, NavLink, useHistory, withRouter } from "react-router-dom";

const Logincamapaign = () => {
  const [loaded, setLoaded] = useState(true);
  const { login, loggedIn } = useAuth();
  const [values, setValues] = useState({
    email: "",
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

  return (
    <div style={{ backgroundColor: "#FCFCFC", height: "100vh" }}>
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
              <br />
              <br />
              <div>
                <h2>Campaign Manager</h2>
                <p>If you are an admin</p>
                <p>click Here :</p>
                <div>
                  <Link
                    //   className={clsx({
                    //     selected: checkRoute("/team/teammembers"),
                    //     "m-2": true,
                    //     nonselected: checkRoute("/team/teammembers") === false,
                    //   })}
                    to="/logincampaign"
                  >
                    <button
                      style={{
                        color: "#FFFFFF",
                        backgroundColor: "#d12e2f",
                        width: "271px",
                        height: "42px",
                        fontSize: "16px",
                      }}
                      className="btn px-3 py-2"
                    >
                      Sign In
                    </button>
                  </Link>
                </div>
              </div>
              <br />
              <br />
              <div>
                <h2>Volunteer</h2>
                <p>If you are a campaign member</p>
                <p>click Here :</p>
                <div>
                  <Link
                    //   className={clsx({
                    //     selected: checkRoute("/team/teammembers"),
                    //     "m-2": true,
                    //     nonselected: checkRoute("/team/teammembers") === false,
                    //   })}
                    to="/team/login"
                  >
                    <button
                      style={{
                        color: "#FFFFFF",
                        backgroundColor: "#d12e2f",
                        width: "271px",
                        height: "42px",
                        fontSize: "16px",
                      }}
                      className="btn px-3 py-2"
                    >
                      Sign In
                    </button>
                  </Link>
                </div>
                <br />
                <br />
                <p className="mt-2">
                  <strong> Not Registered Already?</strong>
                  <br />

                  <button className="btn text-danger">
                    <a className="text-danger" href="/team/register">
                      Register Here
                    </a>{" "}
                  </button>
                </p>
              </div>
            </Paper>
          </div>
          <div className="col-1 col-lg-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Logincamapaign;
