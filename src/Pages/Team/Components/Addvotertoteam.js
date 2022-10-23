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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Addnewtag from "../../Tags/Components/Addtag";
import { getInvitedVoters } from "../../../Connection/Team";
import { ToastContainer, toast } from "react-toastify";
import Addnewmember from "./Addnewmember";

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

export default function Invitedvoters({ handleUpdateData }) {
  const [open, setOpen] = React.useState(false);
  //   const [checked, setChecked] = React.useState([]);
  //   const [checkedTags, setCheckedTags] = React.useState([]);
  const [voters, setVoters] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const handleGetTeam = async () => {
      const res = await getInvitedVoters({
        campaignId: window.localStorage.getItem("id"),
      });
      console.log(res);
      if (res.data.success === true) {
        setVoters(res.data.invitedVoters);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    handleGetTeam();
    // setUpdate(false);
  }, []);

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      {/* <button onClick={handleClickOpen} className="btn">
        Add Voter to Team
      </button> */}
      <p
        style={{ color: "#FFFFFF", backgroundColor: "#583689" }}
        className="btn px-3 py-2 mx-2 mt-2"
        onClick={handleClickOpen}
      >
        Invited Voters
      </p>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Invited Voters
        </BootstrapDialogTitle>
        <div className="">
          <div className="text-center">
            <h5 className="my-2 text-danger ">Campaign Invited Voters</h5>

            {/* <Addnewtag
              handleUpdate={handleUpdate}
              campaignOwnerId={window.localStorage.getItem("id")}
            /> */}
          </div>
          {voters?.length === 0 && <p className="mx-3">No Voters Found</p>}
          <div className="text-center">
            {" "}
            {!voters && (
              <div
                class="spinner-border text-danger text-center mt-3"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            )}
          </div>

          {voters?.length > 0 && (
            <List
              sx={{
                width: "100%",
                // maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              {voters?.length > 0 &&
                voters?.map((value) => {
                  const labelId = `checkbox-list-label-${value.email}`;

                  return (
                    <ListItem
                      key={value.email}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="comments"
                        ></IconButton>
                      }
                      disablePadding
                      style={{ borderBottom: "1px solid grey" }}
                    >
                      <ListItemButton
                        role={undefined}
                        // onClick={handleToggle({
                        //   tagId: value._id,
                        //   tagName: value.tagName,
                        // })}
                        dense
                      >
                        <ListItemText id={labelId} primary={value.email} />
                        <Addnewmember
                          data={value.email}
                          handleUpdateData={handleUpdateData}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
            </List>
          )}
        </div>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
          {/* <Button className="text-danger" autoFocus>
            Save
          </Button> */}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
