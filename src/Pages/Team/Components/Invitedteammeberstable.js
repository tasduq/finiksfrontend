import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Confirmdelete from "./Confirmdelete";
import { cancelInvite } from "../../../Connection/Team";
import { ToastContainer, toast } from "react-toastify";
import Editmember from "./Editmember";

export default function Listtable({
  teamAdmin,
  data,
  handleClick,
  handleUpdate,
  campaignId,
}) {
  console.log(data);
  const handleCancelInvite = async (data) => {
    console.log(data);
    const res = await cancelInvite({
      email: data,
      campaignId: !window.localStorage.getItem("campaignCode")
        ? campaignId
        : window.localStorage.getItem("id"),
    });
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
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="">Member Email</TableCell>
            <TableCell>Invited By</TableCell>
            <TableCell align="">Campaign permission</TableCell>
            <TableCell align="">Campaign Position</TableCell>
            <TableCell align="">Cancel Invite</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data
            ?.map((list) => {
              console.log(list);
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  // onClick={() => handleClick(list)}
                >
                  <TableCell component="th" scope="row">
                    {list?.email}
                  </TableCell>
                  <TableCell align="">{list?.inviterEmail}</TableCell>
                  <TableCell align="">{list?.permission}</TableCell>
                  <TableCell align="">{list?.campaignPosition}</TableCell>
                  <TableCell align="">
                    {" "}
                    <p
                      style={{ color: "#FFFFFF", backgroundColor: "#583689" }}
                      className="btn px-3 py-2 mx-2 mt-2"
                      onClick={() => handleCancelInvite(list?.email)}
                    >
                      Cancel invite
                    </p>
                  </TableCell>
                </TableRow>
              );
            })
            .reverse()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
