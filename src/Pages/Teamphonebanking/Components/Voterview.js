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
  getAdminTags,
} from "../../../Connection/Team";
import {
  takeSurvey,
  doNotCall,
  saveInteraction,
  wrongNumber,
} from "../../../Connection/Survey";
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
import Tags from "./Tags";
import Addtoteam from "./VoterviewComponents/Addtoteam";
import Emailtovoter from "./VoterviewComponents/Emailtovoter";
import Updatevoter from "./VoterviewComponents/Updatevoter";
import Nextvoter from "./VoterviewComponents/Nextvoter";
import Wrongnumber from "./VoterviewComponents/Wrongnumber";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Voterview({ data, handleUpdateTable }) {
  console.log(data, "i am voterdata");
  const [open, setOpen] = React.useState(false);
  const [openNextVoter, setOpenNextVoter] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [tags, setTags] = React.useState();
  const [adminTags, setAdminTags] = React.useState();
  const [voters, setVoters] = React.useState([]);
  const [script, setScript] = React.useState();
  const [checked, setChecked] = React.useState([]);
  const [checkedTags, setCheckedTags] = React.useState([]);
  const [currentVoter, setCurrentVoter] = React.useState();
  const [currentVoterIndex, setCurrentVoterIndex] = React.useState();
  const [survey, setSurvey] = React.useState();
  const [surveyQuestion, setSurveyQuestion] = React.useState();
  const [answeredSurveys, setAnsweredSurveys] = React.useState([]);
  const [openSurveyQuestion, setOpenSurveyQuestion] = React.useState(false);
  const [openWrongNumber, setOpenWrongNumber] = React.useState(false);
  const [view, setView] = React.useState("voter");
  const [values, setValues] = React.useState({
    campaignId: window.localStorage.getItem("id"),
    campaignName: undefined,
    voterId: currentVoter?._id,
    voterName: currentVoter?.FIRSTNAME,
    surveyData: [],
    voterAnswers: [],
    recordType: "phonebanking",
    geoLocation: "",
    date: new Date(),
    time: new Date(),
    subUserId: window.localStorage.getItem("userId"),
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
    interaction: "",
  });
  const [doNotCallSelected, setDoNotCallSelected] = React.useState(false);
  const [contactLaterSelected, setContactLaterSelected] = React.useState(false);
  const [update, setUpdate] = React.useState(false);

  console.log(values, answeredSurveys);

  const handleClickOpen = () => {
    setOpen(true);
    handleGetData();
  };

  const handleClose = () => {
    setOpen(false);
    // handleUpdateTable();
  };

  const hanldeOpenWrongNumber = () => {
    setOpenWrongNumber(!openWrongNumber);
  };
  const handleOpenNextVoter = () => {
    setOpenNextVoter(!openNextVoter);
  };

  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value.tagId);
  //   const newChecked = [...checked];
  //   const newCheckedTags = [...checkedTags];

  //   if (currentIndex === -1) {
  //     newChecked.push(value.tagId);
  //     newCheckedTags.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //     newCheckedTags.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  //   setCheckedTags(newCheckedTags);
  // };

  const handleTags = (data) => {
    console.log(data);
    setChecked(data);
    setCheckedTags(data);
  };

  const handleGetData = async () => {
    const res = await getList({ id: data?.list });
    console.log(res);
    if (res.data.success) {
      let unSurveyedVoters = res.data.list?.voters.filter((voter) => {
        // return !voter.surveyed || voter.surveyed === false;
        return !voter.voterDone;
      });
      console.log(unSurveyedVoters.length);
      if (unSurveyedVoters.length > 0) {
        setVoters(unSurveyedVoters);
        setCurrentVoter(unSurveyedVoters[0]);
        setCurrentVoterIndex(0);
      } else {
        handleClose();
        toast.success("This list is completed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
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
      id: window.localStorage.getItem("id"),
    });
    console.log(res3);
    if (res3.data.success) {
      setTags(res3.data.tags);
    } else {
      toast.error(res3.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    const res4 = await getAdminTags();
    console.log(res4);
    if (res4.data.success) {
      setAdminTags(res4.data.tags);
    } else {
      toast.error(res4.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    setUpdate(false);
  };

  const handleUpdate = async () => {
    // const res3 = await getTags({
    //   id: window.localStorage.getItem("id"),
    // });
    // console.log(res3);
    // if (res3.data.success) {
    //   setTags(res3.data.tags);
    // } else {
    //   toast.error(res3.data.message, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    // }
    setUpdate(true);
  };

  const handleGetSurvey = async () => {
    if (view !== "survey") {
      const res3 = await getSurvey({
        id: window.localStorage.getItem("id"),
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
    } else {
      setView("voter");
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
    let isAnsweredBefore = values.voterAnswers.some(
      (ans) => ans.surveyId === surveyId
    );
    console.log(isAnsweredBefore);
    let surveyIdExist = answeredSurveys.some(
      (surveyid) => surveyid === surveyId
    );
    if (isAnsweredBefore) {
      let oldAns = values.voterAnswers.filter(
        (ans) => ans.surveyId !== surveyId
      );
      let isSurveyDataExist = values.surveyData.some(
        (subSurvey) => subSurvey.surveyId === surveyId
      );
      console.log(isSurveyDataExist, "i am");
      let oldSurveyData = values.surveyData.filter(
        (subSurvey) => subSurvey.surveyId !== surveyId
      );
      console.log(oldSurveyData, "i am");

      if (data.answer.length === 0) {
        setValues({
          ...values,
          voterAnswers: [...oldAns, ...(data.answer?.length > 0 ? [data] : [])],
          surveyData: [...oldSurveyData],
          tags: checkedTags,
          voterId: currentVoter?._id,
          voterName: currentVoter?.FIRSTNAME,
        });
      } else {
        setValues({
          ...values,
          voterAnswers: [...oldAns, ...(data.answer?.length > 0 ? [data] : [])],
          surveyData: [...values.surveyData],
          tags: checkedTags,
          voterId: currentVoter?._id,
          voterName: currentVoter?.FIRSTNAME,
        });
      }
    } else {
      setValues({
        ...values,
        voterAnswers: [...values.voterAnswers, data],
        surveyData: [...values.surveyData, { surveyId: surveyId }],
        tags: checkedTags,
        voterId: currentVoter?._id,
        voterName: currentVoter?.FIRSTNAME,
      });
    }

    if (surveyIdExist === false) {
      setAnsweredSurveys([...answeredSurveys, surveyId]);
    }
    if (data.answer?.length === 0) {
      let filteredSureyAns = answeredSurveys.filter((ans) => ans !== surveyId);
      setAnsweredSurveys(filteredSureyAns);
    }
  };
  console.log(checkedTags);

  const handleTakeSurvey = async () => {
    console.log(values, currentVoter);
    // if (checkedTags.length === 0) {
    //   toast.error("Check Atleast one Tag", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    //   return;
    // }
    setSaving(true);
    // console.table(currentVoter);
    // console.log(values);

    const res = await takeSurvey({
      ...values,
      tags: checkedTags,
      voterId: currentVoter?._id,
      voterName: currentVoter?.FIRSTNAME,
      list: data?.list,
      recordId: data?._id,
      totalNumbers: data?.totalNumbers,
      campaignName: window.localStorage.getItem("campaignName")
        ? window.localStorage.getItem("campaignName")
        : "unknown",
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
        campaignId: window.localStorage.getItem("id"),
        campaignName: undefined,
        voterId: currentVoter?._id,
        voterName: currentVoter?.FIRSTNAME,
        surveyData: [],
        voterAnswers: [],
        recordType: "phonebanking",
        geoLocation: "",
        date: new Date(),
        time: new Date(),
        subUserId: window.localStorage.getItem("userId"),
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
      setAnsweredSurveys([]);
      // if (currentVoterIndex < voters?.length - 1) {
      //   //   handleNextVoter();
      //   // } else {
      //   handleClose();
      //   toast.success("This was the last voter", {
      //     position: toast.POSITION.TOP_RIGHT,
      //   });
      // }
      setCurrentVoterIndex(currentVoterIndex + 1);
      setCurrentVoter(voters[currentVoterIndex + 1]);
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleNextVoterCheck = (interactionData) => {
    console.log(interactionData);
    // if (values.voterAnswers?.length > 0) {
    //   toast.error("You havn't saved the survey", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    //   return;
    // } else {
    setValues({
      ...values,
      interaction: interactionData,
    });
    handleNextVoter(interactionData);
    // }
  };

  const handleNextVoter = async (interaction) => {
    console.log(currentVoterIndex, voters.length);

    if (currentVoterIndex < voters?.length - 1) {
      let res = await saveInteraction({
        interaction: interaction,
        listId: data?.list,
        voterId: currentVoter?._id,
      });
      if (res.data.success === true) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

        // if (interaction === "doNotCall") {
        //   handleDoNotCall();
        // }

        if (values.voterAnswers?.length > 0) {
          handleTakeSurvey();
        } else {
          setCurrentVoterIndex(currentVoterIndex + 1);
          setCurrentVoter(voters[currentVoterIndex + 1]);
          setCheckedTags([]);
        }
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      let res = await saveInteraction({ interaction: interaction });
      if (res.data.success === true) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

        // if (interaction === "doNotCall") {
        //   handleDoNotCall();
        // }
        if (values.voterAnswers?.length > 0) {
          handleTakeSurvey();
        }
        handleClose();
        toast.success("This was the last voter", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        // handleClose();
        // toast.success("This was the last voter", {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      }

      // handleUpdateTable();
    }
  };

  const handleContactLater = () => {
    // if (values.voterAnswers?.length > 0) {
    //   toast.error("You havn't saved the survey", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    //   return;
    // } else {
    // toast.success("You can proceed with next voter", {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
    // handleNextVoterCheck("Contact Later");
    // }
    setContactLaterSelected(true);
    handleOpenNextVoter();
  };

  const handleDoNotCallSelect = async () => {
    setDoNotCallSelected(true);
    handleOpenNextVoter();
  };

  const handleUnSelectChoosedOption = async () => {
    setDoNotCallSelected(false);
    setContactLaterSelected(false);
  };

  const handleDoNotCall = async () => {
    let res = await doNotCall({
      listId: data?.list,
      voterId: currentVoter?._id,
      recordId: data?._id,
    });
    console.log(res);
    if (res.data.success) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleWrongNumber = async (numbers) => {
    console.log(numbers);
    let res = await wrongNumber({
      listId: data?.list,
      voterId: currentVoter?._id,
      wrongNumbers: numbers,
    });
    if (res.data.success) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  React.useEffect(() => {
    open === true && handleGetData();
  }, [update === true]);

  return (
    <div>
      {console.log(values, answeredSurveys)}
      <button
        style={{
          border: "1px solid #D9D9D9",
          borderRadius: "5px",
          height: "76px",
        }}
        className="btn w-100 d-flex justify-content-between shadow-sm "
        onClick={handleClickOpen}
      >
        <div className="text-left w-50 mt-2">
          {/* <Voterview handleUpdateTable={handleUpdate} data={list} /> */}
          <p className=" btn text-danger ml-1 mt-1">{data.recordName}</p>
        </div>

        <div className="mt-4  w-50 text-center d-flex justify-content-center">
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: `${
                data?.active === "Active" ? "#49C661" : "grey"
              }`,
              color: "green",
              borderRadius: "50%",
              className: "",
            }}
          ></div>
        </div>
      </button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {/* <AppBar
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
           
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar> */}
        <div>
          <div className=" container">
            <Header name="Phone Bank" purpose=" " />
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
                      {data.recordName}
                    </p>

                    {/* <ButtonMailto
                      label="Write me an E-Mail"
                      mailto="mailto:no-reply@example.com"
                    /> */}
                    <div
                      style={{
                        width: "100%",
                        height: "auto",
                        minHeight: "300px",
                        backgroundColor: "#F6F6F6",
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
                            <strong>Script</strong>
                          </p>
                          <div>
                            <Element
                              className="element"
                              id="scroll-container"
                              style={{
                                position: "relative",
                                height: "420px",
                                overflowY: "scroll",
                                //   marginBottom: "100px",
                              }}
                            >
                              <Element
                                //   name="scroll-container-first-element"
                                style={{
                                  marginBottom: "200px",
                                }}
                              >
                                <p style={{ whiteSpace: "pre-wrap" }}>
                                  {script.script}
                                </p>
                              </Element>
                            </Element>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="d-flex">
                        {/* <button
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "#D9D9D9",
                          }}
                          className="btn w-50 p-2 m-1 text-center"
                          // onClick={handleWrongNumber}
                        >
                          Wrong Number
                        </button> */}
                        {openWrongNumber && (
                          <Wrongnumber
                            handleWrongNumber={handleWrongNumber}
                            data={[
                              currentVoter?.MOBILE_NUM ?? "",
                              currentVoter?.PHONE_NUM ?? "",
                            ]}
                            handleOpen={hanldeOpenWrongNumber}
                            open={openWrongNumber}
                          />
                        )}

                        <button
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "#D9D9D9",
                          }}
                          className="btn w-50 p-2 m-1  text-center"
                          // onClick={handleWrongNumber}
                          onClick={hanldeOpenWrongNumber}
                        >
                          Wrong Number
                        </button>
                        <button
                          style={{
                            borderRadius: "8px",
                            backgroundColor: `${
                              view === "survey" ? "#FF914D" : "#D9D9D9"
                            }`,
                            color: `${view === "survey" ? "#FFFFFF" : "black"}`,
                          }}
                          className="btn w-50 p-2 m-1  text-center"
                          onClick={handleGetSurvey}
                        >
                          Survey
                        </button>
                      </div>
                      <div className="d-flex">
                        <button
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "#D9D9D9",
                          }}
                          className="btn w-50 p-2 m-1 text-center"
                          onClick={handleContactLater}
                        >
                          Contact Later
                        </button>
                        <button
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "#D9D9D9",
                          }}
                          className="btn w-50 p-2 m-1 text-center"
                          onClick={handleDoNotCallSelect}
                        >
                          Do Not Call
                        </button>
                      </div>
                      <div>
                        {/* <button
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "#FF914D",
                            color: "white",
                          }}
                          className="btn w-100 p-2 m-1  text-center"
                          onClick={handleNextVoterCheck}
                        >
                          Next Voter
                        </button> */}
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
                        {saving === false && (
                          <div>
                            {/* {(openNextVoter === true ||
                              contactLaterSelected === true ||
                              doNotCallSelected === true) && ( */}
                            <Nextvoter
                              open={openNextVoter}
                              handleOpen={handleOpenNextVoter}
                              handleNextVoter={handleNextVoterCheck}
                              doNotCall={doNotCallSelected}
                              contactLater={contactLaterSelected}
                              handleUnSelectChoosedOption={
                                handleUnSelectChoosedOption
                              }
                            />
                            {/* )} */}
                          </div>
                        )}

                        {/* <div className="text-center">
                          {saving === true && (
                            <div
                              class="spinner-border text-danger text-center"
                              role="status"
                            >
                              <span class="sr-only">Loading...</span>
                            </div>
                          )}
                        </div> */}

                        {/* {values.voterAnswers?.length > 0 && saving === false && (
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
                        )} */}
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
                        style={{ minHeight: "734px", height: "auto" }}
                      >
                        <button
                          onClick={() => setView("voter")}
                          className="btn text-danger"
                        >
                          <i class="fas fa-angle-left mx-2"></i> Back
                        </button>
                        <p
                          style={{ fontSize: "24px" }}
                          className="text-danger text-center"
                        >
                          {" "}
                          <strong>Survey</strong>{" "}
                        </p>
                        <div className="row px-1">
                          {console.log(survey)}
                          {survey?.surveyQuestions?.map((value) => {
                            console.log(
                              values.surveyData?.includes(value?.surveyId)
                            );
                            if (value.active === true) {
                              return (
                                <button
                                  style={{
                                    width: "45%",
                                    height: "auto",
                                    minHeight: "222px",
                                    backgroundColor: `${
                                      answeredSurveys?.includes(value?.surveyId)
                                        ? "grey"
                                        : value.color.code
                                      // value.color.code
                                      //   ? value.color.code
                                      //   : "#FF914D"
                                    }`,
                                    borderRadius: "20px",
                                    color: "white",
                                    fontSize: "25px",
                                    overflowWrap: "break-word",
                                  }}
                                  className="btn p-2 text-center ml-2 d-flex justify-content-center align-items-center   mb-1"
                                  onClick={() => handleSurveyQuestion(value)}
                                >
                                  <p style={{ fontSize: "24px" }}>
                                    {" "}
                                    {value?.surveyPreview}
                                  </p>
                                </button>
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
                          style={{ minHeight: "155px", height: "auto" }}
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
                            <div>
                              <div className=" d-flex justify-content-center align-items-center mt-3">
                                {" "}
                                <Avatar
                                  sx={{
                                    bgcolor: "#FF914D",
                                    width: 60,
                                    height: 60,
                                  }}
                                  className="mr-2"
                                >
                                  {voters[currentVoterIndex]?.FIRSTNAME[0]}
                                </Avatar>
                                <p
                                  className="mr-4 mt-2"
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "25px",
                                  }}
                                >
                                  {voters[currentVoterIndex]?.FIRSTNAME +
                                    " " +
                                    voters[currentVoterIndex]?.LASTNAME}
                                </p>
                              </div>
                              <div className="d-flex justify-content-between mt-2">
                                <div
                                  style={{ color: "#D12E2F" }}
                                  className="text-center m-2 text-muted"
                                >
                                  <i
                                    style={{ fontSize: "25px" }}
                                    class="fas fa-comment"
                                  ></i>
                                  <br />{" "}
                                  <p style={{ fontSize: "12px" }}>Message</p>
                                </div>
                                <div
                                  style={{ color: "#D12E2F" }}
                                  className="text-center m-2 text-muted"
                                >
                                  <i
                                    style={{ fontSize: "25px" }}
                                    class="fas fa-phone-alt"
                                  ></i>
                                  <br />{" "}
                                  <p style={{ fontSize: "12px" }}>Phone</p>
                                </div>
                                {/* <div
                                  style={{ color: "#D12E2F" }}
                                  className="text-center mx-2"
                                  onClick = {handleAddToTeam}
                                >
                                  <i
                                    style={{ fontSize: "25px" }}
                                    class="fas fa-user-plus"
                                  ></i>
                                  <br />{" "}
                                  <p style={{ fontSize: "12px" }}>
                                    Add to Team
                                  </p>
                                </div> */}
                                <Addtoteam data={currentVoter?.EMAIL} />
                                {/* <div
                                  style={{ color: "#D12E2F" }}
                                  className="text-center mx-2"
                                >
                                  <i
                                    style={{ fontSize: "25px" }}
                                    class="fas fa-envelope"
                                  ></i>
                                  <br />{" "}
                                  <p style={{ fontSize: "12px" }}>Email</p>
                                </div> */}
                                <Emailtovoter
                                  data={`mailto:${currentVoter?.EMAIL}`}
                                  emails={{
                                    email1: currentVoter?.EMAIL,
                                    email2: currentVoter?.EMAIL2,
                                  }}
                                />
                                {/* <div
                                  style={{ color: "#D12E2F" }}
                                  className="text-center mx-2"
                                >
                                  <i
                                    style={{ fontSize: "25px" }}
                                    class="fas fa-ellipsis-h"
                                  ></i>
                                  <br />{" "}
                                  <p style={{ fontSize: "12px" }}>Update</p>
                                </div> */}
                                <Updatevoter
                                  data={currentVoter}
                                  listId={data?.list}
                                  handleUpdate={handleGetData}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <div style={{ height: "auto" }} className="p-3">
                          <div className=" d-flex">
                            <p
                              style={{ fontWeight: "bold" }}
                              className="text-danger"
                            >
                              Last Contacted
                            </p>
                            <p
                              className=" text-muted"
                              style={{ fontWeight: "bold" }}
                            >
                              :{" "}
                              {voters[currentVoterIndex]?.lastInfluenced
                                ? voters[
                                    currentVoterIndex
                                  ]?.lastInfluenced.split("T")[0]
                                : " Not Contacted Yet"}
                            </p>
                          </div>

                          {/* {(voters[currentVoterIndex]?.voterTags?.length ===
                            0 ||
                            voters[currentVoterIndex]?.voterTags?.length ===
                              undefined) && (
                            <div className="d-flex">
                              {tags && (
                                <Tags
                                  handleUpdate={handleUpdate}
                                  handleTags={handleTags}
                                  tags={tags}
                                  adminTags={adminTags}
                                />
                              )}
                            </div>
                          )} */}
                          <div>
                            <p
                              style={{ fontSize: "15px" }}
                              className="text-danger"
                            >
                              <strong>Tags</strong>
                            </p>
                            <div className="d-flex">
                              {checkedTags?.length > 0 && (
                                <div className="row px-2">
                                  {checkedTags?.map((tag) => {
                                    return (
                                      <div className="text-center mb-1">
                                        <Tag value={tag} />
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                              {tags && (
                                <Tags
                                  handleUpdate={handleUpdate}
                                  handleTags={handleTags}
                                  tags={tags}
                                  adminTags={adminTags}
                                />
                              )}
                            </div>
                          </div>
                          <br />
                          {/* <div className="">
                            <p
                              style={{ fontSize: "15px" }}
                              className="text-danger"
                            >
                              <strong>Applied Tags</strong>
                            </p>
                            {voters[currentVoterIndex]?.voterTags?.length >
                              0 && (
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
                          </div> */}

                          <br />
                          <div className="d-flex">
                            <h5 className="text-muted">
                              {" "}
                              <strong> Phone Number</strong>
                            </h5>
                            <h5 className="text-muted">
                              <strong>
                                : {voters[currentVoterIndex]?.PHONE_NUM}
                              </strong>
                            </h5>
                          </div>
                          <div className="d-flex">
                            <h5 className="text-muted">
                              {" "}
                              <strong>Cell Number</strong>
                            </h5>
                            <h5 className="text-muted">
                              <strong>
                                : {voters[currentVoterIndex]?.MOBILE_NUM}
                              </strong>
                            </h5>
                          </div>

                          <br />
                          <br />
                          <p
                            style={{ fontSize: "15px" }}
                            className="text-danger"
                          >
                            <strong>Address</strong>
                          </p>
                          <div className="d-flex">
                            <p
                              style={{ fontSize: "19px" }}
                              className="text-muted mr-1"
                            >
                              {voters[currentVoterIndex]?.CITY},
                            </p>
                            <p
                              style={{ fontSize: "19px" }}
                              className="text-muted mr-2"
                            >
                              {voters[currentVoterIndex]?.STATE}
                            </p>
                          </div>

                          <p
                            style={{ fontSize: "15px" }}
                            className="text-danger"
                          >
                            <strong>Demographics</strong>
                          </p>
                          <div className="d-flex justify-content-between text-muted text-center ">
                            <p
                              style={{
                                // borderRight: "1px solid #707070",
                                fontSize: "19px",
                              }}
                            >
                              {voters[currentVoterIndex]?.SEX === "M"
                                ? "Male"
                                : "Female"}
                            </p>

                            <p>|</p>
                            <p
                              style={{
                                // borderRight: "1px solid #707070",
                                fontSize: "19px",
                              }}
                              className="text-center"
                            >
                              {voters[currentVoterIndex]?.AGE} Years Old
                            </p>
                            <p>|</p>
                            {voters[currentVoterIndex]?.PARTY_CODE === "A" && (
                              <p style={{ fontSize: "19px" }} align="">
                                American Independent
                              </p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "B" && (
                              <p style={{ fontSize: "19px" }} align="">
                                Constitution Party
                              </p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "C" && (
                              <p style={{ fontSize: "19px" }} align="">
                                Consumer
                              </p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "D" && (
                              <p style={{ fontSize: "19px" }} align="">
                                Democrat
                              </p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "E" && (
                              <p style={{ fontSize: "19px" }} align="">
                                Inferred Democrat
                              </p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "F" && (
                              <p style={{ fontSize: "19px" }} align="">
                                Reform{" "}
                              </p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "G" && (
                              <p style={{ fontSize: "19px" }} align="">
                                Green
                              </p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "H" && (
                              <p style={{ fontSize: "19px" }} align="">
                                Liberal
                              </p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "I" && (
                              <p style={{ fontSize: "19px" }} align="">
                                Independent
                              </p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "J" && (
                              <p style={{ fontSize: "19px" }} align="">
                                UMOJA
                              </p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "K" && (
                              <p style={{ fontSize: "19px" }} align="">
                                Independent NM Party
                              </p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "L" && (
                              <p style={{ fontSize: "19px" }} align="">
                                {" "}
                                Libertarian
                              </p>
                            )}

                            {voters[currentVoterIndex]?.PARTY_CODE === "N" && (
                              <p style={{ fontSize: "19px" }} align="">
                                {" "}
                                No Party
                              </p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "O" && (
                              <p style={{ fontSize: "19px" }} align="">
                                {" "}
                                Other
                              </p>
                            )}
                            {voters[currentVoterIndex]?.PARTY_CODE === "P" && (
                              <p style={{ fontSize: "19px" }} align="">
                                {" "}
                                Peace and Freedom
                              </p>
                            )}

                            {voters[currentVoterIndex]?.PARTY_CODE === "R" && (
                              <p style={{ fontSize: "19px" }} align="">
                                {" "}
                                Republican
                              </p>
                            )}

                            {voters[currentVoterIndex]?.PARTY_CODE === "S" && (
                              <p style={{ fontSize: "19px" }} align="">
                                {" "}
                                Inferred Republican
                              </p>
                            )}

                            {voters[currentVoterIndex]?.PARTY_CODE === "T" && (
                              <p style={{ fontSize: "19px" }} align="">
                                {" "}
                                to Life
                              </p>
                            )}

                            {voters[currentVoterIndex]?.PARTY_CODE === "U" && (
                              <p style={{ fontSize: "19px" }} align="">
                                {" "}
                                Unknown
                              </p>
                            )}

                            {voters[currentVoterIndex]?.PARTY_CODE === "V" && (
                              <p style={{ fontSize: "19px" }} align="">
                                {" "}
                                Conservative
                              </p>
                            )}

                            {voters[currentVoterIndex]?.PARTY_CODE === "W" && (
                              <p style={{ fontSize: "19px" }} align="">
                                {" "}
                                Natural Law
                              </p>
                            )}

                            {voters[currentVoterIndex]?.PARTY_CODE === "Z" && (
                              <p style={{ fontSize: "19px" }} align="">
                                {" "}
                                Independance
                              </p>
                            )}

                            {voters[currentVoterIndex]?.PARTY_CODE ===
                              undefined ||
                              null ||
                              ("" && (
                                <p style={{ fontSize: "19px" }} align=""></p>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-3 p-3">
                  <h5 className="my-2 text-danger ">Profiled Information</h5>
                  <hr />
                  <div>
                    <div>
                      <Element
                        className="element"
                        id="scroll-container"
                        style={{
                          position: "relative",
                          height: "570px",
                          // height: "auto",
                          overflowY: "scroll",
                          //   marginBottom: "100px",
                        }}
                      >
                        <Element
                          //   name="scroll-container-first-element"
                          style={{
                            marginBottom: "200px",
                          }}
                        >
                          <div>
                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_2NDAMEND &&
                                voters[currentVoterIndex]?.PRFL_2NDAMEND === "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_2NDAMEND ===
                                "Y"
                                  ? "2nd Amendment Supporter"
                                  : ""}
                              </p>
                              <hr />
                            </div>
                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_ACTIVE &&
                                voters[currentVoterIndex]?.PRFL_ACTIVE === "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_ACTIVE === "Y"
                                  ? "Active Military"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_AMZN_PRIME &&
                                voters[currentVoterIndex]?.PRFL_AMZN_PRIME ===
                                  "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_AMZN_PRIME ===
                                "Y"
                                  ? "Amazon Prime Subscriber"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_ANML_RIGHTS &&
                                voters[currentVoterIndex]?.PRFL_ANML_RIGHTS ===
                                  "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_ANML_RIGHTS ===
                                "Y"
                                  ? "Animal Rights Supporter"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_BIDEN_SUPPORT &&
                                voters[currentVoterIndex]
                                  ?.PRFL_BIDEN_SUPPORT === "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]
                                  ?.PRFL_BIDEN_SUPPORT === "Y"
                                  ? "Likely Biden Supporter"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_BLM_SUPPORT &&
                                voters[currentVoterIndex]?.PRFL_BLM_SUPPORT ===
                                  "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_BLM_SUPPORT ===
                                "Y"
                                  ? "Likely Black Lives Matter Supporter"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]
                                  ?.PRFL_BORDER_SECURITY &&
                                voters[currentVoterIndex]
                                  ?.PRFL_BORDER_SECURITY === "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]
                                  ?.PRFL_BORDER_SECURITY === "Y"
                                  ? " Interest in Border Security"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_CHOICELIFE &&
                                voters[currentVoterIndex]?.PRFL_CHOICELIFE ===
                                  "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_CHOICELIFE ===
                                "Y"
                                  ? " Pro Life"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]
                                  ?.PRFL_CLINTON_SUPPORT &&
                                voters[currentVoterIndex]
                                  ?.PRFL_CLINTON_SUPPORT === "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]
                                  ?.PRFL_CLINTON_SUPPORT === "Y"
                                  ? " Likely Hillary Clinton Supporter"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]
                                  ?.PRFL_CONSERVATIVE_NEWS &&
                                voters[currentVoterIndex]
                                  ?.PRFL_CONSERVATIVE_NEWS === "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]
                                  ?.PRFL_CONSERVATIVE_NEWS === "Y"
                                  ? " Likely to watch Conservative News Outlets"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_EDUCATION &&
                                voters[currentVoterIndex]?.PRFL_EDUCATION ===
                                  "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_EDUCATION ===
                                "Y"
                                  ? "Interest in Education Issues"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_ENVIRONMENT &&
                                voters[currentVoterIndex]?.PRFL_ENVIRONMENT ===
                                  "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_ENVIRONMENT ===
                                "Y"
                                  ? "Environmentalist"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_EVANGELICAL &&
                                voters[currentVoterIndex]?.PRFL_EVANGELICAL ===
                                  "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_EVANGELICAL ===
                                "Y"
                                  ? " Evangelical"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_FENCE_SITTER &&
                                voters[currentVoterIndex]?.PRFL_FENCE_SITTER ===
                                  "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]
                                  ?.PRFL_FENCE_SITTER === "Y"
                                  ? "Likely Fence Sitter"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_GUN_CONTROL &&
                                voters[currentVoterIndex]?.PRFL_GUN_CONTROL ===
                                  "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_GUN_CONTROL ===
                                "Y"
                                  ? "Gun Control Supporter"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]
                                  ?.PRFL_HEALTHCARE_REFORM &&
                                voters[currentVoterIndex]
                                  ?.PRFL_HEALTHCARE_REFORM.length > 0
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]
                                  ?.PRFL_HEALTHCARE_REFORM === "Y"
                                  ? " Healthcare Reform Supporter"
                                  : ""}
                                {voters[currentVoterIndex]
                                  ?.PRFL_HEALTHCARE_REFORM === "N"
                                  ? "Against Healthcare Reform"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_HEALTHCARE &&
                                voters[currentVoterIndex]?.PRFL_HEALTHCARE ===
                                  "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_HEALTHCARE ===
                                "Y"
                                  ? "Healthcare Professional"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]
                                  ?.PRFL_IMMIGRATION_REFORM &&
                                voters[currentVoterIndex]
                                  ?.PRFL_IMMIGRATION_REFORM === "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]
                                  ?.PRFL_IMMIGRATION_REFORM === "Y"
                                  ? "Interested in Immigration Reform"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_INFLUENCER &&
                                voters[currentVoterIndex]?.PRFL_INFLUENCER ===
                                  "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_INFLUENCER ===
                                "Y"
                                  ? "Voter Is An Influencer"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_INSURANCE &&
                                voters[currentVoterIndex]?.PRFL_INSURANCE ===
                                  "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_INSURANCE ===
                                "Y"
                                  ? "Likely To Have Workplace Insurance"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_LABOR &&
                                voters[currentVoterIndex]?.PRFL_LABOR === "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_LABOR === "Y"
                                  ? "Organized Labor Supporter"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_LGBT_SUPPORT &&
                                voters[currentVoterIndex]?.PRFL_LGBT_SUPPORT > 0
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]
                                  ?.PRFL_LGBT_SUPPORT === 1
                                  ? "LGBT Donor"
                                  : ""}
                                {voters[currentVoterIndex]
                                  ?.PRFL_LGBT_SUPPORT === 2
                                  ? "LGBT Supporter"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_LIBERAL_NEWS &&
                                voters[currentVoterIndex]?.PRFL_LIBERAL_NEWS ===
                                  "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]
                                  ?.PRFL_LIBERAL_NEWS === "Y"
                                  ? "Likely to Watch Liberal News Outlets"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]
                                  ?.PRFL_MARIJUANA_REFORM &&
                                voters[currentVoterIndex]
                                  ?.PRFL_MARIJUANA_REFORM === "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]
                                  ?.PRFL_MARIJUANA_REFORM === "Y"
                                  ? "Marijuana Policy Reform Supporter"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]
                                  ?.PRFL_MARRIAGE_EQUALITY &&
                                voters[currentVoterIndex]
                                  ?.PRFL_MARRIAGE_EQUALITY > 0
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]
                                  ?.PRFL_MARRIAGE_EQUALITY === 1
                                  ? "Supports Marriage Equality"
                                  : ""}
                                {voters[currentVoterIndex]
                                  ?.PRFL_MARRIAGE_EQUALITY === 2
                                  ? "Opposes Marriage Equality"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_METOO_SUPPORT &&
                                voters[currentVoterIndex]
                                  ?.PRFL_METOO_SUPPORT === "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]
                                  ?.PRFL_METOO_SUPPORT === "Y"
                                  ? "Likely to Support the MeToo Movement"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_MIL_SUPPORT &&
                                voters[currentVoterIndex]?.PRFL_MIL_SUPPORT ===
                                  "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_MIL_SUPPORT ===
                                "Y"
                                  ? " Military Supporter"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_MINWAGE &&
                                voters[currentVoterIndex]?.PRFL_MINWAGE > 0
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_MINWAGE === 1
                                  ? "Likely to Support Minimum Wage Increase"
                                  : ""}
                                {voters[currentVoterIndex]?.PRFL_MINWAGE === 2
                                  ? "Likely to Oppose Minimum Wage Increase"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_OBAMA &&
                                voters[currentVoterIndex]?.PRFL_OBAMA === "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_OBAMA === "Y"
                                  ? " Likely Obama"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]
                                  ?.PRFL_PERSUADABLE_VOTER &&
                                voters[currentVoterIndex]
                                  ?.PRFL_PERSUADABLE_VOTER === "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]
                                  ?.PRFL_PERSUADABLE_VOTER === "Y"
                                  ? "Persuadable/Swing Voter"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]
                                  ?.PRFL_POLITICAL_IDEOLOGY &&
                                voters[currentVoterIndex]
                                  ?.PRFL_POLITICAL_IDEOLOGY.length > 0
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]
                                  ?.PRFL_POLITICAL_IDEOLOGY === "C"
                                  ? " Conservative"
                                  : ""}
                                {voters[currentVoterIndex]
                                  ?.PRFL_POLITICAL_IDEOLOGY === "M"
                                  ? " Moderate"
                                  : ""}
                                {voters[currentVoterIndex]
                                  ?.PRFL_POLITICAL_IDEOLOGY === "L"
                                  ? " Liberal"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]
                                  ?.PRFL_SANDERS_SUPPORT &&
                                voters[currentVoterIndex]
                                  ?.PRFL_SANDERS_SUPPORT === "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]
                                  ?.PRFL_SANDERS_SUPPORT === "Y"
                                  ? "Likely Sanders Supporter"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_TAXES &&
                                voters[currentVoterIndex]?.PRFL_TAXES === "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_TAXES === "Y"
                                  ? "Interested in Taxes and Tax Reform"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]
                                  ?.PRFL_TEACHERS_UNION &&
                                voters[currentVoterIndex]
                                  ?.PRFL_TEACHERS_UNION === "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]
                                  ?.PRFL_TEACHERS_UNION === "Y"
                                  ? "Likely Teachers Union Member"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_TEAPARTY &&
                                voters[currentVoterIndex]?.PRFL_TEAPARTY > 0
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_TEAPARTY === 1
                                  ? " Tea Party Donor"
                                  : ""}
                                {voters[currentVoterIndex]?.PRFL_TEAPARTY === 2
                                  ? "Likely Tea Party Supporter"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_TRUMP_SUPPORT &&
                                voters[currentVoterIndex]
                                  ?.PRFL_TRUMP_SUPPORT === "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]
                                  ?.PRFL_TRUMP_SUPPORT === "Y"
                                  ? "Likely Trump Supporter"
                                  : ""}
                              </p>
                              <hr />
                            </div>

                            <div
                              className={`my-2 ${
                                voters[currentVoterIndex]?.PRFL_VETERAN &&
                                voters[currentVoterIndex]?.PRFL_VETERAN === "Y"
                                  ? ""
                                  : "d-none"
                              }`}
                            >
                              <p>
                                {voters[currentVoterIndex]?.PRFL_VETERAN === "Y"
                                  ? "Veteran"
                                  : ""}
                              </p>
                              <hr />
                            </div>
                          </div>
                        </Element>
                      </Element>
                    </div>
                  </div>
                </div>
                {/* <div className="col-12 col-md-3">
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
                </div> */}
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
          surveyIds={values?.surveyData}
          takenSurveys={values.voterAnswers}
        />
      )}
    </div>
  );
}
