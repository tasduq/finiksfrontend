import React, { useState, useEffect } from "react";
import { useAuth } from "./Context/Auth-Context";

// import "./App.css";
import { UnAuthenticatedRoutes, AuthenticatedRoutes } from "./Routes/routes";

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  const { loggedIn, login, logout, role } = useAuth();
  console.log(role, "i am role");
  if (loggedIn) {
    console.log("I am here");
    // login();
    return <AuthenticatedRoutes role={role} />;
  } else {
    return <UnAuthenticatedRoutes />;
  }
}

export default App;
