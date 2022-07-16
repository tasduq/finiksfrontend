import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Taginfo from "./Taginfo";
import { ToastContainer, toast } from "react-toastify";
import Edittag from "./Edittag";
import Confirmdelete from "../../../Components/Confirmdelete";
import { deleteTag } from "../../../Connection/Tags";

export default function Tagstable({
  data,
  handleSelected,
  dSelect,
  handleDSelect,
  handleUpdate,
  selectButtonDisabled,
}) {
  const [selectedTags, setSelectedTags] = React.useState([]);
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

  const handleSelect = (id) => {
    if (selectedTags.length < 2) {
      setSelectedTags([...selectedTags, id]);
      handleSelected([...selectedTags, id]);
    } else {
      toast.error("Cannot select more than 2", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleUnSelect = (id) => {
    console.log(id);
    let yoo = selectedTags.filter((tag) => {
      return tag !== id;
    });
    console.log(yoo);
    setSelectedTags(yoo);
    handleSelected(yoo);
  };

  const handleDelete = async (id) => {
    console.log(id);
    const res = await deleteTag({ id: id });
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

  React.useEffect(() => {
    setSelectedTags([]);
    if (handleDSelect) {
      handleDSelect();
    }
  }, [dSelect === true]);

  return (
    <TableContainer>
      {console.log(selectedTags)}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tag Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right"># of Tags</TableCell>
            <TableCell align="right">Active</TableCell>
            <TableCell align="center">View</TableCell>
            <TableCell align="center">Edit</TableCell>
            {selectButtonDisabled !== true && (
              <TableCell align="center">Select To Merge</TableCell>
            )}
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((list) => {
            return (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                style={{
                  backgroundColor: `${
                    selectedTags[0] === list._id || selectedTags[1] === list._id
                      ? "#D12E2F"
                      : ""
                  }`,
                }}
                // onClick={() => handleClick(list)}
              >
                <TableCell component="th" scope="row">
                  {list?.tagName}
                </TableCell>
                <TableCell align="right">{list?.description}</TableCell>
                <TableCell align="right">
                  {list?.users ? list?.users.length : "0"}
                </TableCell>
                <TableCell align="right">
                  {list?.active ? "Active" : "In Active"}
                </TableCell>

                <TableCell align="right">
                  <Taginfo data={list._id} />
                </TableCell>

                <TableCell align="right">
                  {/* <button
                    style={{
                      width: "150px",
                      height: "36px",
                      backgroundColor: "#D12E2F",
                      color: "white",
                    }}
                    className="btn "
                  >
                    Edit
                  </button>
                   */}
                  <Edittag handleUpdate={handleUpdate} data={list} />
                </TableCell>
                <TableCell align="right">
                  {selectButtonDisabled !== true && (
                    <button
                      style={{
                        width: "150px",
                        height: "36px",
                        backgroundColor: "#D12E2F",
                        color: "white",
                      }}
                      className="btn "
                      onClick={
                        selectedTags[0] === list._id ||
                        selectedTags[1] === list._id
                          ? () => handleUnSelect(list._id)
                          : () => handleSelect(list._id)
                      }
                    >
                      {selectedTags[0] === list._id ||
                      selectedTags[1] === list._id
                        ? "Un Select"
                        : "Select"}
                    </button>
                  )}
                  {/* <button
                    style={{
                      width: "150px",
                      height: "36px",
                      backgroundColor: "#D12E2F",
                      color: "white",
                    }}
                    className="btn "
                    onClick={
                      selectedTags[0] === list._id ||
                      selectedTags[1] === list._id
                        ? () => handleUnSelect(list._id)
                        : () => handleSelect(list._id)
                    }
                  >
                    {selectedTags[0] === list._id ||
                    selectedTags[1] === list._id
                      ? "Un Select"
                      : "Select"}
                  </button> */}

                  {/* {selectedTags.includes(list._id) === true && (
                    <button
                      style={{
                        width: "150px",
                        height: "36px",
                        backgroundColor: "#D12E2F",
                        color: "white",
                      }}
                      className="btn "
                      onClick={() => handleUnSelect(list._id)}
                    >
                      Select
                    </button>
                  )} */}
                </TableCell>
                <TableCell align="right">
                  {console.log(list._id)}
                  <Confirmdelete handleDelete={handleDelete} data={list._id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
