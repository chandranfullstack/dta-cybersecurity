import React from "react";
import Form from "react-bootstrap/Form";

const AppSwitch = ({ onChange, isSwitchOn }) => {
  return (
    <Form.Check
      type="switch"
      id="custom-switch"
      onChange={onChange}
      checked={isSwitchOn}
    />
  );
};

export default AppSwitch;
