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
  const history = useHistory();

  const [searchValues, setSearchValues] = useState({
    voterName: "",
    voterLocation: "",
    votersList: "",
  });

  const handleOpen = () => {
    setOpenVoterview(!openVoterview);
  };

  const handleSelectedVoter = (voter) => {
    console.log(voter, "i am voter");
    handleOpen();
    setSelectedVoter(voter);
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
  const handleSearch = async () => {
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
      {console.log(campaignData)}
      <div className="mt-5 pl-xl-5 pr-4">
        <br />
        <div className="row">
          <div className="col-2 col-xl-1"></div>
          <div className="col-10 col-xl-11">
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
                        style={{ fontSize: "24px", color: "#D12E2F" }}
                      >
                        <strong>Lookup Voter by Name or Address?</strong>
                      </p>
                      <br></br>
                      <h3 style={{ fontSize: "66px", color: "#D12E2F" }}>
                        Search
                      </h3>

                      <div>
                        <div class="form-group text-left">
                          <label
                            style={{ color: "#d12e2f" }}
                            for="exampleInputEmail1"
                          >
                            By Voter:
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control shadow-sm"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              value={searchValues?.voterName}
                              onChange={handleChange}
                              name="voterName"
                              placeholder="Search by Name"
                              disabled={
                                searchValues?.votersList?.length > 0
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
                                    voterName: "",
                                  });
                                }}
                              >
                                &times;
                              </button>
                            </div>
                          </div>

                          <br />
                          <div className="d-flex justify-content-between ">
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control shadow-sm"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={searchValues?.voterLocation}
                                onChange={handleChange}
                                name="voterLocation"
                                placeholder="Search by Location or Address"
                                disabled={
                                  searchValues?.votersList?.length > 0 ||
                                  locationFilter?.length === 0
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
                                      voterLocation: "",
                                    });
                                  }}
                                >
                                  &times;
                                </button>
                              </div>
                            </div>

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
                                  ? locationFilter
                                  : "Type"}
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
                                  onClick={() => handleFilter("AI_COUNTY_NAME")}
                                  class="dropdown-item"
                                >
                                  {" "}
                                  County
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form-group text-left">
                          <label
                            style={{ color: "#d12e2f" }}
                            for="exampleInputEmail1"
                          >
                            By List:
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control shadow-sm"
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
                        </div>
                        <div className="text-left">
                          <button
                            className="btn btn-danger"
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
                      </div>
                    </div>
                    <div className="col-5">
                      <div
                        className="border-left "
                        style={{
                          height: "100%",
                          boxShadow: " 0px 10px 24px #00000029",
                        }}
                      >
                        <p
                          style={{ color: "#d12e2f" }}
                          className="d-flex justify-content-end p-2 border-bottom"
                        >
                          Filter <i class="fas fa-filter m-1"></i>
                        </p>
                        <div>
                          {foundResults?.length === 0 &&
                            loadingResults === false && <p>No Results Found</p>}
                          {loadingResults === true && (
                            <div
                              class="spinner-border text-danger"
                              role="status"
                            >
                              <span class="sr-only">Loading...</span>
                            </div>
                          )}

                          {loadingResults === false &&
                            foundResults?.length > 0 &&
                            (listView ? (
                              <Foundcanvassinglists
                                data={foundResults}
                                handleSelectedVoter={handleSelectedVoter}
                                handleSelectedWalkBook={handleSelectedWalkBook}
                              />
                            ) : (
                              <Foundvoterlist
                                data={foundResults}
                                handleSelectedVoter={handleSelectedVoter}
                              />
                            ))}
                        </div>
                        {/* <Foundvoterlist data={foundResults} /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {openVoterview && (
          <Voterview
            open={openVoterview}
            data={selectedVoter}
            campaignData={campaignData?.campaignDates}
            handleOpen={handleOpen}
            listView={listView}
          />
        )}
      </div>
    </div>
  );
};
export default Teamcanvassing;
