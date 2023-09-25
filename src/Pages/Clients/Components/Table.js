import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Editclient from "./Editclient";
import Confirmdelete from "../../../Components/Confirmdelete";
import { deleteClient } from "../../../Connection/Clients";
import { ToastContainer, toast } from "react-toastify";
import Clientssurveyspage from "../../Survey/Components/Clientssurveyspage";
import ClientsTagsspage from "../../Tags/Components/Clienttagspage";
import Viewteammembers from "./Viewteammembers";

export default function Tableclients({ data, handleUpdate }) {
  const [openSurvey, setOpenSurvey] = React.useState(false);
  const [clientSurveyId, setClientSurveyId] = React.useState();

  const [openTags, setOpenTags] = React.useState(false);
  const [clientTagsId, setClientTagsId] = React.useState();

  const [openTeammembers, setOpenTeammembers] = React.useState(false);
  const [teammembersData, setTeammmebersData] = React.useState();

  const handleOpenSurvey = (id) => {
    console.log(id);
    setClientSurveyId(id);
    setOpenSurvey(!openSurvey);
  };

  const handleOpenTags = (id) => {
    console.log(id);
    setClientTagsId(id);
    setOpenTags(!openTags);
  };

  const handleOpenTeammembers = (data) => {
    console.log(data);
    setTeammmebersData(data);
    setOpenTeammembers(!openTeammembers);
  };

  const handleDelete = async (id) => {
    console.log(data);
    const res = await deleteClient({ id: id });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleUpdate();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleDistrictsFormatting = (distincts) => {
    const separator = ", ";
    const resultString = distincts.join(separator);
    return resultString;
  };
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="">Active</TableCell>
            <TableCell>Campaign Name</TableCell>
            <TableCell align="">District</TableCell>
            <TableCell align="">Primary/General</TableCell>
            <TableCell align="">Party</TableCell>
            <TableCell align="">Surveys</TableCell>
            <TableCell align="">Tags</TableCell>
            <TableCell align="">Team Members</TableCell>
            <TableCell align="">Spent</TableCell>

            <TableCell align=""></TableCell>
            <TableCell align=""></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((client) => {
            console.log(client.district, "i am districts");
            return (
              client.role !== "superadmin" && (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="text-danger" align="">
                    {/* {client.active === true ? "Yes" : "No"} */}
                    <div className="d-flex justify-content-center align-items-center">
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          backgroundColor: `${
                            client.active === true ? "#49C661" : "grey"
                          }`,
                          color: "green",
                          borderRadius: "50%",
                        }}
                      ></div>
                    </div>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {client?.campaignName}
                  </TableCell>
                  <TableCell align="">
                    {client?.district
                      ? handleDistrictsFormatting(client?.district)
                      : []}
                  </TableCell>
                  <TableCell align="">{`${client?.election[0].toUpperCase()}${client?.election
                    .toString()
                    .substring(1)}`}</TableCell>
                  <TableCell align="">Dem</TableCell>
                  <TableCell className="text-danger" align="">
                    <button
                      className="text-danger btn"
                      onClick={() => handleOpenSurvey(client?._id)}
                    >
                      View
                    </button>
                  </TableCell>
                  <TableCell className="text-danger" align="">
                    <button
                      className="text-danger btn"
                      onClick={() => handleOpenTags(client?._id)}
                    >
                      View
                    </button>
                  </TableCell>
                  <TableCell className="text-danger" align="">
                    {/* <Viewteammembers data={client.teamMembers} /> */}
                    <button
                      className="text-danger btn"
                      onClick={() =>
                        handleOpenTeammembers({
                          emails: client?.teamMembers,
                          campaignId: client?._id,
                        })
                      }
                    >
                      View
                    </button>
                  </TableCell>
                  <TableCell align="">0$</TableCell>

                  <TableCell align="">
                    {/* <button
                    style={{
                      color: "white",
                      backgroundColor: "#d12e2f",
                      width: "88px",
                      height: "36px",
                    }}
                    className="btn"
                  >
                    Edit
                  </button> */}
                    <Editclient data={client} handleUpdate={handleUpdate} />
                  </TableCell>
                  <TableCell align="">
                    {/* <button
                    style={{
                      color: "white",
                      backgroundColor: "#d12e2f",
                      width: "88px",
                      height: "36px",
                    }}
                    className="btn"
                  >
                    Edit
                  </button> */}
                    <Confirmdelete
                      handleDelete={handleDelete}
                      data={client?._id}
                    />
                  </TableCell>
                </TableRow>
              )
            );
          })}
          {openSurvey && (
            <Clientssurveyspage
              data={clientSurveyId}
              getDataFromServer={true}
              open={openSurvey}
              handleOpenSurvey={handleOpenSurvey}
            />
          )}

          {openTags && (
            <ClientsTagsspage
              data={clientTagsId}
              getDataFromServer={true}
              open={openTags}
              handleOpenTags={handleOpenTags}
              selectButtonDisabled={true}
            />
          )}

          {openTeammembers && (
            <Viewteammembers
              data={teammembersData}
              open={openTeammembers}
              handleOpenTeammembers={handleOpenTeammembers}
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
