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
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Voter_ID</TableCell>
            <TableCell align="right">Voter</TableCell>
            <TableCell align="right">Party</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Sex</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Geo Location</TableCell>
            <TableCell align="right"></TableCell>
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
                <TableCell className="text-danger" align="right">
                  {voter.FIRSTNAME} {voter.LASTNAME}
                </TableCell>
                {voter.PARTY_CODE ? (
                  <>
                    {voter.PARTY_CODE === "A" && (
                      <TableCell align="right">American Independent</TableCell>
                    )}
                    {voter.PARTY_CODE === "B" && (
                      <TableCell align="right">Constitution Party</TableCell>
                    )}
                    {voter.PARTY_CODE === "C" && (
                      <TableCell align="right">Consumer</TableCell>
                    )}
                    {voter.PARTY_CODE === "D" && (
                      <TableCell align="right">Democrat</TableCell>
                    )}
                    {voter.PARTY_CODE === "E" && (
                      <TableCell align="right">Inferred Democrat</TableCell>
                    )}
                    {voter.PARTY_CODE === "F" && (
                      <TableCell align="right">Reform </TableCell>
                    )}
                    {voter.PARTY_CODE === "G" && (
                      <TableCell align="right">Green</TableCell>
                    )}
                    {voter.PARTY_CODE === "H" && (
                      <TableCell align="right">Liberal</TableCell>
                    )}
                    {voter.PARTY_CODE === "I" && (
                      <TableCell align="right">Independent</TableCell>
                    )}
                    {voter.PARTY_CODE === "J" && (
                      <TableCell align="right">UMOJA</TableCell>
                    )}
                    {voter.PARTY_CODE === "K" && (
                      <TableCell align="right">Independent NM Party</TableCell>
                    )}
                    {voter.PARTY_CODE === "L" && (
                      <TableCell align="right"> Libertarian</TableCell>
                    )}

                    {voter.PARTY_CODE === "N" && (
                      <TableCell align="right">
                        {" "}
                        None/Non-Partisan/No Party/No
                        Preference/Undeclared/Declined to
                        State/Undecided/Unaffiliated
                      </TableCell>
                    )}
                    {voter.PARTY_CODE === "O" && (
                      <TableCell align="right"> Other</TableCell>
                    )}
                    {voter.PARTY_CODE === "P" && (
                      <TableCell align="right"> Peace and Freedom</TableCell>
                    )}

                    {voter.PARTY_CODE === "R" && (
                      <TableCell align="right"> Republican</TableCell>
                    )}

                    {voter.PARTY_CODE === "S" && (
                      <TableCell align="right"> Inferred Republican</TableCell>
                    )}

                    {voter.PARTY_CODE === "T" && (
                      <TableCell align="right"> Right to Life</TableCell>
                    )}

                    {voter.PARTY_CODE === "U" && (
                      <TableCell align="right"> Unknown</TableCell>
                    )}

                    {voter.PARTY_CODE === "V" && (
                      <TableCell align="right"> Conservative</TableCell>
                    )}

                    {voter.PARTY_CODE === "W" && (
                      <TableCell align="right"> Natural Law</TableCell>
                    )}

                    {voter.PARTY_CODE === "Z" && (
                      <TableCell align="right"> Independance</TableCell>
                    )}

                    {voter.PARTY_CODE === undefined ||
                      null ||
                      ("" && <TableCell align="right"></TableCell>)}
                  </>
                ) : (
                  <TableCell align="right">Blank</TableCell>
                )}

                <TableCell align="right">{voter.AGE}</TableCell>
                <TableCell align="right">{voter.SEX}</TableCell>
                <TableCell align="right">{voter.STATE}</TableCell>
                <TableCell className="text-danger" align="right">
                  {voter.LATITUDE} {voter.LONGITUDE}
                </TableCell>

                <TableCell align="right">
                  <Editvoter data={voter} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
