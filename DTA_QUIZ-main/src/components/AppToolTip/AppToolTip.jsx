import React from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";
import AppText1 from "../AppText/AppText1";

const AppToolTipHandler = ({ heading, description }) => (
  <Popover className="app_tooltip" id="popover-basic">
    <Popover.Body>
      {heading && (
        <AppText1 text={heading} otherClassNames="mb-3 text-center" isBold />
      )}

      <AppText1 text={description} otherClassNames="m-0 text-center" />
    </Popover.Body>
  </Popover>
);

const AppToolTip = (props) => {
  const { children, content, show = true } = props;

  if (show) {
    return (
      <OverlayTrigger
        trigger="hover"
        placement="top"
        overlay={AppToolTipHandler(content)}
      >
        {children}
      </OverlayTrigger>
    );
  }

  return children;
};

export default AppToolTip;
