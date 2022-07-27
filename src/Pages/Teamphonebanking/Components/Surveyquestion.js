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

export default function CustomizedDialogs({
  open,
  handleOpen,
  data,
  handleAnswer,
}) {
  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };
  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  const [voterAnswer, setVoterAnswer] = React.useState({
    surveyId: data?.surveyId,
    surveyQuestion: data?.surveyQuestion,
    surveyName: data?.surveyName,
    surveyPreview: data?.surveyPreview,
    answer: "",
    voterId: data?.voter._id,
    voterName: data?.voter.FIRSTNAME,
    date: new Date(),
    time: new Date(),
  });
  console.log(data);

  const handleVoterAnswer = () => {
    console.log(voterAnswer);
    handleAnswer(voterAnswer, data.surveyId);
    handleOpen();
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={handleOpen}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleOpen}>
          {`${data?.voter.FIRSTNAME} ${data.voter.LASTNAME}`}
        </BootstrapDialogTitle>
        <p className="text-muted mx-3">{`${data?.voter.ADDRESS} `}</p>

        <DialogContent dividers>
          <div
            style={{
              backgroundColor: "#F2F2F2",
              minHeight: "200px",
              height: "auto",
              borderRadius: "12px",
            }}
            className="p-3"
          >
            <Typography gutterBottom>{data?.surveyQuestion}</Typography>
          </div>
          <br />
          <div>
            <p className="text-danger text-center">
              <strong>{data?.surveyPreview}</strong>
            </p>
            <div className="d-flex justify-content-between">
              {data?.surveyAnswers?.map((ans) => {
                return (
                  <button
                    style={{
                      width: "175px",
                      height: "50px",
                      borderRadius: "5px",
                      color: `${
                        voterAnswer.answer === ans ? "#D12E2F" : "black"
                      }`,
                    }}
                    className="btn shadow-sm p-3 m-2 text-center"
                    onClick={() =>
                      setVoterAnswer({ ...voterAnswer, answer: ans })
                    }
                  >
                    {ans}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="text-center">
            {" "}
            <button
              className="btn"
              style={{
                backgroundColor: "#D12E2F",
                width: "388px",
                height: "49px",
                color: "#FFFFFF",
              }}
              disabled={voterAnswer.answer?.length > 0 && false}
              onClick={voterAnswer.answer?.length > 0 && handleVoterAnswer}
            >
              Save Answer
            </button>
          </div>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleOpen}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </div>
  );
}
