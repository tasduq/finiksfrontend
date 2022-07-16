import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Editvoter from "./Editvoter";

export default function Finikstable({ data }) {
  console.log(data);
  const [voterData, setVoterData] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (data) => {
    if (open === false) {
      setVoterData(data);
    }

    setOpen(!open);
  };
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Voter_ID</TableCell>
            <TableCell align="">Voter</TableCell>
            <TableCell align="">Party</TableCell>
            <TableCell align="">Age</TableCell>
            <TableCell align="">Sex</TableCell>
            <TableCell align="">State</TableCell>
            <TableCell align="">Geo Location</TableCell>
            <TableCell align=""></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((voter) => {
            return (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {voter.VOTER_ID}
                </TableCell>
                <TableCell className="text-danger" align="">
                  {/* <Editvoter
                    data={voter}
                    buttonName={`${voter.FIRSTNAME} ${voter.LASTNAME}`}
                    
                  /> */}
                  <button
                    className="text-danger btn btn-sm"
                    onClick={() => handleClickOpen(voter)}
                  >
                    {voter.FIRSTNAME} {voter.LASTNAME}
                  </button>
                </TableCell>
                {voter.PARTY_CODE ? (
                  <>
                    {voter.PARTY_CODE === "A" && (
                      <TableCell align="">American Independent</TableCell>
                    )}
                    {voter.PARTY_CODE === "B" && (
                      <TableCell align="">Constitution Party</TableCell>
                    )}
                    {voter.PARTY_CODE === "C" && (
                      <TableCell align="">Consumer</TableCell>
                    )}
                    {voter.PARTY_CODE === "D" && (
                      <TableCell align="">Democrat</TableCell>
                    )}
                    {voter.PARTY_CODE === "E" && (
                      <TableCell align="">Inferred Democrat</TableCell>
                    )}
                    {voter.PARTY_CODE === "F" && (
                      <TableCell align="">Reform </TableCell>
                    )}
                    {voter.PARTY_CODE === "G" && (
                      <TableCell align="">Green</TableCell>
                    )}
                    {voter.PARTY_CODE === "H" && (
                      <TableCell align="">Liberal</TableCell>
                    )}
                    {voter.PARTY_CODE === "I" && (
                      <TableCell align="">Independent</TableCell>
                    )}
                    {voter.PARTY_CODE === "J" && (
                      <TableCell align="">UMOJA</TableCell>
                    )}
                    {voter.PARTY_CODE === "K" && (
                      <TableCell align="">Independent NM Party</TableCell>
                    )}
                    {voter.PARTY_CODE === "L" && (
                      <TableCell align=""> Libertarian</TableCell>
                    )}

                    {voter.PARTY_CODE === "N" && (
                      <TableCell align="">
                        {" "}
                        None/Non-Partisan/No Party/No
                        Preference/Undeclared/Declined to
                        State/Undecided/Unaffiliated
                      </TableCell>
                    )}
                    {voter.PARTY_CODE === "O" && (
                      <TableCell align=""> Other</TableCell>
                    )}
                    {voter.PARTY_CODE === "P" && (
                      <TableCell align=""> Peace and Freedom</TableCell>
                    )}

                    {voter.PARTY_CODE === "R" && (
                      <TableCell align=""> Republican</TableCell>
                    )}

                    {voter.PARTY_CODE === "S" && (
                      <TableCell align=""> Inferred Republican</TableCell>
                    )}

                    {voter.PARTY_CODE === "T" && (
                      <TableCell align=""> Right to Life</TableCell>
                    )}

                    {voter.PARTY_CODE === "U" && (
                      <TableCell align=""> Unknown</TableCell>
                    )}

                    {voter.PARTY_CODE === "V" && (
                      <TableCell align=""> Conservative</TableCell>
                    )}

                    {voter.PARTY_CODE === "W" && (
                      <TableCell align=""> Natural Law</TableCell>
                    )}

                    {voter.PARTY_CODE === "Z" && (
                      <TableCell align=""> Independance</TableCell>
                    )}

                    {voter.PARTY_CODE === undefined ||
                      null ||
                      ("" && <TableCell align=""></TableCell>)}
                  </>
                ) : (
                  <TableCell align="">Blank</TableCell>
                )}

                <TableCell align="">{voter.AGE}</TableCell>
                <TableCell align="">{voter.SEX}</TableCell>
                <TableCell align="">{voter.STATE}</TableCell>
                <TableCell className="text-danger" align="">
                  {voter.LATITUDE} {voter.LONGITUDE}
                </TableCell>

                <TableCell align="">
                  <button
                    style={{
                      color: "white",
                      backgroundColor: "#d12e2f",
                      width: "88px",
                      height: "36px",
                    }}
                    className="btn"
                    onClick={() => handleClickOpen(voter)}
                  >
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
          {voterData && (
            <Editvoter
              data={voterData}
              handleClickOpen={handleClickOpen}
              open={open}
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
