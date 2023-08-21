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
  takenSurveys,
}) {
  console.log(data, takenSurveys);

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
    console.log(voterAnswer, "i ran");
    handleAnswer(voterAnswer, data.surveyId);
    handleOpen();
  };

  const handleSelectAnswer = (ans) => {
    if (voterAnswer.answer === ans) {
      setVoterAnswer({
        ...voterAnswer,
        answer: "",
      });
    } else {
      setVoterAnswer({
        ...voterAnswer,
        answer: ans,
      });
    }
  };

  React.useEffect(() => {
    let currentQuestion = takenSurveys?.find(
      (sur) => sur.surveyId === data?.surveyId
    );
    console.log(currentQuestion);
    setVoterAnswer({
      ...voterAnswer,
      ...currentQuestion,
    });
  }, [takenSurveys]);
  return (
    <div className="p-0">
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={handleOpen}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="p-0"
      >
        <BootstrapDialogTitle onClose={handleOpen}>
          <div className=" text-center">
            <h3 className="">
              {" "}
              <strong>{`${data?.voter.FIRSTNAME} ${data.voter.LASTNAME}`}</strong>{" "}
            </h3>

            {/* <p className="text-muted mx-3">{`${data?.voter.ADDRESS} `}</p> */}
            <div className="text-center">
              <p
                style={{ fontSize: "19px" }}
                className="text-muted text-center m-0"
              >
                {data?.voter?.CITY}, {data?.voter?.STATE}
              </p>
              {/* <p style={{ fontSize: "19px" }} className="text-muted mr-2">
              
            </p> */}
            </div>
          </div>
        </BootstrapDialogTitle>

        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              backgroundColor: "#F2F2F2",
              minHeight: "200px",
              height: "auto",
              // borderRadius: "12px",
              borderRight: `8px ${data?.color?.code ?? "orange"} solid`,
              width: "100%",
            }}
            className="p-3 text-center"
          >
            <Typography gutterBottom>{data?.surveyQuestion}</Typography>
          </div>
          <p className="text-danger text-center">
            <strong>{data?.surveyPreview}</strong>
          </p>
          <br />
          <div>
            <div className="row">
              {data?.surveyAnswers?.map((ans) => {
                return (
                  <div className="col-6 text-center">
                    <button
                      style={{
                        minWidth: "175px",
                        minHeight: "50px",
                        width: "auto",
                        height: "auto",
                        borderRadius: "5px",
                        backgroundColor: `${
                          voterAnswer.answer === ans ? "#FF914D" : "white"
                        }`,
                        color: `${
                          voterAnswer.answer === ans ? "white" : "black"
                        }`,
                      }}
                      className="btn shadow p-2 m-2 text-center"
                      onClick={
                        // () =>
                        // setVoterAnswer({ ...voterAnswer, answer: ans })
                        () => handleSelectAnswer(ans)
                      }
                    >
                      {ans}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <br />
          <div className="text-center p-3">
            {" "}
            <button
              className="btn "
              style={{
                // backgroundColor: "#D12E2F",
                // backgroundColor: `${
                //   voterAnswer.answer?.length > 0 ? "#D12E2F" : "grey"
                // }`,
                backgroundColor: "#D12E2F",

                width: "388px",
                minHeight: "49px",
                height: "auto",
                color: "#FFFFFF",
              }}
              // disabled={voterAnswer.answer?.length > 0 && false}
              // onClick={voterAnswer.answer?.length > 0 && handleVoterAnswer}
              onClick={handleVoterAnswer}
            >
              Done
            </button>
          </div>
        </div>
        {/* <DialogActions>
          <Button autoFocus onClick={handleOpen}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </div>
  );
}
