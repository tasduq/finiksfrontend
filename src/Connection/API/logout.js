let logout = () => {
  window.location.replace("/logins");
  window.localStorage.clear();
};

export default logout;
