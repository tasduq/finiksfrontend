import React from "react";
import "../App.css";

import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
// import Footer from "../Components/Footer";
// import { ToastContainer } from "react-toastify";
// import { useAuth } from "../Contexts/Auth-Context";
// import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../Pages/Dashboard";
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
import { ToastContainer } from "react-toastify";
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
              } else {
                return <Dashboard {...routeProps} />;
              }
            }}
          />
          <Route
            exact
            path="/superadmin/dashboard"
            // render={(routeProps) => <Superadmindashboard {...routeProps} />}
            render={(routeProps) => {
              console.log(routeProps);
              return <Superadmindashboard {...routeProps} />;
            }}
          />
          <Route
            exact
            path="/phonebanking"
            render={(routeProps) => <Phonebank {...routeProps} />}
          />
          <Route
            exact
            path="/canvassing"
            render={(routeProps) => <Canvassing {...routeProps} />}
          />
          <Route
            exact
            path="/team"
            render={(routeProps) => <Team {...routeProps} />}
          />
          <Route
            exact
            path="/upload"
            render={(routeProps) => <Upload {...routeProps} />}
          />
          <Route
            exact
            path="/clients"
            render={(routeProps) => <Clients {...routeProps} />}
          />

          <Route
            exact
            path="/voterdata"
            render={(routeProps) => <Voterdata {...routeProps} />}
          />

          <Route
            exact
            path="/tags"
            render={(routeProps) => <Tags {...routeProps} />}
          />

          <Route
            exact
            path="/surveys"
            render={(routeProps) => <Surveys {...routeProps} />}
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

          <Route render={() => <Redirect to="/logincampaign" />} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
};
