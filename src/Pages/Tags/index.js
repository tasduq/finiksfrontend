import * as React from "react";
import Header from "../../Components/Header";
import Addtag from "./Components/Addtag";
import Tagstable from "./Components/Tagstable";
import Clientstable from "./Components/Clientstable";
import { ToastContainer, toast } from "react-toastify";
import { getTags, getTagsByClients, mergeTags } from "../../Connection/Tags";
import clsx from "clsx";
import Confirmmerge from "./Components/Confirmmerge";

import "./Styles/style.css";

const Tags = () => {
  const [update, setUpdate] = React.useState(false);
  const [foundTags, setFoundTags] = React.useState();
  const [foundClientTags, setFoundClientTags] = React.useState();
  const [view, setView] = React.useState("name");
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [dSelect, setDSelect] = React.useState(false);
  const [merging, setMerging] = React.useState(false);
  const [openConfirmMerge, setOpenConfirmMerge] = React.useState(false);
  const [searching, setSearching] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [searched, setSearched] = React.useState();

  const handleSearch = (evt) => {
    if (evt.target.value.length > 0) {
      setSearching(true);
      let yoo;
      setSearchValue(evt.target.value);
      yoo = foundTags.filter((tag) => {
        return tag.tagName
          .toLowerCase()
          .includes(evt.target.value.toLowerCase());
      });
      setSearched(yoo);
    } else {
      setSearching(false);
      setSearchValue(evt.target.value);
    }
  };

  const handleView = (type) => {
    if (type === "name") {
      setView("name");
    } else {
      setView("client");
    }
  };

  const handleUpdate = () => {
    setUpdate(true);
  };

  const handleSelected = (data) => {
    console.log(data);
    setSelectedTags(data);
  };

  const handleOpenConfirmMerge = () => {
    setOpenConfirmMerge(!openConfirmMerge);
  };

  const handleMerge = async (data) => {
    console.log(data);
    if (data === true) {
      setMerging(true);
      const res = await mergeTags({ ids: selectedTags });
      console.log(res);
      if (res.data.success === true) {
        toast.success("Merge Successful", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // setView("client");
        handleUpdate();
        setSelectedTags([]);
        setDSelect(true);
        setMerging(false);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setMerging(false);
      }
    } else {
      toast.error("Merging Canceled", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setDSelect(true);
      setMerging(false);
      setSelectedTags([]);
    }
  };

  const handleDSelect = () => {
    setDSelect(false);
  };

  const handleGetClientsTags = async () => {
    const res = await getTagsByClients();
    console.log(res);
    if (res.data.success === true) {
      setFoundClientTags(res.data.clients);
      setView("client");
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  React.useEffect(() => {
    console.log("i am running");
    const handleGetTags = async () => {
      const res = await getTags();
      console.log(res);
      if (res.data.success === true) {
        setFoundTags(res.data.tags);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    handleGetTags();
    setUpdate(false);
  }, [update === true]);
  return (
    <div style={{ backgroundColor: "#FCFCFC", height: "100vh" }}>
      <div className="mt-5 pl-xl-5 pr-4">
        <br />
        <div className="row">
          <div className="col-2 col-xl-1"></div>
          <div className="col-10 col-xl-11">
            <Header
              name="Tags -  All Tags"
              purpose="Edit , Change ,  Record All Tags"
            />
            <br />
            <div>
              <div
                className=" p-4"
                style={{
                  height: "auto",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  boxShadow: " 0px 10px 24px #00000029",
                }}
              >
                <div className="d-flex">
                  {view === "name" && <Addtag handleUpdate={handleUpdate} />}

                  <input
                    type="text"
                    className="form-control w-25 mx-2"
                    placeholder="Search"
                    style={{
                      width: "350px",
                      backgroundColor: "#F2F2F2",
                      border: "none",
                      // boxShadow: "0px 3px 10px #00000029",
                      // borderRadius: "15px",
                    }}
                    value={searchValue}
                    onChange={handleSearch}
                  ></input>
                  {view === "name" && merging === false && (
                    <button
                      style={{
                        width: "150px",
                        height: "36px",
                        backgroundColor: "#D9D9D9",
                        color: "#D12E2F",
                        fontSize: "16px",
                      }}
                      className="btn mx-2"
                      disabled={selectedTags.length < 2 ? true : false}
                      onClick={handleOpenConfirmMerge}
                    >
                      Merge
                    </button>
                  )}

                  {merging === true && (
                    <button
                      style={{
                        width: "150px",
                        height: "36px",
                        backgroundColor: "#D9D9D9",
                        color: "#D12E2F",
                        fontSize: "16px",
                      }}
                      class="btn mx-2 "
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

                  <button
                    // style={{ backgroundColor: "#583689", color: "white" }}
                    // className="btn mx-2 "
                    className={clsx({
                      selectedView: view === "name",
                      "mx-2": true,
                      btn: true,
                      nonselectedView: view === "client",
                    })}
                    onClick={
                      foundTags === undefined
                        ? handleUpdate
                        : () => handleView("name")
                    }
                  >
                    By Name
                  </button>
                  <button
                    // style={{ backgroundColor: "#583689", color: "white" }}
                    // className="btn mx-2 "
                    className={clsx({
                      selectedView: view === "client",
                      "mx-2": true,
                      btn: true,
                      nonselectedView: view === "name",
                    })}
                    onClick={
                      foundClientTags === undefined
                        ? handleGetClientsTags
                        : () => handleView("client")
                    }
                  >
                    By Client
                  </button>
                </div>
                {view === "name" && (
                  <div>
                    <br />
                    {foundTags === undefined && (
                      <div class="spinner-border text-danger" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    )}
                    {foundTags && (
                      <Tagstable
                        data={searching === true ? searched : foundTags}
                        handleSelected={handleSelected}
                        dSelect={dSelect}
                        handleDSelect={handleDSelect}
                        handleUpdate={handleUpdate}
                      />
                    )}{" "}
                    {foundTags?.length === 0 && <p>No Tags Found Make One</p>}
                  </div>
                )}
                {view === "client" && (
                  <div>
                    <br />
                    {foundClientTags === undefined && (
                      <div class="spinner-border text-danger" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    )}
                    {foundClientTags && (
                      <Clientstable
                        data={foundClientTags}
                        dSelect={dSelect}
                        handleDSelect={handleDSelect}
                      />
                    )}{" "}
                    {foundClientTags?.length === 0 && (
                      <p>No Tags Found Make One</p>
                    )}
                  </div>
                )}
                {openConfirmMerge && (
                  <Confirmmerge
                    open={openConfirmMerge}
                    data={true}
                    handleMerge={handleMerge}
                    handleOpenConfirmMerge={handleOpenConfirmMerge}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tags;
