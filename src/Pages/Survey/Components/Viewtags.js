import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Addnewtag from "../../Tags/Components/Addtag";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
// import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { ToastContainer, toast } from "react-toastify";
import {
  getTags,
  getClientTags,
  connectTagsToUsers,
} from "../../../Connection/Tags";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Viewtags({ open, handleOpen, data }) {
  const [checked, setChecked] = React.useState([]);
  const [checkedTags, setCheckedTags] = React.useState([]);
  const [foundTags, setFoundTags] = React.useState();
  const [update, setUpdate] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleUpdate = () => {
    setUpdate(true);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value.tagId);
    const newChecked = [...checked];
    const newCheckedTags = [...checkedTags];

    if (currentIndex === -1) {
      newChecked.push(value.tagId);
      newCheckedTags.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
      newCheckedTags.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setCheckedTags(newCheckedTags);
  };

  const handleConnectTags = async () => {
    setLoading(true);
    const payLoad = {
      tags: checkedTags,
      selectedVoters: data,
      campaignId: window.localStorage.getItem("id"),
      campaignName: window.localStorage.getItem("role"),
      subUserName: window.localStorage.getItem("role"),
      subUserId: window.localStorage.getItem("id"),
    };

    const res = await connectTagsToUsers(payLoad);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleOpen();
      setLoading(false);
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    }
  };

  React.useEffect(() => {
    console.log("i am running");
    const handleGetTags = async () => {
      setLoading(true);
      if (window.localStorage.getItem("role") === "superadmin") {
        const res = await getTags();
        console.log(res);
        if (res.data.success === true) {
          setFoundTags(res.data.tags);
          setLoading(false);
        } else {
          toast.error(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoading(false);
        }
      } else {
        const res = await getClientTags({
          id: window.localStorage.getItem("id"),
        });
        console.log(res);
        if (res.data.success === true) {
          setFoundTags(res.data.clientData);
          setLoading(false);
        } else {
          toast.error(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoading(false);
        }
      }
    };

    handleGetTags();
    setUpdate(false);
  }, [update === true]);

  return (
    <div>
      {console.log(checked)}
      <BootstrapDialog
        onClose={handleOpen}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div className="d-flex justify-content-between  align-items-center">
          {" "}
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleOpen}
          >
            Choose Tags for Voter
          </BootstrapDialogTitle>
          <div>
            {/* <button
              style={{
                width: "150px",
                height: "36px",
                backgroundColor: "#D12E2F",
                color: "white",
              }}
              className="mr-5 btn "
            >
              {" "}
              Create New Tag
            </button> */}
            <div className="mr-5 my-2">
              {" "}
              <Addnewtag handleUpdate={handleUpdate} />
            </div>
          </div>
        </div>

        <DialogContent dividers>
          <Typography gutterBottom>
            There you can Attach and create varioues tags accoding to the need
            of the Voter so you can identify the voter on the base of Tags
          </Typography>
        </DialogContent>
        {loading === true ? (
          <div className="text-center mt-2">
            <div class="spinner-border text-danger" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {foundTags?.length > 0 &&
              foundTags?.map((value) => {
                const labelId = `checkbox-list-label-${value._id}`;

                return (
                  <ListItem
                    key={value._id}
                    secondaryAction={
                      <IconButton edge="end" aria-label="comments">
                        {/* <CommentIcon /> */}
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle({
                        tagId: value._id,
                        tagName: value.tagName,
                      })}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value._id) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={value.tagName} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
        )}

        <DialogActions>
          {loading === false && (
            <Button autoFocus onClick={handleConnectTags}>
              Apply Tags
            </Button>
          )}

          {loading === true && (
            <button class="btn btn-danger" type="button" disabled>
              <span
                class="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Loading...</span>
            </button>
          )}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
