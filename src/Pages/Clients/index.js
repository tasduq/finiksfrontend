import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Tableclients from "./Components/Table";
import Newcampaign from "./Components/Newcampaign";
import { getClients } from "../../Connection/Clients";
import { ToastContainer, toast } from "react-toastify";

const Clients = () => {
  const [clients, setClients] = useState();
  const [update, setUpdate] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searched, setSearched] = useState();

  const handleUpdate = () => {
    setUpdate(true);
  };

  const handleSearch = (evt) => {
    if (evt.target.value.length > 0) {
      setSearching(true);
      let yoo;
      setSearchValue(evt.target.value);
      yoo = clients.filter((client) => {
        return client.campaignName
          .toLowerCase()
          .includes(evt.target.value.toLowerCase());
      });
      setSearched(yoo);
    } else {
      setSearching(false);
      setSearchValue(evt.target.value);
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      let res = await getClients();
      console.log(res);
      if (res.data.success) {
        setClients(res.data.clients);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    fetchClients();
    setUpdate(false);
  }, [update === true]);
  return (
    <div style={{ backgroundColor: "#FCFCFC", height: "100vh" }}>
      <div className="mt-5 pl-xl-5 pr-4">
        <br />
        <div className="row">
          <div className="col-2 col-xl-1"></div>
          <div className="col-10 col-xl-11">
            {" "}
            <Header
              name="Clients-Admin"
              purpose="List of Users for Software - Ability to add new User and see/edit all activity"
            />
            <br />
            <div>
              <div
                className=" p-3"
                style={{
                  height: "500px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  boxShadow: " 0px 10px 24px #00000029",
                }}
              >
                {clients ? (
                  <div>
                    <div className="d-flex justify-content-end">
                      <Newcampaign handleUpdate={handleUpdate} />
                      <input
                        type="text"
                        className="form-control shadow-sm"
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
                    </div>
                    <br />
                    <div>
                      <Tableclients
                        data={searching === true ? searched : clients}
                        handleUpdate={handleUpdate}
                      />
                    </div>
                  </div>
                ) : (
                  <div class="spinner-border text-danger" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
