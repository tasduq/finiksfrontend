import React, { useState } from "react";
import { toast } from "react-toastify";

const Foundvoterlist = ({ data, handleSelectedVoter }) => {
  const [page, setPage] = useState(1);
  const [colors, setColors] = React.useState([
    { name: "Orange", code: "#FF914D" },
    { name: "Yellow", code: "#FFBD59" },
    { name: "Blue", code: "#5271FF" },
    { name: "Green", code: "#00C2CB" },
    { name: "Purple", code: "#8C52FF" },
    { name: "Red", code: "#FF5757" },
  ]);
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
            {/* <hr className="  " /> */}
            <button
              key={voter?._id}
              style={{
                minHeight: "102px",
                height: "auto",
                borderRight: `12px solid ${
                  colors[Math.floor(Math.random() * 6)].code
                } `,
              }}
              className="  text-left border-top  btn w-100"
              onClick={() => handleSelectedVoter(voter)}
            >
              <button className="text-danger mt-1 btn btn-lg p-0">
                {voter?.FIRSTNAME} {voter?.LASTNAME}
              </button>
              <div className="mx-5">
                <p
                  style={{
                    // borderRight: "1px solid #707070",
                    fontSize: "12px",
                  }}
                  className="text-muted"
                >
                  {voter?.ADDRESS}
                </p>
                <div className="pb-2">
                  <div className="d-flex justify-content-between text-muted text-center ">
                    <p
                      style={{
                        // borderRight: "1px solid #707070",
                        fontSize: "12px",
                      }}
                      className=""
                    >
                      {voter?.SEX === "M" ? "Male" : "Female"}
                    </p>

                    <p className="mx-2">|</p>
                    <p
                      style={{
                        // borderRight: "1px solid #707070",
                        fontSize: "12px",
                      }}
                      className="text-center"
                    >
                      {voter?.AGE} Years Old
                    </p>
                    <p className="mx-2">|</p>
                    {voter?.PARTY_CODE === "A" && (
                      <p style={{ fontSize: "12px" }} align="">
                        American Independent
                      </p>
                    )}
                    {voter?.PARTY_CODE === "B" && (
                      <p style={{ fontSize: "12px" }} align="">
                        Constitution Party
                      </p>
                    )}
                    {voter?.PARTY_CODE === "C" && (
                      <p style={{ fontSize: "12px" }} align="">
                        Consumer
                      </p>
                    )}
                    {voter?.PARTY_CODE === "D" && (
                      <p style={{ fontSize: "12px" }} align="">
                        Democrat
                      </p>
                    )}
                    {voter?.PARTY_CODE === "E" && (
                      <p style={{ fontSize: "12px" }} align="">
                        Inferred Democrat
                      </p>
                    )}
                    {voter?.PARTY_CODE === "F" && (
                      <p style={{ fontSize: "12px" }} align="">
                        Reform{" "}
                      </p>
                    )}
                    {voter?.PARTY_CODE === "G" && (
                      <p style={{ fontSize: "12px" }} align="">
                        Green
                      </p>
                    )}
                    {voter?.PARTY_CODE === "H" && (
                      <p style={{ fontSize: "12px" }} align="">
                        Liberal
                      </p>
                    )}
                    {voter?.PARTY_CODE === "I" && (
                      <p style={{ fontSize: "12px" }} align="">
                        Independent
                      </p>
                    )}
                    {voter?.PARTY_CODE === "J" && (
                      <p style={{ fontSize: "12px" }} align="">
                        UMOJA
                      </p>
                    )}
                    {voter?.PARTY_CODE === "K" && (
                      <p style={{ fontSize: "12px" }} align="">
                        Independent NM Party
                      </p>
                    )}
                    {voter?.PARTY_CODE === "L" && (
                      <p style={{ fontSize: "12px" }} align="">
                        {" "}
                        Libertarian
                      </p>
                    )}

                    {voter?.PARTY_CODE === "N" && (
                      <p style={{ fontSize: "12px" }} align="">
                        {" "}
                        No Party
                      </p>
                    )}
                    {voter?.PARTY_CODE === "O" && (
                      <p style={{ fontSize: "12px" }} align="">
                        {" "}
                        Other
                      </p>
                    )}
                    {voter?.PARTY_CODE === "P" && (
                      <p style={{ fontSize: "12px" }} align="">
                        {" "}
                        Peace and Freedom
                      </p>
                    )}

                    {voter?.PARTY_CODE === "R" && (
                      <p style={{ fontSize: "12px" }} align="">
                        {" "}
                        Republican
                      </p>
                    )}

                    {voter?.PARTY_CODE === "S" && (
                      <p style={{ fontSize: "12px" }} align="">
                        {" "}
                        Inferred Republican
                      </p>
                    )}

                    {voter?.PARTY_CODE === "T" && (
                      <p style={{ fontSize: "12px" }} align="">
                        {" "}
                        to Life
                      </p>
                    )}

                    {voter?.PARTY_CODE === "U" && (
                      <p style={{ fontSize: "12px" }} align="">
                        {" "}
                        Unknown
                      </p>
                    )}

                    {voter?.PARTY_CODE === "V" && (
                      <p style={{ fontSize: "12px" }} align="">
                        {" "}
                        Conservative
                      </p>
                    )}

                    {voter?.PARTY_CODE === "W" && (
                      <p style={{ fontSize: "12px" }} align="">
                        {" "}
                        Natural Law
                      </p>
                    )}

                    {voter?.PARTY_CODE === "Z" && (
                      <p style={{ fontSize: "12px" }} align="">
                        {" "}
                        Independance
                      </p>
                    )}

                    {voter?.PARTY_CODE === undefined ||
                      null ||
                      ("" && <p style={{ fontSize: "12px" }} align=""></p>)}
                  </div>
                </div>
              </div>
            </button>
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
