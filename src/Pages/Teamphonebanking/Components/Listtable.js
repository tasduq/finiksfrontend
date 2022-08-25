import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { deleteList } from "../../../Connection/Phonebank";
import { ToastContainer, toast } from "react-toastify";
import { saveRecord } from "../../../Connection/Phonebank";
import Voterview from "./Voterview";

export default function Listtable({
  data,
  handleClick,
  handleUpdate,
  campaignFilterData,
}) {
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

  const handleDuplicate = async (data) => {
    console.log(data);
    // setSaving(true);
    const res = await saveRecord({
      ...data,
      selectedList: data.list,
      selectedScript: { scriptName: data.scriptName, _id: data.scriptId },
    });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      // setSaving(false);
      // handleClose();
      handleUpdate();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      // setSaving(false);
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
            {/* <TableCell align="right">Numbers Left</TableCell> */}
            <TableCell align="right">Script</TableCell>
            {/* <TableCell align="right"></TableCell> */}
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((list) => {
            console.log(list);
            return (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                // onClick={() => handleClick(list)}
              >
                <TableCell component="th" scope="row">
                  <Voterview handleUpdateTable={handleUpdate} data={list} />
                </TableCell>
                <TableCell align="right">{list?.totalNumbers}</TableCell>
                <TableCell align="right">
                  {list?.totalCalled ? list?.totalCalled : "0"}
                </TableCell>
                {/* <TableCell align="right">
                  {list?.numbersLeft ? list?.numbersLeft : "All"}
                </TableCell> */}
                <TableCell align="right">
                  {list?.scriptName ? list?.scriptName : "No Script Found"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
