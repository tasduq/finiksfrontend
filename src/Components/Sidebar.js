import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Appbar from "./Appbar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import clsx from "clsx";
import { useLocation, Link, NavLink } from "react-router-dom";
import { useAuth } from "../Context/Auth-Context";

import Logo from "../Assets/logoword.png";

import "../Styles/sidebar.css";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(18)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Sidebar() {
  const theme = useTheme();
  const { role } = useAuth();
  const { logout } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const checkRoute = (pathShouldBe) => {
    console.log(location.pathname);
    if (pathShouldBe === location.pathname) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Box className="mb-5" sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        style={{ backgroundColor: "#FFFFFF" }}
        position="fixed"
        open={open}
        // className="mb-5"
      >
        <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton> */}
          {/* <Typography variant="h6" noWrap component="div">
            Finiks
          </Typography> */}
          <img style={{ width: "90px" }} src={Logo} />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
          </Box>
        </Toolbar>
      </AppBar>
      {/* <Appbar /> */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {console.log(role)}
        {role === "superadmin" ? (
          <>
            <NavLink
              className={clsx({
                selected: checkRoute("/superadmin/dashboard"),
                "m-2": true,
                nonselected: checkRoute("/superadmin/dashboard") === false,
              })}
              to="/superadmin/dashboard"
            >
              <List>
                {" "}
                <ListItemButton
                  // key={text}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  // className="selected"
                >
                  <div className="text-center  ">
                    <i class="fas fa-home "></i>
                    <p>Super Admin</p>

                    {/* <ListItemText
                primary="Dashboard"
                // sx={{ opacity: open ? 1 : 0 }}
              /> */}
                  </div>
                </ListItemButton>
              </List>
            </NavLink>
            <Link
              className={clsx({
                selected: checkRoute("/clients"),
                "m-2": true,
                nonselected: checkRoute("/clients") === false,
              })}
              to="/clients"
            >
              <List>
                <ListItemButton
                  // key={text}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <div className="text-center">
                    <i class="fas fa-users"></i>

                    <ListItemText
                      primary="Clients"
                      // sx={{ opacity: open ? 1 : 0 }}
                    />
                  </div>
                </ListItemButton>
              </List>
            </Link>
            <Link
              className={clsx({
                selected: checkRoute("/voterdata"),
                "m-2": true,
                nonselected: checkRoute("/voterdata") === false,
              })}
              to="/voterdata"
            >
              {" "}
              <List>
                <ListItemButton
                  // key={text}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <div className="text-center">
                    <i class="fas fa-server "></i>

                    <ListItemText
                      primary="Voter Data"
                      // sx={{ opacity: open ? 1 : 0 }}
                    />
                  </div>
                </ListItemButton>
              </List>
            </Link>

            <Link
              className={clsx({
                selected: checkRoute("/tags"),
                "m-2": true,
                nonselected: checkRoute("/tags") === false,
              })}
              to="/tags"
            >
              <List
              // className={clsx({
              //   selected: checkRoute("/tags"),
              //   "m-2": true,
              //   nonselected: checkRoute("/tags") === false,
              // })}
              >
                <ListItemButton
                  // key={text}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <div className="text-center">
                    <i class="fas fa-tag "></i>

                    <ListItemText
                      primary="Tags"
                      // sx={{ opacity: open ? 1 : 0 }}
                    />
                  </div>
                </ListItemButton>
              </List>
            </Link>

            <Link
              className={clsx({
                selected: checkRoute("/surveys"),
                "m-2": true,
                nonselected: checkRoute("/surveys") === false,
              })}
              to="/surveys"
            >
              <List>
                <ListItemButton
                  // key={text}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <div className="text-center">
                    <i class="fas fa-poll"></i>

                    <ListItemText
                      primary="Surveys"
                      // sx={{ opacity: open ? 1 : 0 }}
                    />
                  </div>
                </ListItemButton>
              </List>
            </Link>

            <List
              // className={clsx({
              //   selected: checkRoute("/surveys"),
              //   "m-2": true,
              //   nonselected: checkRoute("/surveys") === false,
              // })}
              onClick={() => logout("superadmin")}
            >
              <ListItemButton
                // key={text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <div className="text-center">
                  <i class="fas fa-sign-out-alt"></i>

                  <ListItemText
                    primary="Logout"
                    // sx={{ opacity: open ? 1 : 0 }}
                  />
                </div>
              </ListItemButton>
            </List>
          </>
        ) : (
          <>
            <NavLink
              className={clsx({
                selected: checkRoute("/"),
                "m-2": true,
                nonselected: checkRoute("/") === false,
              })}
              to="/"
            >
              <List>
                {" "}
                <ListItemButton
                  // key={text}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  // className="selected"
                >
                  <div className="text-center  ">
                    <i class="fas fa-home "></i>
                    <p>Dashboard</p>

                    {/* <ListItemText
                primary="Dashboard"
                // sx={{ opacity: open ? 1 : 0 }}
              /> */}
                  </div>
                </ListItemButton>
              </List>
            </NavLink>
            <Link
              className={clsx({
                selected: checkRoute("/phonebanking"),
                "m-2": true,
                nonselected: checkRoute("/phonebanking") === false,
              })}
              to="/phonebanking"
            >
              <List>
                <ListItemButton
                  // key={text}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <div className="text-center">
                    <i class="fas fa-phone-alt "></i>

                    <ListItemText
                      primary="Phone Banking"
                      // sx={{ opacity: open ? 1 : 0 }}
                    />
                  </div>
                </ListItemButton>
              </List>
            </Link>
            <Link
              className={clsx({
                selected: checkRoute("/canvassing"),
                "m-2": true,
                nonselected: checkRoute("/canvassing") === false,
              })}
              to="/canvassing"
            >
              <List
              // className={clsx({
              //   selected: checkRoute("/canvassing"),
              //   "m-2": true,
              // })}
              >
                <ListItemButton
                  // key={text}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <div className="text-center">
                    <i class="fas fa-map-marked-alt "></i>

                    <ListItemText
                      primary="Canvassing"
                      // sx={{ opacity: open ? 1 : 0 }}
                    />
                  </div>
                </ListItemButton>
              </List>
            </Link>

            <Link
              className={clsx({
                selected: checkRoute("/team"),
                "m-2": true,
                nonselected: checkRoute("/team") === false,
              })}
              to="/team"
            >
              <List
              // className={clsx({ selected: checkRoute("/team"), "m-2": true })}
              >
                <ListItemButton
                  // key={text}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <div className="text-center">
                    <i class="fas fa-user-friends"></i>

                    <ListItemText
                      primary="Team Members"
                      // sx={{ opacity: open ? 1 : 0 }}
                    />
                  </div>
                </ListItemButton>
              </List>
            </Link>

            <List
              className={clsx({ selected: checkRoute("/mobile"), "m-2": true })}
            >
              <ListItemButton
                // key={text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <div className="text-center">
                  <i class="fas fa-mobile-alt text-muted"></i>

                  <ListItemText
                    primary="Mobile App"
                    // sx={{ opacity: open ? 1 : 0 }}
                  />
                </div>
              </ListItemButton>
            </List>
            <List
              // className={clsx({
              //   selected: checkRoute("/surveys"),
              //   "m-2": true,
              //   nonselected: checkRoute("/surveys") === false,
              // })}
              onClick={logout}
            >
              <ListItemButton
                // key={text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <div className="text-center">
                  <i class="fas fa-sign-out-alt"></i>

                  <ListItemText
                    primary="Logout"
                    // sx={{ opacity: open ? 1 : 0 }}
                  />
                </div>
              </ListItemButton>
            </List>
          </>
        )}
      </Drawer>
    </Box>
  );
}
