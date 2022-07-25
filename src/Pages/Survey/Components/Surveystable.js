import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Taginfo from "./Taginfo";
import { ToastContainer, toast } from "react-toastify";
// import Editlist from "./Editlist";
import Viewsurveypage from "./Viewsurveypage";

export default function Surveystable({ data }) {
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [openSurveyPage, setOpenSurveyPage] = React.useState(false);
  const [surveyPageData, setSurveyPageData] = React.useState();

  const handleClickOpenSurveyPage = (data) => {
    // if (data.campaignOwnerId !== undefined) {
    //   setSurveyPageData(data);
    // }

    setOpenSurveyPage(!openSurveyPage);
    setSurveyPageData(data);
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

  //   const handleSelect = (id) => {
  //     if (selectedTags.length < 2) {
  //       setSelectedTags([...selectedTags, id]);
  //       handleSelected([...selectedTags, id]);
  //     } else {
  //       toast.error("Cannot select more than 2", {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     }
  //   };

  //   const handleUnSelect = (id) => {
  //     console.log(id);
  //     let yoo = selectedTags.filter((tag) => {
  //       return tag !== id;
  //     });
  //     console.log(yoo);
  //     setSelectedTags(yoo);
  //     handleSelected(yoo);
  //   };

  React.useEffect(() => {}, []);

  return (
    <TableContainer>
      {console.log(data)}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Campaign Name</TableCell>
            <TableCell align="right">Survey</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right"># of Responses</TableCell>
            <TableCell align="center">Script</TableCell>
            <TableCell align="center">View</TableCell>
            {/* <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Select To Merge</TableCell> */}
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.surveyQuestions?.map((list) => {
            return (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                // onClick={() => handleClick(list)}
              >
                <TableCell component="th" scope="row">
                  {data?.campaignName}
                </TableCell>
                <TableCell align="right">{list?.surveyName}</TableCell>
                <TableCell align="right">{list?.surveyPreview}</TableCell>
                <TableCell align="right">{list?.responses}</TableCell>

                <TableCell align="right">{list?.surveyQuestion}</TableCell>
                <TableCell align="right">
                  <button
                    style={{
                      width: "150px",
                      height: "36px",
                      backgroundColor: "#D12E2F",
                      color: "white",
                    }}
                    className="btn "
                    // onClick={() => handleInfo(list._id)}
                    onClick={() =>
                      handleClickOpenSurveyPage({
                        survey: list,
                        campaignOwnerId: data.campaignOwnerId,
                        campaignName: data.campaignName,
                      })
                    }
                  >
                    View
                  </button>
                </TableCell>

                {/* <TableCell align="right">
                  <button
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
                </TableCell> */}
                {/* <TableCell align="right">
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

                  
                </TableCell> */}
              </TableRow>
            );
          })}
          {surveyPageData && (
            <Viewsurveypage
              data={surveyPageData}
              open={openSurveyPage}
              handleClickOpen={handleClickOpenSurveyPage}
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
