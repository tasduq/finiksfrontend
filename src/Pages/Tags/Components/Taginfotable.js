import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import Editvoter from "./Editvoter";
import { ToastContainer, toast } from "react-toastify";

export default function Tablevoters({ data }) {
  console.log(data);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Campaign Name</TableCell>
            <TableCell align="right">Tag</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">SubUser</TableCell>
            <TableCell align="right">Voter</TableCell>
            <TableCell align="right">Record Type</TableCell>
            <TableCell align="right">Geo Location</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Time</TableCell>
            {/* <TableCell align="right"></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.users.map((voter) => {
            return (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {voter?.campaignName}
                </TableCell>
                <TableCell className="text-danger" align="right">
                  {data.tagName}
                </TableCell>
                <TableCell align="right">{data.description}</TableCell>

                <TableCell align="right">{voter.subUserName}</TableCell>
                <TableCell align="right">{voter.voterName}</TableCell>
                <TableCell align="right">{voter.recordType}</TableCell>
                <TableCell className="text-danger" align="right">
                  {voter.geoLocation}
                </TableCell>
                <TableCell className="text-danger" align="right">
                  {voter.date}
                </TableCell>
                <TableCell className="text-danger" align="right">
                  {voter.time}
                </TableCell>

                {/* <TableCell align="right">
                  <Editvoter data={voter} />
                </TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
