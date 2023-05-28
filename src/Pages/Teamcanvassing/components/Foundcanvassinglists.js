import React, { useState } from "react";
import { toast } from "react-toastify";

const Foundvoterlist = ({
  data,
  handleSelectedVoter,
  handleSelectedWalkBook,
}) => {
  const [page, setPage] = useState(1);
  const [selectedWalkBook, setSelectedWalkBook] = useState();
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

  const handleWalkBooks = (selectedRecord) => {
    console.log(selectedRecord, "i am selected");
    setSelectedWalkBook(selectedRecord?._id);
  };

  return (
    <div>
      {data?.map((voter) => {
        console.log(voter, "i am recordslists");
        return (
          <div>
            <div
              key={voter?._id}
              style={{
                height: "auto",
                minHeight: "102px",
                borderRight: "5px red #00000029",
                // position: "relative",
              }}
              className="p-2 text-left m-3 border-top "
              onClick={
                voter?.walkBooks?.length > 0
                  ? () => handleWalkBooks(voter)
                  : () =>
                      handleSelectedVoter(voter, { walkbookAvailable: false })
              }
            >
              <h5 className="text-danger">{voter?.recordName}</h5>
              {/* <p className="text-muted">{voter?.ADDRESS}</p> */}
              <div className="pb-2" id="parent">
                <div className="d-flex justify-content-between text-muted text-center ">
                  <p
                    style={{
                      // borderRight: "1px solid #707070",
                      fontSize: "19px",
                    }}
                  >
                    {voter?.totalNumbers} voters
                  </p>

                  <p>|</p>
                  <p
                    style={{
                      // borderRight: "1px solid #707070",
                      fontSize: "19px",
                    }}
                    className="text-center"
                  >
                    {voter?.walkBooks?.length} Walkbooks
                  </p>
                  <p>|</p>
                  <p style={{ fontSize: "19px" }} align="">
                    {voter?.active}{" "}
                  </p>
                </div>
              </div>

              <div className="">
                {selectedWalkBook === voter?._id &&
                  voter?.walkBooks?.length > 0 &&
                  voter?.walkBooks?.map((walkbook, i) => {
                    return (
                      <div>
                        <div className="d-flex justify-content-between text-muted text-center ">
                          <p
                            style={{
                              // borderRight: "1px solid #707070",
                              fontSize: "19px",
                            }}
                            className="text-danger"
                            onClick={() =>
                              handleSelectedVoter(voter, {
                                walkbookAvailable: true,
                                walkBookProps: walkbook,
                                walkBookIndex: i,
                                numberOfWalkbooks: voter?.walkBooks?.length,
                                walkbookDivider: voter?.walkBooks[0]?.voters,
                              })
                            }
                          >
                            {walkbook?.name}
                          </p>

                          <p>|</p>
                          <p
                            style={{
                              // borderRight: "1px solid #707070",
                              fontSize: "19px",
                            }}
                            className="text-center"
                          >
                            {walkbook?.voters}
                          </p>
                          <p>|</p>
                          <p style={{ fontSize: "19px" }} align="">
                            {walkbook?.active}{" "}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        );
      })}
      {/* <button onClick={handleLoad} className="btn btn-danger my-2">
        Load More
      </button> */}
    </div>
  );
};

export default Foundvoterlist;
