import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Confirmdelete from "./Confirmdelete";
import { deleteList } from "../../../Connection/Canvassing";
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
    let newWalkbooks = [];
    if (data?.walkBooks.length > 0) {
      newWalkbooks = data?.walkBooks.map((walkbook) => {
        return {
          ...walkbook,
          knocked: 0,
          reached: 0,
          surveyed: 0,
        };
      });
    }
    console.log(newWalkbooks);

    // setSaving(true);
    const res = await saveRecord({
      ...data,
      selectedList: data.list,
      selectedScript: { scriptName: data.scriptName, _id: data.scriptId },
      walkbooks: newWalkbooks,
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
            <TableCell align="right">Voters</TableCell>
            <TableCell align="right">Knocked</TableCell>
            <TableCell align="right">Reached</TableCell>
            <TableCell align="right">Surveyed</TableCell>
            <TableCell align="right">Creation Date</TableCell>
            <TableCell align="right">Active/InActive</TableCell>

            <TableCell align="right">Options</TableCell>
            <TableCell align="right">Walkbooks</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((list) => {
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
                  {list?.recordName}
                </TableCell>
                <TableCell align="right">{list?.totalNumbers}</TableCell>
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
                  {list?.active ? list?.active : "In Active"}
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
                      <a
                        onClick={() => handleDuplicate(list)}
                        class="dropdown-item"
                      >
                        {" "}
                        Re-Use
                      </a>
                      <Editlist
                        campaignFilterData={campaignFilterData}
                        data={list}
                        handleUpdateData={handleUpdate}
                      />
                      <Confirmdelete handleDelete={handleDelete} data={list} />

                      {/* <a class="dropdown-item" href="#">
                        Re-Use
                      </a> */}
                    </div>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Walkbookspage data={list} />
                </TableCell>
                {/* {list?.walkBooks.length > 0 &&
                  list.walkBooks.map((walkbook) => {
                    return (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        // onClick={() => handleClick(list)}
                      >
                        <TableCell
                          className={
                            (`${
                              walkbook.active === "Active" && "text-warning"
                            }`,
                            `${
                              walkbook.active === "Completed" && "text-success"
                            }`)
                          }
                          component="th"
                          scope="row"
                        >
                          {walkbook?.name}
                        </TableCell>
                        <TableCell align="right">
                          {walkbook?.totalNumbers}
                        </TableCell>
                        <TableCell align="right">
                          {walkbook?.totalCalled ? walkbook?.totalCalled : "0"}
                        </TableCell>
                        <TableCell align="right">
                          {walkbook?.reached ? walkbook?.reached : 0}
                        </TableCell>
                        <TableCell align="right">
                          {walkbook?.surveyed ? walkbook?.surveyed : 0}
                        </TableCell>
                        <TableCell align="right">
                          {walkbook?.created
                            ? walkbook?.created.split("T")[0]
                            : 0}
                        </TableCell>
                        <TableCell
                          className={
                            (`${
                              walkbook.active === "Active" && "text-warning"
                            }`,
                            `${
                              walkbook.active === "Completed" && "text-success"
                            }`)
                          }
                          align="right"
                        >
                          {walkbook?.active ? walkbook?.active : "In Active"}
                        </TableCell>
                      </TableRow>
                    );
                  })} */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
