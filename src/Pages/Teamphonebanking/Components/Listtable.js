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
            <TableCell className="w-50">List Name</TableCell>
            {/* <TableCell align="right">Total Numbers</TableCell>
            <TableCell align="right">Total Called</TableCell> */}
            {/* <TableCell align="right">Numbers Left</TableCell> */}
            {/* <TableCell align="right">Script</TableCell> */}
            <TableCell className="mr-3" align="center">
              Active
            </TableCell>
          </TableRow>
        </TableHead>

        {/* <TableBody> */}

        {/* </TableBody> */}
      </Table>
      {data?.map((list) => {
        console.log(list);
        return (
          // <TableRow
          //   // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          //   // onClick={() => handleClick(list)}
          //   className="mx-2"
          //   // style={{ border: "1px solid #D9D9D9", borderRadius: "5px" }}
          // >

          <div className="my-3">
            <Voterview handleUpdateTable={handleUpdate} data={list} />

            {/* <div className="my-2">
            <div
              style={{ border: "1px solid #D9D9D9", borderRadius: "5px" }}
              className="d-flex justify-content-between shadow-sm "
            >
              <div className=" w-50">
            
              </div>

              <div className="mt-3 ml-5 w-50 text-center d-flex justify-content-center">
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: `${
                      list.active === "Active" ? "#49C661" : "grey"
                    }`,
                    color: "green",
                    borderRadius: "50%",
                    className: "",
                  }}
                ></div>
              </div>
            </div>
          </div> */}
          </div>

          // </TableRow>
        );
      })}
    </TableContainer>
  );
}
