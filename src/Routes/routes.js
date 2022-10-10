import React from "react";
import "../App.css";

import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
// import Footer from "../Components/Footer";
// import { ToastContainer } from "react-toastify";
// import { useAuth } from "../Contexts/Auth-Context";
// import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../Pages/Dashboard";
import Dashboardteam from "../Pages/Teamdashboard";
import Phonebank from "../Pages/Phonebanking";
import Canvassing from "../Pages/Canvassing";
import Upload from "../Pages/Upload";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Superadmindashboard from "../Pages/SuperadminDashboard";
import Clients from "../Pages/Clients";
import Voterdata from "../Pages/Voterdata/index";
import Team from "../Pages/Team/index";
import Tags from "../Pages/Tags/index";
import Surveys from "../Pages/Survey/index";
import Logincampaign from "../Pages/Campaignlogin/index";
import Loginadmin from "../Pages/Adminlogin/index";
import Loginteam from "../Pages/Teamauth/login";
import Logins from "../Pages/Finiksgeneral/logins";
import Forgot from "../Pages/Finiksgeneral/forgot";
import Newpassword from "../Pages/Finiksgeneral/newpassword";
import Selectcampaign from "../Pages/Finiksgeneral/Selectcampaign";
import Profile from "../Pages/Finiksgeneral/Profile";
import Registerteam from "../Pages/Teamauth/signup";
import Otp from "../Pages/Teamauth/otp";
import Teamphonebank from "../Pages/Teamphonebanking/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthenticatedRoutes = ({ role }) => {
  return (
    <div className="App">
      <Router>
        <ToastContainer
          style={{
            width: "400px",
            textAlign: "center",
            fontSize: "1.3em",
          }}
        />
        <Sidebar />
        {/* <ToastContainer
          style={{
            width: "400px",
            textAlign: "center",
            fontSize: "1.3em",
          }}
        /> */}
        <Switch>
          <Route
            exact
            path="/"
            render={(routeProps) => {
              console.log(routeProps);
              if (role === "superadmin") {
                return <Superadmindashboard {...routeProps} />;
              } else if (role === "campaignManager") {
                return <Dashboard {...routeProps} />;
              } else if (role === "team") {
                console.log("tasu");
                return <Dashboardteam {...routeProps} />;
              } else {
                return (
                  <Route render={() => <Redirect to="/selectcampaign" />} />
                );
              }
            }}
          />
          <Route
            exact
            path="/superadmin/dashboard"
            // render={(routeProps) => <Superadmindashboard {...routeProps} />}
            render={(routeProps) => {
              console.log(routeProps);
              if (role === "superadmin") {
                return <Superadmindashboard {...routeProps} />;
              } else {
                toast.error("You dont have permission", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                return <Route render={() => <Redirect to="/" />} />;
              }
            }}
          />
          <Route
            exact
            path="/team/dashboard"
            // render={(routeProps) => <Superadmindashboard {...routeProps} />}
            render={(routeProps) => {
              console.log(routeProps);

              if (role === "team" || role === "superadmin") {
                return <Dashboardteam {...routeProps} />;
              } else {
                toast.error("You dont have permission", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                return <Route render={() => <Redirect to="/" />} />;
              }
            }}
          />
          <Route
            exact
            path="/selectcampaign"
            // render={(routeProps) => <Superadmindashboard {...routeProps} />}
            render={(routeProps) => {
              console.log(routeProps);
              return <Selectcampaign {...routeProps} />;
            }}
          />

          <Route
            exact
            path="/profile"
            render={(routeProps) => <Profile {...routeProps} />}
          />

          <Route
            exact
            path="/phonebanking"
            render={(routeProps) => {
              if (role === "campaignManager" || role === "superadmin") {
                return <Phonebank {...routeProps} />;
              } else {
                toast.error("You dont have permission", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                return <Route render={() => <Redirect to="/" />} />;
              }
            }}
          />
          <Route
            exact
            path="/canvassing"
            render={(routeProps) => {
              if (role === "campaignManager" || role === "superadmin") {
                return <Canvassing {...routeProps} />;
              } else {
                toast.error("You dont have permission", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                return <Route render={() => <Redirect to="/" />} />;
              }
            }}
          />
          <Route
            exact
            path="/team"
            render={(routeProps) => {
              if (role === "campaignManager" || role === "superadmin") {
                return <Team {...routeProps} />;
              } else {
                toast.error("You dont have permission", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                return <Route render={() => <Redirect to="/" />} />;
              }
            }}
          />
          <Route
            exact
            path="/upload"
            render={(routeProps) => {
              if (role === "superadmin") {
                return <Upload {...routeProps} />;
              } else {
                toast.error("You dont have permission", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                return <Route render={() => <Redirect to="/" />} />;
              }
            }}
          />
          <Route
            exact
            path="/clients"
            render={(routeProps) => {
              if (role === "superadmin") {
                return <Clients {...routeProps} />;
              } else {
                toast.error("You dont have permission", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                return <Route render={() => <Redirect to="/" />} />;
              }
            }}
          />

          <Route
            exact
            path="/voterdata"
            render={(routeProps) => {
              if (role === "superadmin") {
                return <Voterdata {...routeProps} />;
              } else {
                toast.error("You dont have permission", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                return <Route render={() => <Redirect to="/" />} />;
              }
            }}
          />

          <Route
            exact
            path="/tags"
            render={(routeProps) => <Tags {...routeProps} />}
          />

          <Route
            exact
            path="/surveys"
            render={(routeProps) => {
              if (role === "campaignManager" || role === "superadmin") {
                return <Surveys {...routeProps} />;
              } else {
                toast.error("You dont have permission", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                return <Route render={() => <Redirect to="/" />} />;
              }
            }}
          />

          <Route
            exact
            path="/team/phonebanking"
            render={(routeProps) => {
              if (role !== "campaignManager" && role !== "superadmin") {
                return <Teamphonebank {...routeProps} />;
              } else {
                toast.error("You dont have permission", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                return <Route render={() => <Redirect to="/" />} />;
              }
            }}
          />

          <Route render={() => <Redirect to="/" />} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
};

export const UnAuthenticatedRoutes = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <ToastContainer
          style={{
            width: "400px",
            textAlign: "center",
            fontSize: "1.3em",
          }}
        />
        <Switch>
          {/* <Route exact path="/login" render={(routeProps) => <Login />} /> */}
          <Route
            exact
            path="/logincampaign"
            render={(routeProps) => <Logincampaign {...routeProps} />}
          />
          <Route
            exact
            path="/superadmin/login"
            render={(routeProps) => <Loginadmin {...routeProps} />}
          />

          <Route
            exact
            path="/team/login"
            render={(routeProps) => <Loginteam {...routeProps} />}
          />

          <Route
            exact
            path="/logins"
            render={(routeProps) => <Logins {...routeProps} />}
          />

          <Route
            exact
            path="/forgot"
            render={(routeProps) => <Forgot {...routeProps} />}
          />

          <Route
            exact
            path="/newpassword"
            render={(routeProps) => <Newpassword {...routeProps} />}
          />

          <Route
            exact
            path="/team/register"
            render={(routeProps) => <Registerteam {...routeProps} />}
          />

          <Route
            exact
            path="/team/otp"
            render={(routeProps) => <Otp {...routeProps} />}
          />

          <Route
            exact
            path="/selectcampaign"
            // render={(routeProps) => <Superadmindashboard {...routeProps} />}
            render={(routeProps) => {
              console.log(routeProps);
              return <Selectcampaign {...routeProps} />;
            }}
          />

          <Route render={() => <Redirect to="/logincampaign" />} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
};
