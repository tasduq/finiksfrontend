// import axios from 'axios';
import React, { createContext, useState, useEffect } from "react";
// import { API_BASE_URL } from 'src/utils/API_URLS';
// import { withRouter } from 'react-router';
// import { toast } from "react-toastify";

const AuthContext = createContext({});

const AuthProvider = (props) => {
  useEffect(() => {
    if (window.localStorage.getItem("accessToken")) {
      setLoggedIn(true);
      setRole(window.localStorage.getItem("role"));
    }
  }, []);

  const [role, setRole] = useState(window.localStorage.getItem("role"));
  // const [role, setRole] = useState("superadmin");
  const [loggedIn, setLoggedIn] = useState(
    window.localStorage.getItem("accessToken") ? true : false
  );
  console.log(role);
  console.log(loggedIn);
  const [campaignsJoined, setCampaignsJoined] = useState([]);

  const login = () => {
    setLoggedIn(true);
    setRole(window.localStorage.getItem("role"));
  };

  const logout = (data) => {
    console.log(role, "roleee");
    // if (data === "superadmin") {
    //   window.location.replace("/superadmin/login");
    // }
    // if (role === "team") {
    //   window.location.replace("/team/login");
    // }

    // if (role === null) {
    //   window.location.replace("/logins");
    // }
    // if (role === undefined) {
    //   window.location.replace("/logins");
    // }
    // if (role === "") {
    //   window.location.replace("/logins");
    // }
    console.log("cliked");
    window.location.replace("/logins");
    window.localStorage.clear();
    setLoggedIn(false);
    setRole("");

    // toast.success("You are logged out", {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
  };

  const authContextValue = {
    loggedIn,
    login,
    logout,
    role,
    campaignsJoined,
    setCampaignsJoined,
    setRole,
  };
  // const authContextValue = {  };

  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
