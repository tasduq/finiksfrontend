import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Taginfo from "./Taginfo";
import Clienttagspage from "./Clienttagspage";
import { ToastContainer, toast } from "react-toastify";
// import Editlist from "./Editlist";

export default function Clientstable({ data, dSelect, handleDSelect }) {
  const [openTags, setOpenTags] = React.useState(false);
  const [clientTagsList, setClientTagsList] = React.useState();

  const handleOpenTags = (list) => {
    console.log(list);
    setClientTagsList(list);
    setOpenTags(!openTags);
  };
  console.log(data);
  //   const handleDelete = async (data) => {
  //     console.log(data);
  //     const res = await deleteList({ id: data._id });
  //     console.log(res);
  //     if (res.data.success === true) {
  //       toast.success(res.data.message, {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //       handleUpdate();
  //     } else {
  //       toast.error(res.data.message, {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     }
  //   };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Campaign Name</TableCell>
            <TableCell align="right">Campaign Tags</TableCell>
            {/* <TableCell align="right"># of Tags</TableCell>
            <TableCell align="right">Active</TableCell> */}
            <TableCell align="center">View</TableCell>
            {/* <TableCell align="center">Edit</TableCell> */}
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((list) => {
            return (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                // onClick={() => handleClick(list)}
              >
                <TableCell component="th" scope="row">
                  {list?.campaignName}
                </TableCell>
                <TableCell align="right">{list?.tags?.length}</TableCell>
                <TableCell align="right">
                  {/* <Clienttagspage
                    dSelect={dSelect}
                    handleDSelect={handleDSelect}
                    data={list}
                  /> */}
                  <button
                    style={{
                      width: "150px",
                      height: "36px",
                      backgroundColor: "#D12E2F",
                      color: "white",
                    }}
                    className="btn "
                    // onClick={() => handleInfo(list._id)}
                    onClick={() => handleOpenTags(list)}
                  >
                    View
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
          {openTags && (
            <Clienttagspage
              data={clientTagsList}
              open={openTags}
              handleOpenTags={handleOpenTags}
              dSelect={dSelect}
              handleDSelect={handleDSelect}
              selectButtonDisabled={true}
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
