import React from "react";

const AppFlex = ({ children, customStyles }) => {
  return <div style={{ ...customStyles }}>{children}</div>;
};

export default AppFlex;
