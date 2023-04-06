import { Link } from "react-router-dom";

const Emailtovoter = ({ data, emails }) => {
  console.log(emails, "i am emails");
  return (
    // <Link
    //   to="#"

    // >
    <div
      style={{
        color:
          emails?.email1 !== undefined || emails?.email2 !== undefined
            ? "#D12E2F"
            : "grey",
      }}
      className={`text-center  ${
        emails?.email1 !== undefined || emails?.email2 !== undefined
          ? "btn"
          : "m-2"
      }`}
      onClick={
        emails?.email1 !== undefined || emails?.email2 !== undefined
          ? (e) => {
              window.location.href = data;
              e.preventDefault();
            }
          : ""
      }
    >
      <i style={{ fontSize: "25px" }} class="fas fa-envelope"></i>
      <br /> <p style={{ fontSize: "12px" }}>Email</p>
    </div>
    // </Link>
  );
};

export default Emailtovoter;
