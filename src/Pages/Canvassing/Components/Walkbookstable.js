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
import { saveRecord } from "../../../Connection/Canvassing";
import Walkbookspage from "./Walkbookspage";

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
            <TableCell>Walk book Name</TableCell>
            <TableCell align="right">Voters</TableCell>
            <TableCell align="right">Knocked</TableCell>
            <TableCell align="right">Reached</TableCell>
            <TableCell align="right">Surveyed</TableCell>
            <TableCell align="right">Creation Date</TableCell>
            <TableCell align="right">Active/InActive</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.walkBooks?.map((list) => {
            return (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleClick(list)}
              >
                <TableCell
                  className={
                    (`${list.active === "Active" && "text-warning"}`,
                    `${list.active === "Completed" && "text-success"}`)
                  }
                  component="th"
                  scope="row"
                >
                  {list?.name}
                </TableCell>
                <TableCell align="right">{list?.voters}</TableCell>
                <TableCell align="right">
                  {list?.totalCalled ? list?.totalCalled : "0"}
                </TableCell>
                <TableCell align="right">
                  {list?.reached ? list?.reached : 0}
                </TableCell>
                <TableCell align="right">
                  {list?.surveyed ? list?.surveyed : 0}
                </TableCell>
                <TableCell align="right">
                  {list?.created ? list?.created.split("T")[0] : 0}
                </TableCell>
                <TableCell
                  className={
                    (`${list.active === "Active" && "text-warning"}`,
                    `${list.active === "Completed" && "text-success"}`)
                  }
                  align="right"
                >
                  {list?.active}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
