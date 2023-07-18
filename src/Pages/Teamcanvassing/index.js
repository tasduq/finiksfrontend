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
  const history = useHistory();

  const [searchValues, setSearchValues] = useState({
    voterName: "",
    voterLocation: "",
    votersList: "",
  });

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

  const handleFilter = (filterType) => {
    setLocationFilter(filterType);
  };
  const handleSearch = async (event) => {
    console.log("search trigered ----------");
    event.preventDefault();
    let filterObj = {};
    if (searchValues?.voterName?.length > 0) {
      filterObj = {
        ...filterObj,
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
    // if (window.localStorage.getItem("id")) {
    //   const handleGetLists = async () => {
    //     const res = await getTeamPhonebankRecords({
    //       campaignId: window.localStorage.getItem("id"),
    //       teamMemberEmail: window.localStorage.getItem("email"),
    //     });
    //     console.log(res);
    //     if (res.data.success === true) {
    //       // setFoundResults(res.data.records);
    //     } else {
    //       toast.error(res.data.message, {
    //         position: toast.POSITION.TOP_RIGHT,
    //       });
    //     }
    //   };
    //   handleGetLists();
    // } else {
    //   toast.error("Campaign Not Selected", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    //   history.push({
    //     pathname: "/",
    //   });
    // }

    const handleGetCampaignData = async () => {
      const res = await getCampaignData({
        campaignId: window.localStorage.getItem("id"),
      });
      console.log(res);
      if (res.data.success === true) {
        setCampaignData(res.data.values);
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
      <div className="mt-5 pl-xl-5 pr-4">
        <br />
        <div className="row">
          <div className="col-2 "></div>
          <div className="col-9 col-lg-10 col-xl-9">
            <Header name="Canvassing" purpose="Lookup Voter in Your District" />
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
                                      ? locationFilter === "AI_COUNTY_NAME"
                                        ? "County"
                                        : locationFilter
                                      : "Filter By"}
                                  </button>
                                  <div
                                    class="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    <a
                                      onClick={() => handleFilter("ADDRESS")}
                                      class="dropdown-item"
                                    >
                                      {" "}
                                      Address
                                    </a>
                                    <a
                                      onClick={() => handleFilter("CITY")}
                                      class="dropdown-item"
                                    >
                                      {" "}
                                      City
                                    </a>
                                    <a
                                      onClick={() => handleFilter("STATE")}
                                      class="dropdown-item"
                                    >
                                      {" "}
                                      State
                                    </a>
                                    <a
                                      onClick={() =>
                                        handleFilter("AI_COUNTY_NAME")
                                      }
                                      class="dropdown-item"
                                    >
                                      {" "}
                                      County
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between ">
                                <div className="input-group">
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
                                    value={searchValues?.voterLocation}
                                    onChange={handleChange}
                                    name="voterLocation"
                                    placeholder="Location or Address"
                                    disabled={
                                      searchValues?.votersList?.length > 0 ||
                                      locationFilter?.length === 0
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
                            {/* <div class="form-group text-left mt-5">
                          <label
                            style={{ color: "#d12e2f" }}
                            for="exampleInputEmail1"
                          >
                            By List:
                          </label>
                          <div className="input-group">
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
                              value={searchValues?.votersList}
                              onChange={handleChange}
                              name="votersList"
                              placeholder="Search List Name"
                              disabled={
                                searchValues?.voterLocation?.length > 0 ||
                                searchValues?.voterName.length > 0
                                  ? true
                                  : false
                              }
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-danger border border-danger"
                                type="button"
                                onClick={() => {
                                  setSearchValues({
                                    ...searchValues,
                                    votersList: "",
                                  });
                                }}
                              >
                                &times;
                              </button>
                            </div>
                          </div>
                        </div> */}
                            <div className=" d-flex justify-content-end text-left">
                              <button
                                className="btn btn-danger d-none"
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
          />
        )}
      </div>
    </div>
  );
};
export default Teamcanvassing;
