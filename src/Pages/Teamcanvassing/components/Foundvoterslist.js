import React, { useState } from "react";
import { toast } from "react-toastify";

const Foundvoterlist = ({ data, handleSelectedVoter }) => {
  const [page, setPage] = useState(1);
  console.log(data?.slice(0, 5), "i am data");
  const handleLoad = () => {
    if (page * 5 !== data?.length) {
      setPage(page + 1);
    }

    if (page * 5 >= data?.length) {
      toast.success("You have reached end of results", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <div>
      {data?.slice(0, 5 * page)?.map((voter) => {
        return (
          <div>
            <div
              key={voter?._id}
              style={{ height: "102px", borderRight: "5px red #00000029" }}
              className="p-2 text-left m-3 border-top "
              onClick={() => handleSelectedVoter(voter)}
            >
              <h5 className="text-danger">
                {voter?.FIRSTNAME} {voter?.LASTNAME}
              </h5>
              <p className="text-muted">{voter?.ADDRESS}</p>
              <div className="pb-2">
                <div className="d-flex justify-content-between text-muted text-center ">
                  <p
                    style={{
                      // borderRight: "1px solid #707070",
                      fontSize: "19px",
                    }}
                  >
                    {voter?.SEX === "M" ? "Male" : "Female"}
                  </p>

                  <p>|</p>
                  <p
                    style={{
                      // borderRight: "1px solid #707070",
                      fontSize: "19px",
                    }}
                    className="text-center"
                  >
                    {voter?.AGE} Years Old
                  </p>
                  <p>|</p>
                  {voter?.PARTY_CODE === "A" && (
                    <p style={{ fontSize: "19px" }} align="">
                      American Independent
                    </p>
                  )}
                  {voter?.PARTY_CODE === "B" && (
                    <p style={{ fontSize: "19px" }} align="">
                      Constitution Party
                    </p>
                  )}
                  {voter?.PARTY_CODE === "C" && (
                    <p style={{ fontSize: "19px" }} align="">
                      Consumer
                    </p>
                  )}
                  {voter?.PARTY_CODE === "D" && (
                    <p style={{ fontSize: "19px" }} align="">
                      Democrat
                    </p>
                  )}
                  {voter?.PARTY_CODE === "E" && (
                    <p style={{ fontSize: "19px" }} align="">
                      Inferred Democrat
                    </p>
                  )}
                  {voter?.PARTY_CODE === "F" && (
                    <p style={{ fontSize: "19px" }} align="">
                      Reform{" "}
                    </p>
                  )}
                  {voter?.PARTY_CODE === "G" && (
                    <p style={{ fontSize: "19px" }} align="">
                      Green
                    </p>
                  )}
                  {voter?.PARTY_CODE === "H" && (
                    <p style={{ fontSize: "19px" }} align="">
                      Liberal
                    </p>
                  )}
                  {voter?.PARTY_CODE === "I" && (
                    <p style={{ fontSize: "19px" }} align="">
                      Independent
                    </p>
                  )}
                  {voter?.PARTY_CODE === "J" && (
                    <p style={{ fontSize: "19px" }} align="">
                      UMOJA
                    </p>
                  )}
                  {voter?.PARTY_CODE === "K" && (
                    <p style={{ fontSize: "19px" }} align="">
                      Independent NM Party
                    </p>
                  )}
                  {voter?.PARTY_CODE === "L" && (
                    <p style={{ fontSize: "19px" }} align="">
                      {" "}
                      Libertarian
                    </p>
                  )}

                  {voter?.PARTY_CODE === "N" && (
                    <p style={{ fontSize: "19px" }} align="">
                      {" "}
                      No Party
                    </p>
                  )}
                  {voter?.PARTY_CODE === "O" && (
                    <p style={{ fontSize: "19px" }} align="">
                      {" "}
                      Other
                    </p>
                  )}
                  {voter?.PARTY_CODE === "P" && (
                    <p style={{ fontSize: "19px" }} align="">
                      {" "}
                      Peace and Freedom
                    </p>
                  )}

                  {voter?.PARTY_CODE === "R" && (
                    <p style={{ fontSize: "19px" }} align="">
                      {" "}
                      Republican
                    </p>
                  )}

                  {voter?.PARTY_CODE === "S" && (
                    <p style={{ fontSize: "19px" }} align="">
                      {" "}
                      Inferred Republican
                    </p>
                  )}

                  {voter?.PARTY_CODE === "T" && (
                    <p style={{ fontSize: "19px" }} align="">
                      {" "}
                      to Life
                    </p>
                  )}

                  {voter?.PARTY_CODE === "U" && (
                    <p style={{ fontSize: "19px" }} align="">
                      {" "}
                      Unknown
                    </p>
                  )}

                  {voter?.PARTY_CODE === "V" && (
                    <p style={{ fontSize: "19px" }} align="">
                      {" "}
                      Conservative
                    </p>
                  )}

                  {voter?.PARTY_CODE === "W" && (
                    <p style={{ fontSize: "19px" }} align="">
                      {" "}
                      Natural Law
                    </p>
                  )}

                  {voter?.PARTY_CODE === "Z" && (
                    <p style={{ fontSize: "19px" }} align="">
                      {" "}
                      Independance
                    </p>
                  )}

                  {voter?.PARTY_CODE === undefined ||
                    null ||
                    ("" && <p style={{ fontSize: "19px" }} align=""></p>)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <button onClick={handleLoad} className="btn btn-danger my-2">
        Load More
      </button>
    </div>
  );
};

export default Foundvoterlist;
