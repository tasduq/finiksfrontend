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

const settings = ["Settings", "Contacts"];
const Header = ({ name, purpose }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { logout, role } = useAuth();
  console.log("props");
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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

        <div className="mt-4 d-flex">
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={Profile} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
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
              {settings.map((setting) => (
                <MenuItem
                  className="d-flex justify-content-between px-4"
                  key={setting}
                  // onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">{setting}</Typography>
                  <i class="fas fa-angle-right text-danger ml-5"></i>
                </MenuItem>
              ))}
              {role !== "superadmin" && (
                <MenuItem
                  className="d-flex justify-content-between px-4"
                  // key={setting}
                  // onClick={handleCloseUserMenu}
                >
                  <Createscript
                    // handleScripts={(scripts) => setScripts(scripts)}
                    buttonName={{ name: "Scripts", color: "text-dark" }}
                  />
                  <i class="fas fa-angle-right text-danger ml-5"></i>
                </MenuItem>
              )}

              <Link to="/surveys">
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
              <Link to="/tags">
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
              </Link>
              {role === "superadmin" && (
                <MenuItem
                  className="d-flex justify-content-between px-4"
                  // key={setting}
                  // onClick={handleCloseUserMenu}
                >
                  <Link to="/upload">
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
          </Box>
          <div className="mx-2 mt-2">
            <p>{window.localStorage.getItem("username")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
