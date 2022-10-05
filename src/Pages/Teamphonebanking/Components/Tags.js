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

export default function Tags({ adminTags, tags, handleTags, handleUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState([]);
  const [checkedTags, setCheckedTags] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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

  const handleSave = () => {
    console.log(checkedTags);
    handleTags(checkedTags);
    handleClose();
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <button onClick={handleClickOpen} className="btn">
        <i
          style={{
            color: "#D12E2F",
            // width: "35px",
            // height: "35px",
            fontSize: "25px",
          }}
          class="fas fa-plus-circle "
        ></i>
      </button>
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
          Voter Tags
        </BootstrapDialogTitle>
        <div className="">
          <div className="text-center">
            {/* <h5 className="my-2 text-danger ">Campaign Tags</h5> */}

            <Addnewtag
              handleUpdate={handleUpdate}
              campaignOwnerId={window.localStorage.getItem("id")}
            />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 ">
                <h5 className="text-center text-danger mt-4">Campaign Tags</h5>
                {adminTags?.length === 0 && <p>No Campaign Tags Found</p>}
                <div className="text-center">
                  {" "}
                  {!adminTags && (
                    <div
                      class="spinner-border text-danger text-center mt-3"
                      role="status"
                    >
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
                </div>

                {adminTags?.length > 0 && (
                  <List
                    sx={{
                      width: "100%",
                      // maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {adminTags?.length > 0 &&
                      adminTags?.map((value) => {
                        const labelId = `checkbox-list-label-${value._id}`;

                        return (
                          <ListItem
                            key={value._id}
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
                              <ListItemText
                                id={labelId}
                                primary={value.tagName}
                              />
                              <button
                                title={value.description}
                                className="btn text-muted"
                              >
                                i
                              </button>
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                  </List>
                )}
              </div>
              <div className="col-6 ">
                <h5 className="text-center text-danger mt-4">Custom Tags</h5>
                {tags?.length === 0 && <p>No Tags Found</p>}
                <div className="text-center">
                  {" "}
                  {!tags && (
                    <div
                      class="spinner-border text-danger text-center mt-3"
                      role="status"
                    >
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
                </div>

                {tags?.length > 0 && (
                  <List
                    sx={{
                      width: "100%",
                      // maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {tags?.length > 0 &&
                      tags?.map((value) => {
                        const labelId = `checkbox-list-label-${value._id}`;

                        return (
                          <ListItem
                            key={value._id}
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
                              <ListItemText
                                id={labelId}
                                primary={value.tagName}
                              />
                              <button
                                title={value.description}
                                className="btn text-muted"
                              >
                                i
                              </button>
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                  </List>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button className="text-danger" autoFocus onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
