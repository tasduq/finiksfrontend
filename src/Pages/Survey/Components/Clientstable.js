import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Taginfo from "./Taginfo";
import Clientssurveyspage from "./Clientssurveyspage";
import { ToastContainer, toast } from "react-toastify";
// import Editlist from "./Editlist";

export default function Clientstable({ data, dSelect, handleDSelect }) {
  const [openSurvey, setOpenSurvey] = React.useState(false);
  const [clientSurveyList, setClientSurveyList] = React.useState();

  const handleOpenSurvey = (list) => {
    console.log(list);
    setClientSurveyList(list);
    setOpenSurvey(!openSurvey);
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
            <TableCell align="right"># Survey Questions</TableCell>
            {/* <TableCell align="right"># of Tags</TableCell> */}
            <TableCell align="right"># Survey Responses</TableCell>
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
                <TableCell align="right">
                  {list?.surveyQuestions?.length}
                </TableCell>
                {/* {console.log(list)} */}
                <TableCell align="right">
                  {
                    list?.surveyQuestions?.reduce((first, second) => {
                      console.log(first, second);
                      return {
                        ...second,
                        responses: first.responses + second.responses,
                      };
                    }).responses
                  }
                </TableCell>
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
                    onClick={() => handleOpenSurvey(list)}
                  >
                    View
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
          {openSurvey && (
            <Clientssurveyspage
              data={clientSurveyList}
              open={openSurvey}
              handleOpenSurvey={handleOpenSurvey}
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
