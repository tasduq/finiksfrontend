import * as React from "react";
import Header from "../../Components/Header";
import Addnewmember from "./Components/Addnewmember";
import Teamtable from "./Components/Teamtable";
import { ToastContainer, toast } from "react-toastify";
import { getTeam, getTeamAdmin } from "../../Connection/Campaign";
import Addvotertoteam from "./Components/Addvotertoteam";
import Invitedteammembers from "./Components/Invitedteammembers";

const Team = () => {
  const [update, setUpdate] = React.useState(false);
  const [foundTeam, setFoundTeam] = React.useState();
  const [foundTeamAdmin, setFoundTeamAdmin] = React.useState();

  const handleUpdate = () => {
    setUpdate(true);
  };

  React.useEffect(() => {
    const handleGetTeam = async () => {
      const res = await getTeam({
        campaignId: window.localStorage.getItem("id"),
      });
      console.log(res);
      if (res.data.success === true) {
        setFoundTeam(res.data.team);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    const handleGetTeamAdmin = async () => {
      const res = await getTeamAdmin({
        campaignId: window.localStorage.getItem("id"),
      });
      console.log(res);
      if (res.data.success === true) {
        setFoundTeamAdmin(res.data.team);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    handleGetTeam();
    handleGetTeamAdmin();
    setUpdate(false);
  }, [update === true]);
  return (
    <div style={{ backgroundColor: "#FCFCFC", height: "100vh" }}>
      <div className=" pl-xl-5 pr-4">
        <br />
        <div className="row">
          <div className="col-2 col-xl-1"></div>
          <div className="col-10 col-xl-11">
            <Header
              name="Team Members"
              purpose="Contact Information , Permissions and Campaign Structure"
            />
            <br />
            <div
              className=" p-4"
              style={{
                height: "auto",
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                boxShadow: " 0px 10px 24px #00000029",
              }}
            >
              <div className="text-right d-flex justify-content-end">
                {" "}
                <Invitedteammembers />
                <Addnewmember data="" handleUpdateData={handleUpdate} />
                <Addvotertoteam handleUpdateData={handleUpdate} />
              </div>
              <br />
              {foundTeam === undefined && (
                <div class="spinner-border text-danger" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
              {foundTeam && (
                <Teamtable
                  teamAdmin={foundTeamAdmin}
                  handleUpdate={handleUpdate}
                  data={foundTeam}
                />
              )}

              {foundTeam?.length === 0 && <p>No Team Found Make One</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
