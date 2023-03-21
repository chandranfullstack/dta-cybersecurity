import React from "react";

const AppCard = ({ children, customStyles, otherClassName }) => {
  return (
    <div className={`app_card ${otherClassName}`} style={{ ...customStyles }}>
      {children}
    </div>
  );
};

export default AppCard;
