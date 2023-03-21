import React from "react";

const AppErrorText = ({ text }) => {
  return (
    <span
      className="me-1 font-family-regular error-text"
      style={{ fontSize: "13px" }}
    >
      {text}
    </span>
  );
};

export default AppErrorText;
