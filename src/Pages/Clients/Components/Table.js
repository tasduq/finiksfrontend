import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Editclient from "./Editclient";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function Tableclients({ data, handleUpdate }) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Campaign Name</TableCell>
            <TableCell align="right">District</TableCell>
            <TableCell align="right">Primary/General</TableCell>
            <TableCell align="right">Party</TableCell>
            <TableCell align="right">Surveys</TableCell>
            <TableCell align="right">Tags</TableCell>
            <TableCell align="right">Team Members</TableCell>
            <TableCell align="right">Spent</TableCell>
            <TableCell align="right">Active</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((client) => {
            return (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {client.campaignName}
                </TableCell>
                <TableCell align="right">{client.district}</TableCell>
                <TableCell align="right">{client.election}</TableCell>
                <TableCell align="right">Dem</TableCell>
                <TableCell className="text-danger" align="right">
                  View
                </TableCell>
                <TableCell className="text-danger" align="right">
                  View
                </TableCell>
                <TableCell className="text-danger" align="right">
                  View
                </TableCell>
                <TableCell align="right">31000$</TableCell>
                <TableCell className="text-danger" align="right">
                  Yes
                </TableCell>
                <TableCell align="right">
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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
