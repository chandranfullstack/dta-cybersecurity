import React from "react";
import { Alert } from "react-bootstrap";

const AppAlert = ({ variant, children, otherClassNames }) => {
  return (
    <Alert key={variant} variant={variant} className={otherClassNames}>
      {children}
    </Alert>
  );
};

export default AppAlert;
