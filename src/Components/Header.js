import React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Profile from "../Assets/profile.jpeg";
import { useAuth } from "../Context/Auth-Context";
import Createscript from "../Pages/Phonebanking/Components/Createscript";
import Profilepage from "../Pages/Finiksgeneral/Profile";
import Clienttagspage from "../Pages/Tags/Components/Clienttagspage";

const settings = ["Settings", "Contacts"];
const Header = ({ name, purpose }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openTags, setOpenTags] = React.useState(false);
  const [dSelect, setDSelect] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);

  const { logout, role } = useAuth();
  console.log("props");
  const handleOpenUserMenu = (event) => {
    setOpenMenu(true);
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setOpenMenu(false);
    setAnchorElUser(null);
  };

  const handleOpenTags = (list) => {
    console.log(list);
    // setClientTagsList(list);
    setOpenTags(!openTags);
  };

  const handleDSelect = () => {
    setDSelect(false);
  };

  const linkStyle = {
    textDecoration: "none", // Remove underline
    color: "black", // Change this to your desired color
  };

  const linkHoverStyle = {
    textDecoration: "none", // Remove underline on hover (you can remove this line if you want to keep the underline on hover)
    // Add any other styles you want to apply when the link is being hovered
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="text-left">
          {" "}
          <h1 className="mt-4 ">{name}</h1>
          <p>
            {purpose
              ? purpose
              : `Welcome Back, ${window.localStorage.getItem("username")}`}
          </p>
        </div>
        <Box sx={{ flexGrow: 0 }}>
          <div className="mt-4 d-flex">
            <div onClick={handleOpenUserMenu} className="d-flex">
              <Tooltip
                className={`${openMenu === true && "d-none"} mr-3`}
                title="Open settings"
              >
                <IconButton sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={window.localStorage.getItem("campaignLogo")}
                  />
                </IconButton>
              </Tooltip>

              <div className=" mt-1 mr-3">
                <button className="btn">
                  {window.localStorage.getItem("firstName")}
                </button>
              </div>
              <i
                onClick={handleOpenUserMenu}
                class="fas fa-chevron-down text-danger mt-2 pt-2"
              ></i>
            </div>

            <Menu
              sx={{ ml: "20px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem
                  className="d-flex justify-content-between px-4"
                  key={setting}
                  // onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">{setting}</Typography>
                  <i class="fas fa-angle-right text-danger ml-5"></i>
                </MenuItem>
              ))} */}

              {/* <MenuItem
                className="d-flex justify-content-between px-4"
                // key={setting}
                // onClick={handleCloseUserMenu}
              > */}
              <MenuItem
                className="d-flex justify-content-around mb-1"
                // key={setting}
                // onClick={handleCloseUserMenu}
                onClick={handleCloseUserMenu}
              >
                <Tooltip title="Open settings">
                  <IconButton sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={window.localStorage.getItem("campaignLogo")}
                    />
                  </IconButton>
                </Tooltip>
                <div className="">
                  <div onClick={handleCloseUserMenu} className="d-flex mt-1">
                    <button className="btn">
                      {window.localStorage.getItem("firstName")}
                    </button>
                    <div className="mx-1 mt-2">
                      <i
                        onClick={handleCloseUserMenu}
                        class="fas fa-chevron-up text-danger "
                      ></i>
                    </div>
                  </div>
                  <div className=" ">
                    <hr className="m-0 mb-2" />
                  </div>
                </div>
              </MenuItem>

              <Profilepage btn1={true} />
              {/* </MenuItem> */}
              {window.localStorage.getItem("teamLogin") === "true" && (
                <Link
                  to="/selectcampaign"
                  style={linkStyle}
                  onMouseOver={(e) =>
                    Object.assign(e.target.style, linkHoverStyle)
                  }
                >
                  <MenuItem
                    className="d-flex justify-content-between px-4"
                    // key={setting}
                    // onClick={handleCloseUserMenu}
                  >
                    <Typography className="text-dark" textAlign="center">
                      Switch Campaign
                    </Typography>
                    <i class="fas fa-angle-right text-danger ml-5"></i>
                  </MenuItem>
                </Link>
              )}

              {role !== "superadmin" && role !== "team" && (
                // <MenuItem

                // // key={setting}
                // // onClick={handleCloseUserMenu}
                // >
                <Createscript
                  // handleScripts={(scripts) => setScripts(scripts)}
                  buttonName={{ name: "Scripts", color: "text-dark" }}
                />
                // </MenuItem>
              )}

              <MenuItem
                className="d-flex justify-content-between px-4"
                // key={setting}
                onClick={handleOpenTags}
              >
                <Typography className="text-dark" textAlign="center">
                  Tags
                </Typography>
                <i class="fas fa-angle-right text-danger ml-5"></i>
              </MenuItem>

              {role !== "team" && (
                <Link
                  to="/surveys"
                  style={linkStyle}
                  onMouseOver={(e) =>
                    Object.assign(e.target.style, linkHoverStyle)
                  }
                >
                  <MenuItem
                    className="d-flex justify-content-between px-4"
                    // key={setting}
                    // onClick={handleCloseUserMenu}
                  >
                    <Typography className="text-dark" textAlign="center">
                      Surveys
                    </Typography>
                    <i class="fas fa-angle-right text-danger ml-5"></i>
                  </MenuItem>
                </Link>
              )}

              {/* <Link to="/tags">
                <MenuItem
                  className="d-flex justify-content-between px-4"
                  // key={setting}
                  // onClick={handleCloseUserMenu}
                >
                  <Typography className="text-dark" textAlign="center">
                    Tags
                  </Typography>
                  <i class="fas fa-angle-right text-danger ml-5"></i>
                </MenuItem>
              </Link> */}
              {role === "superadmin" && (
                <MenuItem
                  className="d-flex justify-content-between px-4"
                  // key={setting}
                  // onClick={handleCloseUserMenu}
                >
                  <Link
                    to="/upload"
                    style={linkStyle}
                    onMouseOver={(e) =>
                      Object.assign(e.target.style, linkHoverStyle)
                    }
                  >
                    <Typography className="text-dark" textAlign="center">
                      Upload Data
                    </Typography>
                  </Link>

                  <i class="fas fa-upload text-danger ml-5"></i>
                </MenuItem>
              )}

              <MenuItem
                className="d-flex justify-content-between px-4"
                // key={setting}
                onClick={() => logout(role)}
              >
                <Typography className="text-danger" textAlign="center">
                  Log out
                </Typography>
                <i class="fas fa-sign-out-alt text-danger ml-5"></i>
              </MenuItem>
            </Menu>
          </div>
        </Box>
      </div>
      {openTags && (
        <Clienttagspage
          data={window.localStorage.getItem("id")}
          open={openTags}
          handleOpenTags={handleOpenTags}
          dSelect={dSelect}
          handleDSelect={handleDSelect}
          selectButtonDisabled={true}
          getDataFromServer={true}
        />
      )}
    </div>
  );
};

export default Header;
