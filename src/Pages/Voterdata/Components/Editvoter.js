import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Header from "../../../Components/Header";
import Avatar from "@mui/material/Avatar";
import Imagepicker from "../../../Components/Imagepicker";
import Tag from "../../../Components/Tag";

import Logo from "../../../Assets/logoword.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Editvoter({ data, buttonName, open, handleClickOpen }) {
  console.log(data);
  // const [open, setOpen] = React.useState(false);
  const [tags, setTags] = React.useState([...data?.voterTags]);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClickOpen = () => {
  //   setOpen(false);
  // };

  const handleSelectedImage = (image) => {
    console.log(image);
  };

  React.useEffect(() => {
    setTags([...data?.voterTags]);
  }, []);

  return (
    <div>
      {console.log(tags)}
      {/* <button
        style={{
          color: "white",
          backgroundColor: "#d12e2f",
          width: "88px",
          height: "36px",
        }}
        className="btn"
        onClick={handleClickOpen}
      >
        {buttonName}
      </button> */}

      <Dialog
        fullScreen
        open={open}
        onClose={handleClickOpen}
        TransitionComponent={Transition}
      >
        {/* <AppBar
          style={{ backgroundColor: "#FFFFFF" }}
          sx={{ position: "relative" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              //   color=""
              onClick={handleClickOpen}
              aria-label="close"
              style={{ color: "black" }}
            >
              <CloseIcon />
            </IconButton>
            <img style={{ width: "90px" }} src={Logo} />
           
            <Button autoFocus color="inherit" onClick={handleClickOpen}>
              Close
            </Button>
          </Toolbar>
        </AppBar> */}
        <div>
          <div className="mt-5 container">
            <Header
              name="Voter Record"
              purpose="Information for Voters - Tags"
            />
            <div
              className="shadow px-4 py-4"
              style={{
                backgroundColor: "#FFFFFF",
                height: "auto",
                borderRadius: "12px",
              }}
            >
              <button
                className="btn"
                style={{ color: "#d12e2f", marginLeft: "-20px" }}
                onClick={handleClickOpen}
              >
                <i class="fas fa-angle-left mx-2"></i> Back
              </button>

              <div className="row mt-2">
                <div className="col-12 col-md-4 text-left">
                  <div className="d-flex justify-content-between">
                    <h5>
                      Survey Responses :
                      {data.surveys ? (
                        <span className="text-danger">
                          {data.surveys.length}
                        </span>
                      ) : (
                        <span className="text-danger">0</span>
                      )}{" "}
                    </h5>
                    <button
                      style={{
                        color: "#FFFFFF",
                        backgroundColor: "#d12e2f",
                        width: "88px",
                        height: "36px",
                      }}
                      className="btn btn-sm"
                      disabled
                    >
                      View
                    </button>
                  </div>

                  <div className="d-flex justify-content-between mt-2">
                    <h5>
                      Finiks Tags :{" "}
                      <span className="text-danger">
                        {data.voterTags.length > 0 ? data.voterTags.length : 0}
                      </span>
                    </h5>
                    <button
                      style={{
                        color: "#FFFFFF",
                        backgroundColor: "#d12e2f",
                        width: "88px",
                        height: "36px",
                      }}
                      className="btn btn-sm"
                      disabled
                    >
                      View
                    </button>
                  </div>
                  <div class="form-group mt-3">
                    <label
                      style={{ color: "#d12e2f" }}
                      for="exampleInputEmail1"
                    >
                      Prefered Name
                    </label>
                    <input
                      type="text"
                      className="form-control shadow-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      disabled
                      value={data.FIRSTNAME}
                    />
                  </div>
                  <div class="form-group">
                    <label
                      style={{ color: "#d12e2f" }}
                      for="exampleInputEmail1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control shadow-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      disabled
                      value={data.LASTNAME}
                    />
                  </div>
                  <div class="form-group">
                    <label
                      style={{ color: "#d12e2f" }}
                      for="exampleInputEmail1"
                    >
                      Cell Phone Number
                    </label>
                    <input
                      type="number"
                      className="form-control shadow-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      disabled
                      value={data.MOBILE_NUM}
                    />
                  </div>
                  <div class="form-group">
                    <label
                      style={{ color: "#d12e2f" }}
                      for="exampleInputEmail1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control shadow-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      disabled
                      value={data.EMAIL}
                    />
                  </div>
                  <div class="form-group">
                    <label
                      style={{ color: "#d12e2f" }}
                      for="exampleInputEmail1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control shadow-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      disabled
                      value={data.ADDRESS}
                    />
                  </div>
                  <div class="form-group">
                    <label
                      style={{ color: "#d12e2f" }}
                      for="exampleInputEmail1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className="form-control shadow-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-5">
                  <div className="shadow">
                    <div
                      className="shadow-sm p-3  d-flex justify-content-center align-items-center"
                      style={{ height: "110px" }}
                    >
                      <Avatar
                        sx={{ bgcolor: "#FF914D", width: 79, height: 79 }}
                        className="mr-2"
                      >
                        {data.FIRSTNAME[0]}
                      </Avatar>
                      <h5
                        className="mr-4"
                        style={{ fontWeight: "bold", fontSize: "25px" }}
                      >
                        {data.FIRSTNAME + " " + data.LASTNAME}
                      </h5>
                    </div>
                    <div
                      style={{ backgroundColor: "#f6f6f6", height: "auto" }}
                      className="p-3"
                    >
                      <h5
                        style={{ fontWeight: "bold" }}
                        className="text-danger"
                      >
                        {data.lastInfluenced
                          ? data.lastInfluenced
                          : "Not Influnced Yet"}
                      </h5>
                      <p className="text-muted">{data.ADDRESS}</p>
                      <div className="d-flex justify-content-between text-muted text-center ">
                        <p
                          style={{ borderRight: "1px solid #707070" }}
                          className="pr-3"
                        >
                          {data.SEX === "M" ? "Male" : "Female"}
                        </p>
                        <p
                          style={{ borderRight: "1px solid #707070" }}
                          className="pr-3"
                        >
                          {data.AGE} Years Old
                        </p>
                        {data.PARTY_CODE === "A" && (
                          <p align="">American Independent</p>
                        )}
                        {data.PARTY_CODE === "B" && (
                          <p align="">Constitution Party</p>
                        )}
                        {data.PARTY_CODE === "C" && <p align="">Consumer</p>}
                        {data.PARTY_CODE === "D" && <p align="">Democrat</p>}
                        {data.PARTY_CODE === "E" && (
                          <p align="">Inferred Democrat</p>
                        )}
                        {data.PARTY_CODE === "F" && <p align="">Reform </p>}
                        {data.PARTY_CODE === "G" && <p align="">Green</p>}
                        {data.PARTY_CODE === "H" && <p align="">Liberal</p>}
                        {data.PARTY_CODE === "I" && <p align="">Independent</p>}
                        {data.PARTY_CODE === "J" && <p align="">UMOJA</p>}
                        {data.PARTY_CODE === "K" && (
                          <p align="">Independent NM Party</p>
                        )}
                        {data.PARTY_CODE === "L" && (
                          <p align=""> Libertarian</p>
                        )}

                        {data.PARTY_CODE === "N" && (
                          <p align="">
                            {" "}
                            None/Non-Partisan/No Party/No
                            Preference/Undeclared/Declined to
                            State/Undecided/Unaffiliated
                          </p>
                        )}
                        {data.PARTY_CODE === "O" && <p align=""> Other</p>}
                        {data.PARTY_CODE === "P" && (
                          <p align=""> Peace and Freedom</p>
                        )}

                        {data.PARTY_CODE === "R" && <p align=""> Republican</p>}

                        {data.PARTY_CODE === "S" && (
                          <p align=""> Inferred Republican</p>
                        )}

                        {data.PARTY_CODE === "T" && <p align=""> to Life</p>}

                        {data.PARTY_CODE === "U" && <p align=""> Unknown</p>}

                        {data.PARTY_CODE === "V" && (
                          <p align=""> Conservative</p>
                        )}

                        {data.PARTY_CODE === "W" && (
                          <p align=""> Natural Law</p>
                        )}

                        {data.PARTY_CODE === "Z" && (
                          <p align=""> Independance</p>
                        )}

                        {data.PARTY_CODE === undefined ||
                          null ||
                          ("" && <p align=""></p>)}
                      </div>

                      {tags.length > 0 && (
                        <div className="row px-2">
                          {tags.map((tag) => {
                            return (
                              <div className="text-center mb-1">
                                <Tag value={tag} />
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {tags.length === 0 && (
                        <Tag value={{ tagName: "No Tags Found" }} />
                      )}
                    </div>
                    <div className="p-3">
                      <h5
                        style={{ fontWeight: "bold" }}
                        className="text-danger"
                      >
                        Voter Info
                      </h5>
                      <div className="d-flex justify-content-between">
                        <p>Precinct :</p>
                        <p className="text-muted">{data.PREC_NO1}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Congressional District :</p>
                        <p className="text-muted">{data.CONG_DIST}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>State Senate District :</p>
                        <p className="text-muted">{data.ST_UP_HOUS}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>State House District :</p>
                        <p className="text-muted">{data.ST_LO_HOUS}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>City Commission District :</p>
                        <p className="text-muted">{data.CITY_DIST}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>School Board District :</p>
                        <p className="text-muted">{data.SCHL_BRD}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-3">
                  <h5 className="my-2 text-danger ">Profiled Information</h5>
                  <hr />
                  <div
                    className={`my-4 ${
                      data.PRFL_2NDAMEND && data.PRFL_2NDAMEND === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_2NDAMEND === "Y"
                        ? "2nd Amendment Supporter"
                        : ""}
                    </p>
                    <hr />
                  </div>
                  <div
                    className={`my-4 ${
                      data.PRFL_ACTIVE && data.PRFL_ACTIVE === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>{data.PRFL_ACTIVE === "Y" ? "Active Military" : ""}</p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_AMZN_PRIME && data.PRFL_AMZN_PRIME === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_AMZN_PRIME === "Y"
                        ? "Amazon Prime Subscriber"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_ANML_RIGHTS && data.PRFL_ANML_RIGHTS === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_ANML_RIGHTS === "Y"
                        ? "Animal Rights Supporter"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_BIDEN_SUPPORT && data.PRFL_BIDEN_SUPPORT === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_BIDEN_SUPPORT === "Y"
                        ? "Likely Biden Supporter"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_BLM_SUPPORT && data.PRFL_BLM_SUPPORT === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_BLM_SUPPORT === "Y"
                        ? "Likely Black Lives Matter Supporter"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_BORDER_SECURITY &&
                      data.PRFL_BORDER_SECURITY === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_BORDER_SECURITY === "Y"
                        ? " Interest in Border Security"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_CHOICELIFE && data.PRFL_CHOICELIFE === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>{data.PRFL_CHOICELIFE === "Y" ? " Pro Life" : ""}</p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_CLINTON_SUPPORT &&
                      data.PRFL_CLINTON_SUPPORT === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_CLINTON_SUPPORT === "Y"
                        ? " Likely Hillary Clinton Supporter"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_CONSERVATIVE_NEWS &&
                      data.PRFL_CONSERVATIVE_NEWS === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_CONSERVATIVE_NEWS === "Y"
                        ? " Likely to watch Conservative News Outlets"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_EDUCATION && data.PRFL_EDUCATION === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_EDUCATION === "Y"
                        ? "Interest in Education Issues"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_ENVIRONMENT && data.PRFL_ENVIRONMENT === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_ENVIRONMENT === "Y" ? "Environmentalist" : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_EVANGELICAL && data.PRFL_EVANGELICAL === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>{data.PRFL_EVANGELICAL === "Y" ? " Evangelical" : ""}</p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_FENCE_SITTER && data.PRFL_FENCE_SITTER === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_FENCE_SITTER === "Y"
                        ? "Likely Fence Sitter"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_GUN_CONTROL && data.PRFL_GUN_CONTROL === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_GUN_CONTROL === "Y"
                        ? "Gun Control Supporter"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_HEALTHCARE_REFORM &&
                      data.PRFL_HEALTHCARE_REFORM.length > 0
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_HEALTHCARE_REFORM === "Y"
                        ? " Healthcare Reform Supporter"
                        : ""}
                      {data.PRFL_HEALTHCARE_REFORM === "N"
                        ? "Against Healthcare Reform"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_HEALTHCARE && data.PRFL_HEALTHCARE === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_HEALTHCARE === "Y"
                        ? "Healthcare Professional"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_IMMIGRATION_REFORM &&
                      data.PRFL_IMMIGRATION_REFORM === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_IMMIGRATION_REFORM === "Y"
                        ? "Interested in Immigration Reform"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_INFLUENCER && data.PRFL_INFLUENCER === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_INFLUENCER === "Y"
                        ? "Voter Is An Influencer"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_INSURANCE && data.PRFL_INSURANCE === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_INSURANCE === "Y"
                        ? "Likely To Have Workplace Insurance"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_LABOR && data.PRFL_LABOR === "Y" ? "" : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_LABOR === "Y"
                        ? "Organized Labor Supporter"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_LGBT_SUPPORT && data.PRFL_LGBT_SUPPORT > 0
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_LGBT_SUPPORT === 1 ? "LGBT Donor" : ""}
                      {data.PRFL_LGBT_SUPPORT === 2 ? "LGBT Supporter" : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_LIBERAL_NEWS && data.PRFL_LIBERAL_NEWS === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_LIBERAL_NEWS === "Y"
                        ? "Likely to Watch Liberal News Outlets"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_MARIJUANA_REFORM &&
                      data.PRFL_MARIJUANA_REFORM === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_MARIJUANA_REFORM === "Y"
                        ? "Marijuana Policy Reform Supporter"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_MARRIAGE_EQUALITY &&
                      data.PRFL_MARRIAGE_EQUALITY > 0
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_MARRIAGE_EQUALITY === 1
                        ? "Supports Marriage Equality"
                        : ""}
                      {data.PRFL_MARRIAGE_EQUALITY === 2
                        ? "Opposes Marriage Equality"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_METOO_SUPPORT && data.PRFL_METOO_SUPPORT === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_METOO_SUPPORT === "Y"
                        ? "Likely to Support the MeToo Movement"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_MIL_SUPPORT && data.PRFL_MIL_SUPPORT === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_MIL_SUPPORT === "Y"
                        ? " Military Supporter"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_MINWAGE && data.PRFL_MINWAGE > 0 ? "" : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_MINWAGE === 1
                        ? "Likely to Support Minimum Wage Increase"
                        : ""}
                      {data.PRFL_MINWAGE === 2
                        ? "Likely to Oppose Minimum Wage Increase"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_OBAMA && data.PRFL_OBAMA === "Y" ? "" : "d-none"
                    }`}
                  >
                    <p>{data.PRFL_OBAMA === "Y" ? " Likely Obama" : ""}</p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_PERSUADABLE_VOTER &&
                      data.PRFL_PERSUADABLE_VOTER === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_PERSUADABLE_VOTER === "Y"
                        ? "Persuadable/Swing Voter"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_POLITICAL_IDEOLOGY &&
                      data.PRFL_POLITICAL_IDEOLOGY.length > 0
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_POLITICAL_IDEOLOGY === "C"
                        ? " Conservative"
                        : ""}
                      {data.PRFL_POLITICAL_IDEOLOGY === "M" ? " Moderate" : ""}
                      {data.PRFL_POLITICAL_IDEOLOGY === "L" ? " Liberal" : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_SANDERS_SUPPORT &&
                      data.PRFL_SANDERS_SUPPORT === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_SANDERS_SUPPORT === "Y"
                        ? "Likely Sanders Supporter"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_TAXES && data.PRFL_TAXES === "Y" ? "" : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_TAXES === "Y"
                        ? "Interested in Taxes and Tax Reform"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_TEACHERS_UNION &&
                      data.PRFL_TEACHERS_UNION === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_TEACHERS_UNION === "Y"
                        ? "Likely Teachers Union Member"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_TEAPARTY && data.PRFL_TEAPARTY > 0
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_TEAPARTY === 1 ? " Tea Party Donor" : ""}
                      {data.PRFL_TEAPARTY === 2
                        ? "Likely Tea Party Supporter"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_TRUMP_SUPPORT && data.PRFL_TRUMP_SUPPORT === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>
                      {data.PRFL_TRUMP_SUPPORT === "Y"
                        ? "Likely Trump Supporter"
                        : ""}
                    </p>
                    <hr />
                  </div>

                  <div
                    className={`my-4 ${
                      data.PRFL_VETERAN && data.PRFL_VETERAN === "Y"
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p>{data.PRFL_VETERAN === "Y" ? "Veteran" : ""}</p>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
