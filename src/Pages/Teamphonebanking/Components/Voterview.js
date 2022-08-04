import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Header from "../../../Components/Header";
import Avatar from "@mui/material/Avatar";
import Imagepicker from "../../../Components/Imagepicker";
import Tag from "../../../Components/Tag";
import {
  getList,
  getScript,
  getTags,
  getSurvey,
} from "../../../Connection/Team";
import { takeSurvey } from "../../../Connection/Survey";
import Logo from "../../../Assets/logoword.png";
import { ToastContainer, toast } from "react-toastify";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Addnewtag from "../../Tags/Components/Addtag";
import Surveyquestion from "./Surveyquestion";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Voterview({ data }) {
  console.log(data);
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [tags, setTags] = React.useState();
  const [voters, setVoters] = React.useState([]);
  const [script, setScript] = React.useState();
  const [checked, setChecked] = React.useState([]);
  const [checkedTags, setCheckedTags] = React.useState([]);
  const [currentVoter, setCurrentVoter] = React.useState();
  const [currentVoterIndex, setCurrentVoterIndex] = React.useState();
  const [survey, setSurvey] = React.useState();
  const [surveyQuestion, setSurveyQuestion] = React.useState();
  const [openSurveyQuestion, setOpenSurveyQuestion] = React.useState(false);
  const [view, setView] = React.useState("voter");
  const [values, setValues] = React.useState({
    campaignId: window.localStorage.getItem("selectedCampaignId"),
    campaignName: undefined,
    voterId: currentVoter?._id,
    voterName: currentVoter?.FIRSTNAME,
    surveyData: [],
    voterAnswers: [],
    recordType: "phonebanking",
    geoLocation: "",
    date: new Date(),
    time: new Date(),
    subUserId: window.localStorage.getItem("id"),
    subUserName: window.localStorage.getItem("username"),
    actions: {
      votersInfluenced: true,
      doorsKnocked: false,
      votersSurveyed: true,
      votersMessaged: false,
      phonesCalled: true,
    },
    contactedWay: "Phone Call",
    tags: checkedTags,
    list: data?.list,
    recordId: data?._id,
    totalNumbers: data?.totalNumbers,
  });

  const handleClickOpen = () => {
    setOpen(true);
    handleGetData();
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

  const handleGetData = async () => {
    const res = await getList({ id: data?.list });
    console.log(res);
    if (res.data.success) {
      setVoters(res.data.list?.voters);
      setCurrentVoter(res.data.list?.voters[0]);
      setCurrentVoterIndex(0);
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    const res2 = await getScript({ id: data?.scriptId });
    console.log(res2);
    if (res2.data.success) {
      setScript(res2.data.script);
    } else {
      toast.error(res2.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    const res3 = await getTags({
      id: window.localStorage.getItem("selectedCampaignId"),
    });
    console.log(res3);
    if (res3.data.success) {
      setTags(res3.data.tags);
    } else {
      toast.error(res3.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleUpdate = async () => {
    const res3 = await getTags({
      id: window.localStorage.getItem("selectedCampaignId"),
    });
    console.log(res3);
    if (res3.data.success) {
      setTags(res3.data.tags);
    } else {
      toast.error(res3.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleGetSurvey = async () => {
    const res3 = await getSurvey({
      id: window.localStorage.getItem("selectedCampaignId"),
    });
    console.log(res3);
    if (res3.data.success) {
      setSurvey(res3.data.survey);
      setView("survey");
    } else {
      toast.error(res3.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleOpenSurveyQuestion = () => {
    setOpenSurveyQuestion(!openSurveyQuestion);
  };
  const handleSurveyQuestion = (data) => {
    console.log(data);
    setSurveyQuestion({ ...data, voter: currentVoter });
    handleOpenSurveyQuestion();
  };

  const handleAnswer = (data, surveyId) => {
    console.log(data, surveyId);
    setValues({
      ...values,
      voterAnswers: [...values.voterAnswers, data],
      surveyData: [...values.surveyData, { surveyId: surveyId }],
      tags: checkedTags,
      voterId: currentVoter?._id,
      voterName: currentVoter?.FIRSTNAME,
    });
  };
  console.log(checkedTags);

  const handleTakeSurvey = async () => {
    console.log(values, currentVoter);
    if (checkedTags.length === 0) {
      toast.error("Check Atleast one Tag", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    setSaving(true);
    const res = await takeSurvey({
      ...values,
      tags: checkedTags,
      voterId: currentVoter?._id,
      voterName: currentVoter?.FIRSTNAME,
      list: data?.list,
      recordId: data?._id,
      totalNumbers: data?.totalNumbers,
    });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setChecked([]);
      setCheckedTags([]);
      setView("voter");
      setValues({
        campaignId: window.localStorage.getItem("selectedCampaignId"),
        campaignName: undefined,
        voterId: currentVoter?._id,
        voterName: currentVoter?.FIRSTNAME,
        surveyData: [],
        voterAnswers: [],
        recordType: "phonebanking",
        geoLocation: "",
        date: new Date(),
        time: new Date(),
        subUserId: window.localStorage.getItem("id"),
        subUserName: window.localStorage.getItem("username"),
        actions: {
          votersInfluenced: true,
          doorsKnocked: false,
          votersSurveyed: true,
          votersMessaged: false,
          phonesCalled: true,
        },
        contactedWay: "Phone Call",
        tags: checkedTags,
        recordId: data?._id,
        totalNumbers: data?.totalNumbers,
      });
      setSaving(false);
      handleNextVoter();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleNextVoter = () => {
    setCurrentVoterIndex(currentVoterIndex + 1);
    setCurrentVoter(voters[currentVoterIndex + 1]);
  };

  //   React.useEffect(() => {}, [open === true]);

  return (
    <div>
      <p onClick={handleClickOpen} className="text-danger">
        {data.recordName}
      </p>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          style={{ backgroundColor: "#FFFFFF" }}
          sx={{ position: "relative" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              //   color=""
              onClick={handleClose}
              aria-label="close"
              style={{ color: "black" }}
            >
              <CloseIcon />
            </IconButton>
            <img style={{ width: "90px" }} src={Logo} />
            {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography> */}
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <div className="mt-5 container">
            <Header
              name="Voter Record"
              purpose="Information for Voters - Tags"
            />
            <div
              className="shadow px-4 py-4"
              style={{
                backgroundColor: "#FFFFFF",
                height: "auto",
                borderRadius: "12px",
              }}
            >
              <button
                className="btn"
                style={{ color: "#d12e2f", marginLeft: "-20px" }}
                onClick={handleClose}
              >
                <i class="fas fa-angle-left mx-2"></i> Back
              </button>

              <div className="row mt-2">
                <div className="col-12 col-md-4 text-left">
                  <div>
                    <p
                      style={{
                        color: "#D12E2F",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      Preview
                    </p>
                    <div
                      style={{
                        width: "100%",
                        height: "auto",
                        minHeight: "150px",
                        backgroundColor: "#00000017",
                        borderRadius: "12px",
                      }}
                      className="p-2"
                    >
                      {!script && (
                        <div
                          class="spinner-border text-danger text-center"
                          role="status"
                        >
                          <span class="sr-only">Loading...</span>
                        </div>
                      )}
                      {script && (
                        <div>
                          {" "}
                          <p
                            style={{
                              color: "#D12E2F",
                            }}
                          >
                            Script Name : {script?.scriptName}
                          </p>
                          <div>
                            <p>{script.description}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="d-flex">
                        <button
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "#D9D9D9",
                          }}
                          className="btn w-50 p-2 m-1 text-center"
                        >
                          Wrong Number
                        </button>
                        <button
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "#D9D9D9",
                          }}
                          className="btn w-50 p-2 m-1  text-center"
                        >
                          Do Not Call
                        </button>
                      </div>
                      <div className="d-flex">
                        <button
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "#D9D9D9",
                          }}
                          className="btn w-50 p-2 m-1 text-center"
                        >
                          Contact Later
                        </button>
                        <button
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "#D9D9D9",
                          }}
                          className="btn w-50 p-2 m-1  text-center"
                          onClick={handleGetSurvey}
                        >
                          Survey
                        </button>
                      </div>
                      <div>
                        <button
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "#FF914D",
                            color: "white",
                          }}
                          className="btn w-100 p-2 m-1  text-center"
                          onClick={
                            currentVoterIndex < voters?.length - 1 &&
                            values.voterAnswers?.length === 0 &&
                            handleNextVoter
                          }
                        >
                          Next Voter
                        </button>
                        <div className="text-center">
                          {saving === true && (
                            <div
                              class="spinner-border text-danger text-center"
                              role="status"
                            >
                              <span class="sr-only">Loading...</span>
                            </div>
                          )}
                        </div>

                        {values.voterAnswers?.length > 0 && saving === false && (
                          <button
                            style={{
                              borderRadius: "8px",
                              backgroundColor: "#D12E2F",
                              color: "white",
                            }}
                            className="btn w-100 p-2 m-1  text-center"
                            onClick={
                              values.voterAnswers?.length > 0 &&
                              handleTakeSurvey
                            }
                          >
                            Save Survey Before Next Voter
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-5">
                  {console.log(currentVoter)}
                  <div className="shadow">
                    {view === "survey" && (
                      <div
                        className="p-3"
                        style={{ minHeight: "500px", height: "auto" }}
                      >
                        <button
                          onClick={() => setView("voter")}
                          className="btn text-danger"
                        >
                          X
                        </button>
                        <h5 className="text-danger text-center">Survey</h5>
                        <div className="row px-1">
                          {console.log(survey)}
                          {survey?.surveyQuestions?.map((value) => {
                            if (value.active === true) {
                              return (
                                <div
                                  style={{
                                    width: "45%",
                                    height: "auto",
                                    minHeight: "210px",
                                    backgroundColor: `${
                                      value.color.code
                                        ? value.color.code
                                        : "#FF914D"
                                    }`,
                                    borderRadius: "20px",
                                    color: "white",
                                    fontSize: "25px",
                                    overflowWrap: "break-word",
                                  }}
                                  className="p-2 text-center ml-2 d-flex justify-content-center align-items-center   mb-1"
                                  onClick={() => handleSurveyQuestion(value)}
                                >
                                  {value?.surveyPreview}
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    )}
                    {view === "voter" && (
                      <div>
                        <div
                          className="shadow-sm p-3  d-flex justify-content-center align-items-center"
                          style={{ height: "110px" }}
                        >
                          {!currentVoter && (
                            <div
                              class="spinner-border text-danger text-center"
                              role="status"
                            >
                              <span class="sr-only">Loading...</span>
                            </div>
                          )}
                          {currentVoter && (
                            <div className=" d-flex justify-content-center align-items-center">
                              {" "}
                              <Avatar
                                sx={{
                                  bgcolor: "#FF914D",
                                  width: 79,
                                  height: 79,
                                }}
                                className="mr-2"
                              >
                                {voters[currentVoterIndex]?.FIRSTNAME[0]}
                              </Avatar>
                              <h5
                                className="mr-4"
                                style={{ fontWeight: "bold", fontSize: "25px" }}
                              >
                                {voters[currentVoterIndex]?.FIRSTNAME +
                                  " " +
                                  voters[currentVoterIndex]?.LASTNAME}
                              </h5>
                            </div>
                          )}
                        </div>
                        <div style={{ height: "auto" }} className="p-3">
                          <p
                            style={{ fontWeight: "bold" }}
                            className="text-danger"
                          >
                            Last Contacted :
                            {data.lastInfluenced
                              ? data.lastInfluenced
                              : "Not Contacted Yet"}
                          </p>
                          {(voters[currentVoterIndex]?.voterTags?.length ===
                            0 ||
                            voters[currentVoterIndex]?.voterTags?.length ===
                              undefined) && (
                            <Tag value={{ tagName: "No Tags Found" }} />
                          )}
                          {voters[currentVoterIndex]?.voterTags?.length > 0 && (
                            <div className="row px-2">
                              {voters[currentVoterIndex]?.voterTags?.map(
                                (tag) => {
                                  return (
                                    <div className="text-center mb-1">
                                      <Tag value={tag} />
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          )}
                          <br />
                          <h5 className="text-muted">
                            {" "}
                            <strong>
                              {" "}
                              Phone Number :{" "}
                              {voters[currentVoterIndex]?.PHONE_NUM}
                            </strong>
                          </h5>
                          <h5 className="text-muted">
                            <strong>
                              Cell Number :{" "}
                              {voters[currentVoterIndex]?.MOBILE_NUM}
                            </strong>
                          </h5>

                          <br />
                          <br />
                          <p className="text-danger">Address</p>
                          <p className="text-muted">
                            {voters[currentVoterIndex]?.ADDRESS}
                          </p>

                          <p className="text-danger">Demographics</p>
                          <div className="d-flex justify-content-between text-muted text-center ">
                            <p
                              style={{ borderRight: "1px solid #707070" }}
                              className="pr-3"
                            >
                              {voters[currentVoterIndex]?.SEX === "M"
                                ? "Male"
                                : "Female"}
                            </p>
                            <p
                              style={{ borderRight: "1px solid #707070" }}
                              className="pr-3"
                            >
                              {voters[currentVoterIndex]?.AGE} Years Old
                            </p>
                            {voters[currentVoterIndex]?.PARTY_CODE === "A" && (
                              <p align="">American Independent</p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "B" && (
                              <p align="">Constitution Party</p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "C" && (
                              <p align="">Consumer</p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "D" && (
                              <p align="">Democrat</p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "E" && (
                              <p align="">Inferred Democrat</p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "F" && (
                              <p align="">Reform </p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "G" && (
                              <p align="">Green</p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "H" && (
                              <p align="">Liberal</p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "I" && (
                              <p align="">Independent</p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "J" && (
                              <p align="">UMOJA</p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "K" && (
                              <p align="">Independent NM Party</p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "L" && (
                              <p align=""> Libertarian</p>
                            )}

                            {voters[currentVoterIndex]?.PARTY_CODE === "N" && (
                              <p align="">
                                {" "}
                                None/Non-Partisan/No Party/No
                                Preference/Undeclared/Declined to
                                State/Undecided/Unaffiliated
                              </p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "O" && (
                              <p align=""> Other</p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "P" && (
                              <p align=""> Peace and Freedom</p>
                            )}

                            {voters[currentVoterIndex]?.PARTY_CODE === "R" && (
                              <p align=""> Republican</p>
                            )}

                            {voters[currentVoterIndex]?.PARTY_CODE === "S" && (
                              <p align=""> Inferred Republican</p>
                            )}

                            {voters[currentVoterIndex]?.PARTY_CODE === "T" && (
                              <p align=""> to Life</p>
                            )}

                            {voters[currentVoterIndex]?.PARTY_CODE === "U" && (
                              <p align=""> Unknown</p>
                            )}

                            {voters[currentVoterIndex]?.PARTY_CODE === "V" && (
                              <p align=""> Conservative</p>
                            )}

                            {voters[currentVoterIndex]?.PARTY_CODE === "W" && (
                              <p align=""> Natural Law</p>
                            )}

                            {voters[currentVoterIndex]?.PARTY_CODE === "Z" && (
                              <p align=""> Independance</p>
                            )}

                            {voters[currentVoterIndex]?.PARTY_CODE ===
                              undefined ||
                              null ||
                              ("" && <p align=""></p>)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-3">
                  <div className="text-center">
                    <h5 className="my-2 text-danger ">Campaign Tags</h5>

                    <Addnewtag
                      handleUpdate={handleUpdate}
                      campaignOwnerId={window.localStorage.getItem(
                        "selectedCampaignId"
                      )}
                    />
                  </div>
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
                        maxWidth: 360,
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
                                <IconButton edge="end" aria-label="comments">
                                  {/* <CommentIcon /> */}
                                </IconButton>
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
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                    </List>
                  )}
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
      </Dialog>
      {openSurveyQuestion && (
        <Surveyquestion
          data={surveyQuestion}
          handleOpen={handleOpenSurveyQuestion}
          open={openSurveyQuestion}
          handleAnswer={handleAnswer}
        />
      )}
    </div>
  );
}
