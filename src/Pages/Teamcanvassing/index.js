import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
// import Listtable from "./Components/Listtable";
import { ToastContainer, toast } from "react-toastify";
import {
  searchVotersForcanvassing,
  searchCanvassingList,
} from "../../Connection/Canvassing";
import { getTeamPhonebankRecords } from "../../Connection/Team";
import { Link, NavLink, useHistory, withRouter } from "react-router-dom";
import Foundvoterlist from "./components/Foundvoterslist";
import Foundcanvassinglists from "./components/Foundcanvassinglists";
import Voterview from "./components/Voterview";
import { getCampaignData } from "../../Connection/Campaign";
import { Element, animateScroll as scroll } from "react-scroll";
import { manageState } from "../../Connection/Settings";
import { getDistricts } from "../../Connection/Clients";
// import Listspage from "./Components/Listspage";
// import { useLocation, Link, NavLink } from "react-router-dom";

const Teamcanvassing = (props) => {
  const [openVoterview, setOpenVoterview] = useState(false);
  const [foundResults, setFoundResults] = useState([]);
  // const [selected, setSelected] = useState();
  const [update, setUpdate] = React.useState(false);
  const [campaignData, setCampaignData] = useState();
  const [locationFilter, setLocationFilter] = useState("");
  const [loadingResults, setLoadingResults] = useState(false);
  const [listView, setListView] = useState(false);
  const [selectedVoter, setSelectedVoter] = useState();
  const [selectedWalkbook, setSelectedWalkBook] = useState();
  const [sortedDirection, setSortedDirection] = useState("A");
  const [allStates, setAllStates] = React.useState([]);
  const [campaignState, setCampaignState] = React.useState([]);
  const [filterValues, setFilterValues] = React.useState([]);
  const [loadingFilterResults, setLoadingFilterResults] = React.useState(false);

  const history = useHistory();

  const [searchValues, setSearchValues] = useState({
    voterName: "",
    voterLocation: "",
    votersList: "",
  });

  const filterMappings = {
    CITY: "City",
    ADDRESS: "Address",
    STATE: "State",
    AI_COUNTY_NAME: "County",
  };

  const handleResetCanvassingPage = () => {
    setFoundResults([]);
    setSearchValues({
      voterName: "",
      voterLocation: "",
      votersList: "",
    });
  };

  const handleOpen = () => {
    setOpenVoterview(!openVoterview);
  };

  const handleSort = (direction, arrayToSort) => {
    setSortedDirection(direction);

    if (direction === "A") {
      // console.log(arrayToSort, "i am foundddddd");
      // Sort objects from A to Z based on LASTNAME
      const sortedAZ = Array.from(arrayToSort).sort((a, b) => {
        const lastNameA = a.LASTNAME.toUpperCase();
        // console.log(lastNameA, "lastNameAAAAA");
        const lastNameB = b.LASTNAME.toUpperCase();
        // console.log(lastNameB, "lastNameBBBB");
        return lastNameA.localeCompare(lastNameB);
      });

      console.log("Sorted A to Z:", sortedAZ);
      setFoundResults(sortedAZ);
    }

    if (direction === "Z") {
      // Sort objects from Z to A based on LASTNAME
      const sortedZA = Array.from(arrayToSort).sort((a, b) => {
        const lastNameA = a.LASTNAME.toUpperCase();
        const lastNameB = b.LASTNAME.toUpperCase();
        return lastNameB.localeCompare(lastNameA);
      });

      console.log("Sorted Z to A:", sortedZA);
      setFoundResults(sortedZA);
    }
  };

  const handleSelectedVoter = (voter, walkobookParams) => {
    console.log(voter, walkobookParams, "i am voter");
    handleOpen();
    setSelectedVoter(voter);
    setSelectedWalkBook(walkobookParams);
  };

  const handleSelectedWalkBook = (walkbook, numberOfVoters) => {
    console.log(walkbook, numberOfVoters, "i am walkbook");
    let divideTime = walkbook?.totalNumbers / numberOfVoters;
    console.log(divideTime, "divedddddd");
  };

  const handleUpdate = () => {
    setUpdate(true);
  };

  const handleChange = (evt) => {
    let { name, value } = evt.target;
    console.log(name, value);
    setSearchValues({ ...searchValues, [name]: value });
  };

  const handleFilter = async (filterType) => {
    console.log(filterType, "i am filter type");
    if (filterType?.length > 0) {
      setLoadingFilterResults(true);
      let res = await getDistricts({
        field: filterType,
        state: campaignData?.campaignExtraData.state,
      });
      console.log(res);
      if (res.data.success === true) {
        setFilterValues(res.data.districts);
        setSearchValues({
          ...searchValues,
          voterLocation: res.data.districts[0],
        });
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setLoadingFilterResults(false);
      setLocationFilter(filterType);
    } else {
      setLocationFilter(filterType);
      setSearchValues({ ...searchValues, voterLocation: "" });
    }
  };
  const handleSearch = async (event) => {
    console.log("search trigered ----------");
    event.preventDefault();
    let filterObj = {};
    if (searchValues?.voterName?.length > 0) {
      filterObj = {
        ...filterObj,
        STATE: campaignState[0]?.stateKey,
        FIRSTNAME: searchValues?.voterName,
      };
    }
    if (searchValues?.voterLocation?.length > 0) {
      filterObj = {
        ...filterObj,
        [locationFilter]: searchValues?.voterLocation,
      };
    }
    console.log(filterObj, "i am filteronbj");
    setLoadingResults(true);

    let res;
    if (searchValues?.votersList.length > 0) {
      res = await searchCanvassingList({
        listName: searchValues?.votersList,
        campaignId: window.localStorage.getItem("id"),
      });
      console.log(res, "i am res");
      if (res.data.success === true) {
        setLoadingResults(false);
        setListView(true);
        setFoundResults(res?.data?.foundLists);
      } else {
        setLoadingResults(false);
        setFoundResults([]);
      }
    } else {
      setListView(false);
      res = await searchVotersForcanvassing({
        filters: filterObj,
        campaignId: window.localStorage.getItem("id"),
        teamMemberId: window.localStorage.getItem("userId"),
      });
      console.log(res, "i am res");
      if (res.data.success === true) {
        setLoadingResults(false);

        setFoundResults(res?.data?.foundVoters);
        // handleSort("A", res?.data?.foundVoters);
      } else {
        setLoadingResults(false);
        setFoundResults([]);
      }
    }
  };

  useEffect(() => {
    const fetchStates = async (fetchedCampaignData) => {
      let res0 = await manageState.getStates();
      console.log(res0, "i am all states ===>");
      if (res0.data.success) {
        setAllStates(res0?.data?.foundStates);
        let campaignState = res0?.data?.foundStates?.filter(
          (stateObj) =>
            stateObj?.stateKey === fetchedCampaignData?.campaignExtraData.state
        );
        console.log(
          campaignState,
          fetchedCampaignData,
          "i am finalized campaign state"
        );
        setCampaignState(campaignState);
      } else {
        toast.error(res0?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    const handleGetCampaignData = async () => {
      const res = await getCampaignData({
        campaignId: window.localStorage.getItem("id"),
      });
      console.log(res, "i am campaign data");
      if (res.data.success === true) {
        setCampaignData(res.data.values);
        fetchStates(res.data.values);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    handleGetCampaignData();

    setUpdate(false);
  }, [update === true]);
  console.log("props");
  return (
    <div style={{ backgroundColor: "#FCFCFC", height: "100vh" }}>
      {console.log(sortedDirection, foundResults)}
      <div className=" pl-xl-5 pr-4">
        <br />
        <div className="row">
          <div className="col-2 "></div>
          <div className="col-9 col-lg-10 col-xl-9">
            <Header
              name="Canvassing"
              purpose="Lookup Voters in Your District"
            />
            <br />
            <div>
              <div
                className="  mb-2"
                style={{
                  minHeight: "500px",
                  height: "auto",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  boxShadow: " 0px 10px 24px #00000029",
                }}
              >
                <div>
                  <div className="row">
                    <div className="col-7 p-5">
                      <p
                        className="text-left"
                        style={{
                          fontSize: "24px",
                          color: "#D12E2F",
                        }}
                      >
                        <strong>Lookup Voter by Name or Address:</strong>
                      </p>
                      <br></br>
                      <br></br>

                      <h3
                        style={{
                          fontSize: "44px",
                          color: "#D12E2F",
                          fontWeight: "900",
                          // textShadow: "1px 1px 2px rgba(0, 0, 0, 0.9);",
                        }}
                      >
                        Search:
                      </h3>
                      <div className="row">
                        <div className="col-xl-1"></div>
                        <div className="col-12 col-xl-10">
                          <form
                            class="form-group text-center mt-5"
                            onSubmit={handleSearch}
                          >
                            <div class="form-group text-left">
                              {/* <label
                            style={{ color: "#d12e2f" }}
                            for="exampleInputEmail1"
                          >
                            By Voter:
                          </label> */}
                              <div className="d-flex ">
                                <div className="input-group ">
                                  <input
                                    style={{
                                      minWidth: "316px",
                                      width: "100%",
                                      height: "106px",
                                      borderRadius: "5px",
                                      boxShadow: "0px 3px 26px #00000029",
                                      border: "none",
                                      padding: "50px",
                                    }}
                                    type="text"
                                    // className="form-control shadow-sm"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    value={searchValues?.voterName}
                                    onChange={handleChange}
                                    name="voterName"
                                    placeholder="Name:"
                                    disabled={
                                      searchValues?.votersList?.length > 0
                                        ? true
                                        : false
                                    }
                                  />
                                  {/* <div className="input-group-append">
                              <button
                                className="btn btn-danger border border-danger"
                                type="button"
                                onClick={() => {
                                  setSearchValues({
                                    ...searchValues,
                                    voterName: "",
                                  });
                                }}
                              >
                                &times;
                              </button>
                            </div> */}
                                </div>
                              </div>

                              <br />
                              <div className="d-flex justify-content-end mb-2">
                                <div class="dropdown mx-1">
                                  {loadingFilterResults === true ? (
                                    <div
                                      class="spinner-border text-danger mt-2"
                                      role="status"
                                    >
                                      <span class="sr-only">Loading...</span>
                                    </div>
                                  ) : (
                                    <>
                                      <button
                                        style={{
                                          color: "white",
                                          backgroundColor: "#d12e2f",
                                          minWidth: "88px",
                                          width: "auto",
                                          height: "36px",
                                        }}
                                        class="btn  dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        {locationFilter?.length > 0
                                          ? filterMappings[locationFilter]
                                          : "Filter By"}
                                      </button>
                                      <div
                                        class="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton"
                                      >
                                        <a
                                          onClick={() => handleFilter("")}
                                          class="dropdown-item"
                                          style={{
                                            cursor: "pointer", // Set the cursor to "pointer" on hover to indicate it's clickable
                                            textDecoration: "none", // Remove underline (optional)
                                            color: "black", // Change this to your desired color (optional)
                                          }}
                                        >
                                          {" "}
                                          Un Select
                                        </a>
                                        <a
                                          onClick={() =>
                                            handleFilter("ADDRESS")
                                          }
                                          class="dropdown-item"
                                          style={{
                                            cursor: "pointer", // Set the cursor to "pointer" on hover to indicate it's clickable
                                            textDecoration: "none", // Remove underline (optional)
                                            color: "black", // Change this to your desired color (optional)
                                          }}
                                        >
                                          {" "}
                                          Address
                                        </a>
                                        <a
                                          onClick={() => handleFilter("CITY")}
                                          class="dropdown-item"
                                          style={{
                                            cursor: "pointer", // Set the cursor to "pointer" on hover to indicate it's clickable
                                            textDecoration: "none", // Remove underline (optional)
                                            color: "black", // Change this to your desired color (optional)
                                          }}
                                        >
                                          {" "}
                                          City
                                        </a>
                                        <a
                                          onClick={() => handleFilter("STATE")}
                                          class="dropdown-item"
                                          style={{
                                            cursor: "pointer", // Set the cursor to "pointer" on hover to indicate it's clickable
                                            textDecoration: "none", // Remove underline (optional)
                                            color: "black", // Change this to your desired color (optional)
                                          }}
                                        >
                                          {" "}
                                          State
                                        </a>
                                        <a
                                          onClick={() =>
                                            handleFilter("AI_COUNTY_NAME")
                                          }
                                          class="dropdown-item"
                                          style={{
                                            cursor: "pointer", // Set the cursor to "pointer" on hover to indicate it's clickable
                                            textDecoration: "none", // Remove underline (optional)
                                            color: "black", // Change this to your desired color (optional)
                                          }}
                                        >
                                          {" "}
                                          County
                                        </a>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="d-flex justify-content-between ">
                                <div className="input-group">
                                  {/* <input
                                    style={{
                                      minWidth: "316px",
                                      width: "100%",
                                      height: "106px",
                                      borderRadius: "5px",
                                      boxShadow: "0px 3px 26px #00000029",
                                      border: "none",
                                      padding: "50px",
                                    }}
                                    type="text"
                                    // className="form-control shadow-sm"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    value={searchValues?.voterLocation}
                                    onChange={handleChange}
                                    name="voterLocation"
                                    placeholder="Location or Address:"
                                    disabled={
                                      searchValues?.votersList?.length > 0 ||
                                      locationFilter?.length === 0
                                        ? true
                                        : false
                                    }
                                  /> */}
                                  <select
                                    style={{
                                      minWidth: "316px",
                                      width: "100%",
                                      height: "106px",
                                      borderRadius: "5px",
                                      boxShadow: "0px 3px 26px #00000029",
                                      border: "none",
                                      // padding: "50px",
                                    }}
                                    class="custom-select custom-select-lg mb-3"
                                    disabled={
                                      searchValues?.votersList?.length > 0 ||
                                      locationFilter?.length === 0
                                        ? true
                                        : false
                                    }
                                    name="voterLocation"
                                    placeholder="Location or Address:"
                                    onChange={handleChange}
                                  >
                                    {locationFilter?.length > 0 ? (
                                      filterValues?.map((filterVal) => {
                                        return (
                                          <>
                                            <option>{filterVal}</option>
                                          </>
                                        );
                                      })
                                    ) : (
                                      <option selected>Select an option</option>
                                    )}
                                  </select>
                                  {/* <div className="input-group-append">
                                <button
                                  className="btn btn-danger border border-danger"
                                  type="button"
                                  onClick={() => {
                                    setSearchValues({
                                      ...searchValues,
                                      voterLocation: "",
                                    });
                                  }}
                                >
                                  &times;
                                </button>
                              </div> */}
                                </div>
                              </div>
                            </div>

                            <div className=" d-flex justify-content-center text-left">
                              <button
                                className="btn btn-danger "
                                onClick={handleSearch}
                                disabled={
                                  searchValues?.voterLocation?.length > 0 ||
                                  searchValues?.voterName?.length > 0 ||
                                  searchValues?.votersList?.length > 0
                                    ? false
                                    : true
                                }
                              >
                                Search
                              </button>
                            </div>
                          </form>
                        </div>
                        <div className="col-xl-1"></div>
                      </div>
                    </div>
                    <div className="col-5 ">
                      <div
                        className="border-left "
                        style={{
                          height: "100%",
                          boxShadow: " 0px 10px 24px #00000029",
                        }}
                      >
                        <div className="d-flex justify-content-end  border-bottom">
                          <button
                            style={{ color: "#d12e2f" }}
                            className=" btn "
                            onClick={() =>
                              handleSort(
                                sortedDirection === "A" ? "Z" : "A",
                                foundResults
                              )
                            }
                          >
                            Filter{" "}
                            {sortedDirection === "A" ? (
                              <i class="fas fa-sort-alpha-down m-1"></i>
                            ) : (
                              <i class="fas fa-sort-alpha-up m-1"></i>
                            )}
                          </button>
                        </div>

                        <div>
                          {foundResults?.length === 0 &&
                            loadingResults === false && <p>No Results Found</p>}
                          {loadingResults === true && (
                            <div
                              class="spinner-border text-danger mt-2"
                              role="status"
                            >
                              <span class="sr-only">Loading...</span>
                            </div>
                          )}
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
                              {loadingResults === false &&
                                foundResults?.length > 0 &&
                                (listView ? (
                                  <Foundcanvassinglists
                                    data={foundResults}
                                    handleSelectedVoter={handleSelectedVoter}
                                    // handleSelectedWalkBook={handleSelectedWalkBook}
                                  />
                                ) : (
                                  <Foundvoterlist
                                    data={foundResults}
                                    handleSelectedVoter={handleSelectedVoter}
                                  />
                                ))}
                            </Element>
                          </Element>
                        </div>
                        {/* <Foundvoterlist data={foundResults} /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-1 "></div>
          {/* <div className="col-2 "></div> */}
        </div>
        {openVoterview && (
          <Voterview
            open={openVoterview}
            data={selectedVoter}
            campaignData={campaignData?.campaignDates}
            handleOpen={handleOpen}
            listView={listView}
            selectedWalkbook={selectedWalkbook}
            handleResetCanvassingPage={handleResetCanvassingPage}
          />
        )}
      </div>
    </div>
  );
};
export default Teamcanvassing;
