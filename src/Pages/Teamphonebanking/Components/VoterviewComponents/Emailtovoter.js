import { Link } from "react-router-dom";

const Emailtovoter = ({ data }) => {
  return (
    <Link
      to="#"
      onClick={(e) => {
        window.location.href = data;
        e.preventDefault();
      }}
    >
      <div style={{ color: "#D12E2F" }} className="text-center  btn">
        <i style={{ fontSize: "25px" }} class="fas fa-envelope"></i>
        <br /> <p style={{ fontSize: "12px" }}>Email</p>
      </div>
    </Link>
  );
};

export default Emailtovoter;
