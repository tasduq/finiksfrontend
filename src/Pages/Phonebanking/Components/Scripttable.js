import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Confirmdelete from "../../../Components/Confirmdelete";
import Editscript from "../Components/Editscript";

export default function Scripttable({ data, handleDelete, handleUpdate }) {
  // const handleDelete = (id) => {};
  // const handleClick = (data, type) => {
  //   if (type === "delete") {
  //     handleDelete(data._id);
  //   } else {
  //     // handleEdit
  //   }
  // };
  console.log(data);
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Script Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Script</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((script) => {
            return (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {script.scriptName}
                </TableCell>
                <TableCell align="right">{script.description}</TableCell>
                <TableCell align="right">
                  {script.status === true ? "Active" : "In Active"}
                </TableCell>
                <TableCell align="right">
                  {script.script.substring(0, 20)}
                </TableCell>

                <TableCell align="right">
                  {/* <button
                    style={{
                      color: "white",
                      backgroundColor: "#d12e2f",
                      width: "143px",
                      height: "36px",
                    }}
                    className="btn"
                    // onClick={() => handleClick(script, "edit")}
                  >
                    Edit
                  </button> */}
                  <Editscript data={script} handleUpdate={handleUpdate} />
                </TableCell>
                <TableCell align="right">
                  {/* <button
                    style={{
                      color: "white",
                      backgroundColor: "#d12e2f",
                      width: "143px",
                      height: "36px",
                    }}
                    className="btn"
                    onClick={() => handleClick(script, "delete")}
                  >
                    Delete
                  </button> */}
                  <Confirmdelete handleDelete={handleDelete} data={script} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
