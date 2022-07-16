import React from "react";

const Tag = ({ value }) => {
  return (
    <div
      style={{
        backgroundColor: "#d12e2f",
        minHeight: "40px",
        height: "auto",
        width: "100px",
        color: "white",
        borderRadius: "50px",
      }}
      className="p-2 mx-1  text-center"
    >
      {value.tagName}
    </div>
  );
};

export default Tag;
