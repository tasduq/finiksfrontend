import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Header from "../../../Components/Header";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

import Logo from "../../../Assets/logoword.png";

import Location from "./Createlist Components/Location";
import Age from "./Createlist Components/Age";
import Voterstatus from "./Createlist Components/Voterstatus";
import Legislativedistrict from "./Createlist Components/Legislativedistrict";
import Gender from "./Createlist Components/Gender";
import Race from "./Createlist Components/Race";
import Electionhistory from "./Createlist Components/Electionhistory";
import Language from "./Createlist Components/Language";
import Generalvotingscore from "./Createlist Components/Generalvotingscore";
import Primaryvotingscore from "./Createlist Components/Primaryvotingscore";
import Individualvotinginfo from "./Createlist Components/Individualvotinginfo";
import Registrationdate from "./Createlist Components/Registrationdate";
import Partyaffiliation from "./Createlist Components/Partyaffiliation";
import Createscript from "./Createscript";
import { useAuth } from "../../../Context/Auth-Context";
import {
  searchVoters,
  saveList,
  updateRecord,
  getLists,
  updateList,
  getCampaignTeammembers,
} from "../../../Connection/Phonebank";
// import { getCampaignTeammembers } from "../../../Connection/Campaign";
import { ToastContainer, toast } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Createlist({
  handleUpdateData,
  data,
  campaignFilterData,
}) {
  console.log(data);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    campaignId: window.localStorage.getItem("id"),
  });
  const [foundVoters, setFoundVoters] = React.useState(0);
  const [foundLists, setFoundLists] = React.useState();
  const [selectedList, setSelectedList] = React.useState();
  const [selectedListLength, setSelectedListLength] = React.useState();
  const [scripts, setScripts] = React.useState();
  const [selectedScript, setSelectedScript] = React.useState();
  const [previewScript, setPreviewScript] = React.useState();
  const [searching, setSearching] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [locationActive, setLocationActive] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [list, setList] = React.useState({
    listName: "",
    voters: [],
    campaignOwnerId: window.localStorage.getItem("id"),
  });
  const [record, setRecord] = React.useState({
    recordName: "",
    teamMembers: [],
    campaignOwnerId: window.localStorage.getItem("id"),
  });
  const [campaignTeammembers, setCampaignTeammembers] = React.useState();

  const [locationFilters, setLocationFilters] = React.useState();
  const [ageFilters, setAgeFilters] = React.useState();
  const [voterStatusFilters, setVoterStatusFilters] = React.useState();
  const [sexFilters, setSexFilters] = React.useState();
  const [legislativeFilters, setLegislativeFilters] = React.useState();
  const [raceFilters, setRaceFilters] = React.useState();
  const [electionHistoryFilters, setElectionHistoryFilters] = React.useState();
  const [languageFilters, setLanguageFilters] = React.useState();
  const [generalVotingScoreFilters, setGeneralVotingScoreFilters] =
    React.useState();
  const [individualInfoFilters, setIndividualInfoFilters] = React.useState();
  const [primaryVotingScoreFilters, setPrimaryVotingScoreFilters] =
    React.useState();
  const [regisDateFilters, setRegisDateFilters] = React.useState();
  const [partyAffiliationFilters, setPartyAffiliationFilters] =
    React.useState();

  const handleFilterDataLocation = (data, type) => {
    console.log(data);
    setLocationFilters({ ...data });
  };

  const handleFilterDataAge = (data, name) => {
    console.log(data);
    setAgeFilters({ ...data });
  };

  const handleFilterDataVoterStatus = (data, name) => {
    console.log(data);
    setVoterStatusFilters({ ...data });
  };

  const handleFilterDataSex = (data, name) => {
    console.log(data);
    setSexFilters({ ...data });
  };

  const handleFilterDataLegislative = (data, name) => {
    console.log(data);
    setLegislativeFilters({ ...data });
  };

  const handleFilterRace = (data, name) => {
    console.log(data);
    setRaceFilters({ ...data });
  };

  const handleFilterElectionHistory = (data, name) => {
    console.log(data);
    setElectionHistoryFilters({ ...data });
  };

  const handleFilterLanguage = (data, name) => {
    console.log(data);
    setLanguageFilters({ ...data });
  };
  const handleFilterGeneralVotingScore = (data, name) => {
    console.log(data);
    setGeneralVotingScoreFilters({ ...data });
  };

  const handleFilterPrimaryVotingScore = (data, name) => {
    console.log(data);
    setPrimaryVotingScoreFilters({ ...data });
  };

  const handleFilterIndividualInfo = (data, name) => {
    console.log(data);
    setIndividualInfoFilters({ ...data });
  };

  const handleFilterRegisDate = (data, name) => {
    console.log(data);
    setRegisDateFilters({ ...data });
  };

  const handleFilterPartyAffiliation = (data, name) => {
    console.log(data);
    setPartyAffiliationFilters({ ...data });
  };

  const handleSearch = async () => {
    console.log({
      ...locationFilters,
      ...ageFilters,
      ...voterStatusFilters,
      ...sexFilters,
      ...legislativeFilters,
      ...raceFilters,
      ...electionHistoryFilters,
      ...languageFilters,
      ...generalVotingScoreFilters,
      ...individualInfoFilters,
      ...primaryVotingScoreFilters,
      ...regisDateFilters,
      ...partyAffiliationFilters,
    });
    setSearching(true);
    const res = await searchVoters({
      ...locationFilters,
      ...ageFilters,
      ...voterStatusFilters,
      ...sexFilters,
      ...legislativeFilters,
      ...raceFilters,
      ...electionHistoryFilters,
      ...languageFilters,
      ...generalVotingScoreFilters,
      ...individualInfoFilters,
      ...primaryVotingScoreFilters,
      ...regisDateFilters,
      ...partyAffiliationFilters,
    });
    console.log(res);
    if (res.data.success === true) {
      setFoundVoters(res?.data.foundVoters.length);
      setSearching(false);
      setList({
        ...list,
        voters: res.data.foundVoters,
      });
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setList({
        ...list,
        voters: [],
      });
      setSearching(false);
      setFoundVoters(0);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterData = (data) => {
    console.log(data);
    setValues({
      ...values,
      ...data,
    });
  };

  const handleSaveList = async () => {
    setSaving(true);
    const res = await saveList({ ...list });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setSaving(false);
      handleUpdate();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setSaving(false);
    }
  };

  const handleSaveRecord = async () => {
    setSaving(true);
    const res = await updateRecord({
      ...record,
      selectedList: selectedList,
      selectedScript: selectedScript,
      recordId: data?._id,
    });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setSaving(false);
      handleClose();
      handleUpdateData();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setSaving(false);
    }
  };

  // const handleSearch = async () => {
  //   setSearching(true);
  //   const res = await searchVoters({ ...values });
  //   console.log(res);
  //   if (res.data.success === true) {
  //     setFoundVoters(res?.data.foundVoters.length);
  //     setSearching(false);
  //     setList({
  //       ...list,
  //       voters: res.data.foundVoters,
  //     });
  //   } else {
  //     toast.error(res.data.message, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //     setList({
  //       ...list,
  //       voters: [],
  //     });
  //     setSearching(false);
  //     setFoundVoters(0);
  //   }
  // };
  const handleLocationActive = (state) => {
    setLocationActive(state);
  };

  const handleChangeActive = (evt) => {
    setRecord({
      ...record,
      active: evt.target.value,
    });
  };

  const handleUpdate = () => {
    setUpdate(true);
  };

  const handleSelectScript = (evt) => {
    console.log(evt.target.value);
    setSelectedScript(evt.target.value);
  };

  const handleSelectList = (evt) => {
    console.log(evt.target.value);
    setSelectedList(evt.target.value);
    foundLists?.map((list) => {
      if (list._id === evt.target.value) {
        console.log("yoooooo", list);

        setSelectedListLength(list.totalNumbers);
        return;
      }
    });
  };

  const handleChangeTeammembers = (event) => {
    console.log(event.target.value);
    const {
      target: { value },
    } = event;

    // if(values.district.indexOf(value) > -1){
    //   let yoo = values.district
    // }

    setRecord(
      // On autofill we get a stringified value.
      {
        ...record,

        teamMembers: typeof value === "string" ? value.split(",") : value,
      }
    );
  };

  useEffect(() => {
    const handleGetLists = async () => {
      console.log("hellooo");
      const res = await getLists({
        campaignId: window.localStorage.getItem("id"),
      });
      console.log(res);
      if (res.data.success === true) {
        setFoundLists(res.data.lists);
        setSelectedListLength(res?.data?.lists[0]?.totalNumbers);
        // setSelectedList(res?.data?.lists[0]?._id);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    const handleGetTeammembers = async () => {
      const res = await getCampaignTeammembers({
        campaignId: window.localStorage.getItem("id"),
      });
      console.log(res);
      if (res.data.success === true) {
        setCampaignTeammembers(res.data.teamMembers);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      // if
    };

    handleGetLists();
    handleGetTeammembers();
    setRecord({
      ...record,
      teamMembers: data?.teamMembers,
      recordName: data?.recordName,
      recordId: data?._id,
      active: data?.active,
    });
    // setSelectedScript({
    //   ...selectedScript,
    //   scriptId: data?.scriptId,
    //   scriptName: data?.scriptName,
    // });
    setSelectedList(data?.list);
    scripts?.map((script) => {
      if (script._id === data.scriptId) {
        setSelectedScript(script);
      }
    });
    setUpdate(false);
  }, [update === true, scripts, data]);

  return (
    <div>
      {console.log(foundLists, record, selectedList, data)}

      {/* <button
        style={{ color: "#FFFFFF", backgroundColor: "#d12e2f" }}
        className="btn px-3 py-2"
        onClick={handleClickOpen}
      >
        Create a New Phonebanking Campaign
      </button> */}

      <a onClick={handleClickOpen} class="dropdown-item">
        {" "}
        Edit
      </a>

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
            <Header
              name="Phonebanking"
              purpose="Create, Edit, Assign Phone Banking Lists"
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
                onClick={handleClose}
                className="text-left btn px-0"
                style={{ color: "#d12e2f" }}
              >
                <i class="fas fa-angle-left mr-2"></i> Back
              </button>
              <p
                style={{
                  color: "#D12E2F",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Who are you Phonebanking?
              </p>
              <br />
              <div>
                <div className="row">
                  <div className="col-12 col-lg-7">
                    <div
                      style={{
                        height: "550px",
                        borderRadius: "12px",
                        border: "1px solid #D9D9D9",
                      }}
                      className="p-3 text-center"
                    >
                      <button
                        style={{ color: "#FFFFFF", backgroundColor: "#d12e2f" }}
                        className="btn px-3 py-2 w-75"
                      >
                        New List
                      </button>
                      <br />
                      <div>
                        <div className="row text-left mt-4">
                          <div className="col-6 p-2">
                            <Location
                              // handleFilterData={handleFilterData}
                              // handleLocationActive={handleLocationActive}
                              handleFilterData={handleFilterDataLocation}
                              handleLocationActive={handleLocationActive}
                              campaignFilterData={campaignFilterData}
                            />
                          </div>
                          <div className="col-6 p-2">
                            <Age
                              // handleFilterData={handleFilterData}
                              handleFilterData={handleFilterDataAge}
                            />
                          </div>
                          <div className="col-6 p-2">
                            <Voterstatus
                              handleFilterData={handleFilterDataVoterStatus}
                            />
                          </div>
                          <div className="col-6 p-2">
                            <Gender
                              // handleFilterData={handleFilterData}
                              handleFilterData={handleFilterDataSex}
                            />
                          </div>
                          <div className="col-6 p-2">
                            <Legislativedistrict
                              // handleFilterData={handleFilterData}
                              handleFilterData={handleFilterDataLegislative}
                              // data={filtersData}
                              campaignFilterData={campaignFilterData}
                            />
                          </div>
                          <div className="col-6 p-2">
                            <Race
                              // handleFilterData={handleFilterData}
                              handleFilterData={handleFilterRace}
                            />
                          </div>
                          <div className="col-6 p-2">
                            <Electionhistory
                              handleFilterData={handleFilterElectionHistory}
                              // handleFilterData={handleFilterData}
                            />
                          </div>
                          <div className="col-6 p-2">
                            <Language
                              // handleFilterData={handleFilterData}
                              handleFilterData={handleFilterLanguage}
                            />
                          </div>
                          <div className="col-6 p-2">
                            <Generalvotingscore
                              // handleFilterData={handleFilterData}
                              handleFilterData={handleFilterGeneralVotingScore}
                              campaignFilterData={campaignFilterData}
                            />
                          </div>
                          <div className="col-6 p-2">
                            <Individualvotinginfo
                              // handleFilterData={handleFilterData}
                              handleFilterData={handleFilterIndividualInfo}
                              campaignFilterData={campaignFilterData}
                            />
                          </div>
                          <div className="col-6 p-2">
                            <Primaryvotingscore
                              // handleFilterData={handleFilterData}
                              handleFilterData={handleFilterPrimaryVotingScore}
                              campaignFilterData={campaignFilterData}
                            />
                          </div>
                          <div className="col-6 p-2">
                            <Registrationdate
                              // handleFilterData={handleFilterData}
                              handleFilterData={handleFilterRegisDate}
                            />
                          </div>
                          <div className="col-6 p-2">
                            <Partyaffiliation
                              // handleFilterData={handleFilterData}
                              handleFilterData={handleFilterPartyAffiliation}
                            />
                          </div>
                          <div className="col-6 p-2 text-left">
                            {searching === false && (
                              <button
                                style={{
                                  color: "#FFFFFF",
                                  backgroundColor: "#d12e2f",
                                }}
                                className={`btn btn-sm mx-4 px-3 py-2 ${
                                  locationActive === true ? "" : "disabled"
                                }`}
                                onClick={
                                  locationActive === true && handleSearch
                                }
                              >
                                <i class="fas fa-search"></i> Find best Results
                              </button>
                            )}

                            {searching === true && (
                              <button
                                class="btn btn-sm mx-4 px-3 py-2"
                                type="button"
                                disabled
                                style={{
                                  color: "#FFFFFF",
                                  backgroundColor: "#d12e2f",
                                }}
                              >
                                <span
                                  className="spinner-grow spinner-grow-sm mx-1"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Loading Best Matches
                              </button>
                            )}
                          </div>
                          <div className="col-12 p-2">
                            <div className="row">
                              <div className="col-8 d-flex ">
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder="Save New List Name"
                                  style={{
                                    width: "60%",
                                    backgroundColor: "#F2F2F2",
                                    border: "none",
                                    // boxShadow: "0px 3px 10px #00000029",
                                    // borderRadius: "15px",
                                  }}
                                  value={list.name}
                                  onChange={(evt) =>
                                    setList({
                                      ...list,
                                      listName: evt.target.value,
                                    })
                                  }
                                ></input>
                                <div>
                                  {saving && (
                                    <button
                                      class="btn btn-danger mx-1"
                                      type="button"
                                      disabled
                                    >
                                      <span
                                        class="spinner-grow spinner-grow-sm"
                                        role="status"
                                        aria-hidden="true"
                                      ></span>
                                      <span class="sr-only">Loading...</span>
                                    </button>
                                  )}

                                  {saving === false && (
                                    <button
                                      onClick={
                                        list?.listName?.length > 1 &&
                                        list.voters.length >= 1 &&
                                        handleSaveList
                                      }
                                      className={`btn text-danger ${
                                        list?.listName?.length > 1 &&
                                        list.voters.length > 1
                                          ? ""
                                          : "disabled"
                                      }`}
                                    >
                                      Save
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="col-4 text-danger ">
                                <h5 className="mt-2">{foundVoters} Found</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-1 d-flex align-items-center justify-content-center">
                    <p style={{ fontSize: "42px" }}>OR</p>
                  </div>
                  <div className="col-12 col-lg-4">
                    <div
                      style={{
                        height: "550px",
                        borderRadius: "12px",
                        border: "1px solid #D9D9D9",
                      }}
                      className="p-3 text-center"
                    >
                      <button
                        style={{ color: "#FFFFFF", backgroundColor: "#d12e2f" }}
                        className="btn px-3 py-2 w-75"
                      >
                        Select From the Previous List
                      </button>
                      <br />
                      <br />
                      {(foundLists === undefined || update === true) && (
                        <button class="btn btn-danger" type="button" disabled>
                          <span
                            class="spinner-grow spinner-grow-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span class="sr-only">Loading...</span>
                        </button>
                      )}
                      {foundLists && update === false && (
                        <div className="mt-4">
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
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={foundLists[0]?._id}
                                name="radio-buttons-group"
                                value={selectedList}
                                onChange={handleSelectList}
                              >
                                {foundLists &&
                                  foundLists.map((list, i) => {
                                    return (
                                      <>
                                        <List>
                                          <ListItem disablePadding>
                                            {/* <ListItemText primary="Inbox" /> */}
                                            <FormControlLabel
                                              value={list._id}
                                              control={<Radio />}
                                              label={list.listName}
                                            />
                                          </ListItem>
                                        </List>
                                        <Divider />
                                      </>
                                    );
                                  })}
                              </RadioGroup>
                              {foundLists?.length === 0 && (
                                <p>No Lists Found Make One</p>
                              )}
                            </Element>
                          </Element>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-6">
                    <div>
                      <p
                        style={{
                          color: "#D12E2F",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Who do you want Phonebanking this list?
                      </p>
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
                          Assign Phonebankers
                        </InputLabel>

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          multiple
                          //   value={age}
                          label="District"
                          //   onChange={handleChange}
                          value={record.teamMembers}
                          onChange={handleChangeTeammembers}
                          name="Teammembers"
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {campaignTeammembers?.map((val) => {
                            return (
                              <MenuItem key={val._id} value={val.email}>
                                <Checkbox
                                  checked={
                                    record?.teamMembers?.indexOf(val.email) > -1
                                  }
                                />
                                <ListItemText
                                  primary={`${val.firstName} ${val.lastName} , ${val.email}`}
                                />
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                    <br />
                    <div>
                      <p
                        style={{
                          color: "#D12E2F",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        What do you want them to say
                      </p>
                      <div className="d-flex justify-content-between">
                        <FormControl className="w-50" fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">
                            Select Script
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedScript}
                            label="Election"
                            onChange={handleSelectScript}
                          >
                            {scripts?.map((script) => {
                              return (
                                <MenuItem value={script}>
                                  {script.scriptName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                        <div>
                          <Createscript
                            handleScripts={(scripts) => setScripts(scripts)}
                            buttonName={{
                              name: "Create New",
                              color: "text-danger",
                            }}
                          />
                        </div>
                      </div>
                      <br />
                      <input
                        type="text"
                        className="form-control "
                        placeholder="Name of Phonebanking List"
                        style={{
                          width: "60%",
                          backgroundColor: "#F2F2F2",
                          border: "none",
                          // boxShadow: "0px 3px 10px #00000029",
                          // borderRadius: "15px",
                        }}
                        value={record.recordName}
                        onChange={(evt) =>
                          setRecord({
                            ...record,
                            recordName: evt.target.value,
                          })
                        }
                      ></input>
                      <br />
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                          Choose Active Status
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue={true}
                          value={record.active}
                          name="active"
                          onChange={handleChangeActive}
                        >
                          <FormControlLabel
                            value="Active"
                            control={<Radio />}
                            label="Active"
                          />
                          <FormControlLabel
                            value="In Active"
                            control={<Radio />}
                            label="Inactive"
                          />
                        </RadioGroup>
                      </FormControl>
                      <br />
                      <div className="d-flex justify-content-between">
                        <p className="mt-2" style={{ color: "#D12E2F" }}>
                          Total Numbers {selectedListLength}{" "}
                        </p>

                        {saving && (
                          <button
                            class="btn btn-danger mx-1"
                            type="button"
                            disabled
                          >
                            <span
                              class="spinner-grow spinner-grow-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            <span class="sr-only">Loading...</span>
                          </button>
                        )}

                        {saving === false && update === false && (
                          <button
                            className={`btn ${
                              selectedList &&
                              selectedScript &&
                              record.recordName !== ""
                                ? ""
                                : "disabled"
                            }`}
                            style={{ color: "#D12E2F" }}
                            onClick={
                              selectedList &&
                              selectedScript &&
                              record.recordName !== "" &&
                              handleSaveRecord
                            }
                          >
                            Save
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
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
                        {selectedScript === undefined && (
                          <p>No Script Selected</p>
                        )}
                        {selectedScript && (
                          <div>
                            {" "}
                            <p
                              style={{
                                color: "#D12E2F",
                              }}
                            >
                              Script Name : {selectedScript.scriptName}
                            </p>
                            <div>
                              <p>{selectedScript.script}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="d-flex">
                          <div
                            style={{
                              borderRadius: "8px",
                              backgroundColor: "#D9D9D9",
                            }}
                            className=" w-50 p-2 m-1 text-center"
                          >
                            Wrong Number
                          </div>
                          <div
                            style={{
                              borderRadius: "8px",
                              backgroundColor: "#D9D9D9",
                            }}
                            className=" w-50 p-2 m-1  text-center"
                          >
                            Do Not Call
                          </div>
                        </div>
                        <div className="d-flex">
                          <div
                            style={{
                              borderRadius: "8px",
                              backgroundColor: "#D9D9D9",
                            }}
                            className=" w-50 p-2 m-1 text-center"
                          >
                            Contact Later
                          </div>
                          <div
                            style={{
                              borderRadius: "8px",
                              backgroundColor: "#D9D9D9",
                            }}
                            className=" w-50 p-2 m-1  text-center"
                          >
                            Survey
                          </div>
                        </div>
                        <div>
                          <div
                            style={{
                              borderRadius: "8px",
                              backgroundColor: "#FF914D",
                              color: "white",
                            }}
                            className=" w-100 p-2 m-1  text-center"
                          >
                            Next Voter
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

// import * as React from "react";
// import { useState, useEffect } from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import ListItemText from "@mui/material/ListItemText";
// import ListItem from "@mui/material/ListItem";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import CloseIcon from "@mui/icons-material/Close";
// import Slide from "@mui/material/Slide";
// import Header from "../../../Components/Header";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";

// import {
//   Link,
//   Element,
//   Events,
//   animateScroll as scroll,
//   scrollSpy,
//   scroller,
// } from "react-scroll";

// import Logo from "../../../Assets/logoword.png";

// import Location from "./Createlist Components/Location";
// import Age from "./Createlist Components/Age";
// import Voterstatus from "./Createlist Components/Voterstatus";
// import Legislativedistrict from "./Createlist Components/Legislativedistrict";
// import Gender from "./Createlist Components/Gender";
// import Race from "./Createlist Components/Race";
// import Electionhistory from "./Createlist Components/Electionhistory";
// import Language from "./Createlist Components/Language";
// import Generalvotingscore from "./Createlist Components/Generalvotingscore";
// import Primaryvotingscore from "./Createlist Components/Primaryvotingscore";
// import Individualvotinginfo from "./Createlist Components/Individualvotinginfo";
// import Registrationdate from "./Createlist Components/Registrationdate";
// import Partyaffiliation from "./Createlist Components/Partyaffiliation";
// import Createscript from "./Createscript";
// import { useAuth } from "../../../Context/Auth-Context";
// import {
//   //   searchVoters,
//   //   saveList,
//   //   getLists,
//   //   updateList,
//   editList,
// } from "../../../Connection/Phonebank";

// import { ToastContainer, toast } from "react-toastify";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// export default function Createlist({ handleUpdateData, data }) {
//   const [open, setOpen] = React.useState(false);
//   const [values, setValues] = React.useState({
//     campaignId: window.localStorage.getItem("id"),
//   });
//   const [foundVoters, setFoundVoters] = React.useState(0);
//   const [foundLists, setFoundLists] = React.useState();
//   const [selectedList, setSelectedList] = React.useState();
//   const [selectedListLength, setSelectedListLength] = React.useState();
//   const [scripts, setScripts] = React.useState();
//   const [selectedScript, setSelectedScript] = React.useState();
//   const [previewScript, setPreviewScript] = React.useState();
//   const [searching, setSearching] = React.useState(false);
//   const [saving, setSaving] = React.useState(false);
//   const [locationActive, setLocationActive] = React.useState(false);
//   const [update, setUpdate] = React.useState(false);
//   const [list, setList] = React.useState({
//     listName: "",
//     voters: [],
//     campaignOwnerId: window.localStorage.getItem("id"),
//   });

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   //   const handleFilterData = (data) => {
//   //     console.log(data);
//   //     setValues({
//   //       ...values,
//   //       ...data,
//   //     });
//   //   };

//   //   const handleSaveList = async () => {
//   //     setSaving(true);
//   //     const res = await saveList({ ...list });
//   //     console.log(res);
//   //     if (res.data.success === true) {
//   //       toast.success(res.data.message, {
//   //         position: toast.POSITION.TOP_RIGHT,
//   //       });
//   //       setSaving(false);
//   //       handleUpdate();
//   //     } else {
//   //       toast.error(res.data.message, {
//   //         position: toast.POSITION.TOP_RIGHT,
//   //       });
//   //       setSaving(false);
//   //     }
//   //   };

//   const handleUpdateList = async () => {
//     setSaving(true);
//     const res = await editList({
//       selectedList: selectedList,
//       selectedScript: selectedScript,
//     });
//     console.log(res);
//     if (res.data.success === true) {
//       toast.success(res.data.message, {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//       setSaving(false);
//       handleClose();
//       handleUpdateData();
//     } else {
//       toast.error(res.data.message, {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//       setSaving(false);
//     }
//   };

//   //   const handleSearch = async () => {
//   //     setSearching(true);
//   //     const res = await searchVoters({ ...values });
//   //     console.log(res);
//   //     if (res.data.success === true) {
//   //       setFoundVoters(res?.data.foundVoters.length);
//   //       setSearching(false);
//   //       setList({
//   //         ...list,
//   //         voters: res.data.foundVoters,
//   //       });
//   //     } else {
//   //       toast.error(res.data.message, {
//   //         position: toast.POSITION.TOP_RIGHT,
//   //       });
//   //       setSearching(false);
//   //       setFoundVoters(0);
//   //     }
//   //   };
//   //   const handleLocationActive = (state) => {
//   //     setLocationActive(state);
//   //   };

//   //   const handleUpdate = () => {
//   //     setUpdate(true);
//   //   };

//   const handleSelectScript = (evt) => {
//     console.log(evt.target.value);
//     setSelectedScript(evt.target.value);
//   };

//   //   const handleSelectList = (evt) => {
//   //     console.log(evt.target.value);
//   //     setSelectedList(evt.target.value);
//   //     foundLists?.map((list) => {
//   //       if (list._id === evt.target.value) {
//   //         console.log("yoooooo", list);

//   //         setSelectedListLength(list.totalNumbers);
//   //         return;
//   //       }
//   //     });
//   //   };

//   useEffect(() => {
//     // const handleGetLists = async () => {
//     //   const res = await getLists({
//     //     campaignId: window.localStorage.getItem("id"),
//     //   });
//     //   console.log(res);
//     //   if (res.data.success === true) {
//     //     setFoundLists(res.data.phonebankLists);
//     //     setSelectedListLength(res.data.phonebankLists[0].totalNumbers);
//     //     setSelectedList(res.data.phonebankLists[0]._id);
//     //   } else {
//     //     toast.error(res.data.message, {
//     //       position: toast.POSITION.TOP_RIGHT,
//     //     });
//     //   }
//     // };

//     // handleGetLists();

//     // setSelectedListLength(data.totalNumbers);
//     setSelectedList(data._id);
//     scripts?.map((script) => {
//       if (script._id === data.scriptId) {
//         setSelectedScript(script);
//       }
//     });

//     // setUpdate(false);
//   }, [scripts]);

//   return (
//     <div>
//       {console.log(data, selectedScript)}

//       {/* <button
//         style={{ color: "#FFFFFF", backgroundColor: "#d12e2f" }}
//         className="btn px-3 py-2"
//         onClick={handleClickOpen}
//       >
//         Create a New Phonebanking Campaign
//       </button> */}
//       <a onClick={handleClickOpen} class="dropdown-item">
//         Edit
//       </a>

//       <Dialog
//         fullScreen
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={Transition}
//       >
//         <AppBar
//           style={{ backgroundColor: "#FFFFFF" }}
//           sx={{ position: "relative" }}
//         >
//           <Toolbar>
//             <IconButton
//               edge="start"
//               //   color=""
//               onClick={handleClose}
//               aria-label="close"
//               style={{ color: "black" }}
//             >
//               <CloseIcon />
//             </IconButton>
//             <img style={{ width: "90px" }} src={Logo} />
//             {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
//               Sound
//             </Typography> */}
//             <Button autoFocus color="inherit" onClick={handleClose}>
//               Close
//             </Button>
//           </Toolbar>
//         </AppBar>
//         <div>
//           <div className="mt-5 container">
//             <Header
//               name="Phonebanking"
//               purpose="Create, Edit Assign Phone banking Lists"
//             />
//             <div
//               className="shadow px-4 py-4"
//               style={{
//                 backgroundColor: "#FFFFFF",
//                 height: "auto",
//                 borderRadius: "12px",
//               }}
//             >
//               <p
//                 style={{
//                   color: "#D12E2F",
//                   fontSize: "20px",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Edit your List
//               </p>
//               <br />
//               <div>
//                 <div className="row">
//                   <div className="col-6">
//                     <div>
//                       <p
//                         style={{
//                           color: "#D12E2F",
//                           fontSize: "20px",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         Who do you want Phonebanking this list?
//                       </p>
//                       <FormControl fullWidth size="small">
//                         <InputLabel id="demo-simple-select-label">
//                           Assign Phonebankers
//                         </InputLabel>
//                         <Select
//                           labelId="demo-simple-select-label"
//                           id="demo-simple-select"
//                           //   value={age}
//                           label="Election"
//                           //   onChange={handleChange}
//                         >
//                           <MenuItem value="B">Phonebanker 1</MenuItem>
//                         </Select>
//                       </FormControl>
//                     </div>
//                     <br />
//                     <div>
//                       <p
//                         style={{
//                           color: "#D12E2F",
//                           fontSize: "20px",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         What do you want them to say
//                       </p>
//                       <div className="d-flex justify-content-between">
//                         <FormControl className="w-50" fullWidth size="small">
//                           <InputLabel id="demo-simple-select-label">
//                             Select Script
//                           </InputLabel>
//                           <Select
//                             labelId="demo-simple-select-label"
//                             id="demo-simple-select"
//                             value={selectedScript}
//                             label="Election"
//                             onChange={handleSelectScript}
//                           >
//                             {scripts?.map((script) => {
//                               return (
//                                 <MenuItem value={script}>
//                                   {script.scriptName}
//                                 </MenuItem>
//                               );
//                             })}
//                           </Select>
//                         </FormControl>
//                         <div>
//                           <Createscript
//                             handleScripts={(scripts) => setScripts(scripts)}
//                             buttonName={{
//                               name: "Create New",
//                               color: "text-danger",
//                             }}
//                           />
//                         </div>
//                       </div>
//                       <br />
//                       <div className="d-flex justify-content-between">
//                         <p className="mt-2" style={{ color: "#D12E2F" }}>
//                           Total Numbers {selectedListLength}{" "}
//                         </p>

//                         {saving && (
//                           <button
//                             class="btn btn-danger mx-1"
//                             type="button"
//                             disabled
//                           >
//                             <span
//                               class="spinner-grow spinner-grow-sm"
//                               role="status"
//                               aria-hidden="true"
//                             ></span>
//                             <span class="sr-only">Loading...</span>
//                           </button>
//                         )}

//                         {saving === false && (
//                           <button
//                             className={`btn ${
//                               selectedList && selectedScript ? "" : "disabled"
//                             }`}
//                             style={{ color: "#D12E2F" }}
//                             onClick={
//                               selectedList && selectedScript && handleUpdateList
//                             }
//                           >
//                             Edit List
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-6">
//                     <div>
//                       <p
//                         style={{
//                           color: "#D12E2F",
//                           fontSize: "20px",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         Preview
//                       </p>
//                       <div
//                         style={{
//                           width: "100%",
//                           height: "auto",
//                           minHeight: "150px",
//                           backgroundColor: "#00000017",
//                           borderRadius: "12px",
//                         }}
//                         className="p-2"
//                       >
//                         {selectedScript === undefined && (
//                           <p>No Script Selected</p>
//                         )}
//                         {selectedScript && (
//                           <div>
//                             {" "}
//                             <p
//                               style={{
//                                 color: "#D12E2F",
//                               }}
//                             >
//                               Script Name : {selectedScript.scriptName}
//                             </p>
//                             <div>
//                               <p>{selectedScript.script}</p>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                       <div>
//                         <div className="d-flex">
//                           <div
//                             style={{
//                               borderRadius: "8px",
//                               backgroundColor: "#D9D9D9",
//                             }}
//                             className=" w-50 p-2 m-1 text-center"
//                           >
//                             Wrong Number
//                           </div>
//                           <div
//                             style={{
//                               borderRadius: "8px",
//                               backgroundColor: "#D9D9D9",
//                             }}
//                             className=" w-50 p-2 m-1  text-center"
//                           >
//                             Do Not Call
//                           </div>
//                         </div>
//                         <div className="d-flex">
//                           <div
//                             style={{
//                               borderRadius: "8px",
//                               backgroundColor: "#D9D9D9",
//                             }}
//                             className=" w-50 p-2 m-1 text-center"
//                           >
//                             Contact Later
//                           </div>
//                           <div
//                             style={{
//                               borderRadius: "8px",
//                               backgroundColor: "#D9D9D9",
//                             }}
//                             className=" w-50 p-2 m-1  text-center"
//                           >
//                             Survey
//                           </div>
//                         </div>
//                         <div>
//                           <div
//                             style={{
//                               borderRadius: "8px",
//                               backgroundColor: "#FF914D",
//                               color: "white",
//                             }}
//                             className=" w-100 p-2 m-1  text-center"
//                           >
//                             Next Voter
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <br />
//             <br />
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// }
