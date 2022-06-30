import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Confirmdelete from "./Confirmdelete";
import { deleteList } from "../../../Connection/Phonebank";
import { ToastContainer, toast } from "react-toastify";
import Editlist from "./Editlist";

export default function Listtable({ data, handleClick, handleUpdate }) {
  console.log(data);
  const handleDelete = async (data) => {
    console.log(data);
    const res = await deleteList({ id: data._id });
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
            <TableCell>List Name</TableCell>
            <TableCell align="right">Total Numbers</TableCell>
            <TableCell align="right">Total Called</TableCell>
            <TableCell align="right">Numbers Left</TableCell>
            <TableCell align="right">Script</TableCell>
            <TableCell align="right">Voice Mail</TableCell>
            <TableCell align="right">Assigned Phonebankers</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((list) => {
            return (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleClick(list)}
              >
                <TableCell component="th" scope="row">
                  {list?.listName}
                </TableCell>
                <TableCell align="right">{list?.totalNumbers}</TableCell>
                <TableCell align="right">
                  {list?.totalCalled ? list?.totalCalled : "0"}
                </TableCell>
                <TableCell align="right">
                  {list?.numbersLeft ? list?.numbersLeft : "All"}
                </TableCell>
                <TableCell align="right">
                  {list?.scriptName ? list?.scriptName : "No Script Found"}
                </TableCell>
                <TableCell align="right">No VM Uploaded</TableCell>
                <TableCell align="right">
                  {list?.phoneBankerName
                    ? list?.phoneBankerName
                    : "No Assigned"}
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
                    Options
                  </button> */}
                  <div class="dropdown">
                    <button
                      style={{
                        color: "white",
                        backgroundColor: "#d12e2f",
                        width: "88px",
                        height: "36px",
                      }}
                      class="btn  dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Options
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      {/* <a class="dropdown-item" href="#">
                        Edit
                      </a> */}
                      <Editlist data={list} handleUpdateData={handleUpdate} />
                      <Confirmdelete handleDelete={handleDelete} data={list} />

                      {/* <a class="dropdown-item" href="#">
                        Re-Use
                      </a> */}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
