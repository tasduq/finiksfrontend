import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Tablevoters from "./Components/Table";
import Newcampaign from "./Components/Newcampaign";
import { Link } from "react-router-dom";
import { getAristotleData } from "../../Connection/Aristotle";
import { getFiniksData } from "../../Connection/Finiks";
import { ToastContainer, toast } from "react-toastify";
import Aristotledatapage from "./Components/Aristotledatapage";
import Finikstable from "./Components/Finikstable";

const Voterdata = () => {
  const [voters, setVoters] = useState([]);
  const [finiksVotersData, setFiniksVotersData] = useState();
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleUpdate = () => {
    setUpdate(true);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setPage(page + 1);
    fetchVoters(page + 1);
  };

  const fetchVoters = async (value) => {
    let res = await getFiniksData({ bottomHit: value });
    console.log(res);
    if (res.data.success) {
      setVoters([...voters, ...res.data.finiksData]);
      setLoadingMore(false);
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    fetchVoters(1);
    setUpdate(false);
  }, [update === true]);

  // const handleScroll = () => {
  //   const bottom =
  //     Math.ceil(window.innerHeight + window.scrollY) >=
  //     document.documentElement.scrollHeight;

  //   if (bottom) {
  //     console.log("at the bottom");
  //     // setBottomHit(bottomHit + 1);
  //     // fetchVoters(bottomHit + 1);
  //   }
  // };

  // React.useEffect(() => {
  //   window.addEventListener("scroll", handleScroll, {
  //     passive: true,
  //   });

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <div style={{ backgroundColor: "#FCFCFC", height: "100vh" }}>
      <div className="mt-5 pl-xl-5 pr-4">
        {console.log(voters.length)}

        <br />
        <div className="row">
          <div className="col-2 col-xl-1"></div>
          <div className="col-10 col-xl-11">
            <Header name="Voter Records" purpose="Information of Users" />
            <br />
            <div>
              <div
                className=" p-3"
                style={{
                  height: "auto",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  boxShadow: " 0px 10px 24px #00000029",
                }}
              >
                <div className="d-flex justify-content-end">
                  {/* <Newcampaign /> */}
                  <button
                    style={{ color: "#FFFFFF", backgroundColor: "#d12e2f" }}
                    className="btn mr-2"
                  >
                    <Link
                      style={{ color: "white", textDecoration: "none" }}
                      to="/upload"
                    >
                      Upload Aristotle Data
                    </Link>
                  </button>

                  <Aristotledatapage />

                  {/* <button
                    style={{ color: "#FFFFFF", backgroundColor: "#d12e2f" }}
                    className="btn mr-2"
                  >
                    Advance Search
                  </button> */}
                  <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search"
                    style={{
                      width: "350px",
                      backgroundColor: "#F2F2F2",
                      border: "none",
                      // boxShadow: "0px 3px 10px #00000029",
                      // borderRadius: "15px",
                    }}
                  ></input>
                </div>
                <br />
                {voters.length === 0 && (
                  <div class="spinner-border text-danger" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                )}
                <div>{voters.length > 0 && <Finikstable data={voters} />}</div>
                <br />
                <div className="text-right">
                  {loadingMore && (
                    <button class="btn btn-danger" type="button" disabled>
                      <span
                        class="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Loading...</span>
                    </button>
                  )}

                  {loadingMore === false && (
                    <button className="btn btn-danger" onClick={handleLoadMore}>
                      {" "}
                      <i class="fas fa-cloud-download-alt"></i> Load More{" "}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voterdata;
