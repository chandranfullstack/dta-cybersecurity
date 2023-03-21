import React from "react";

const AppIcon = ({ children, otherClassName }) => {
  return <div className={`${otherClassName}`}>{children}</div>;
};

export default AppIcon;
