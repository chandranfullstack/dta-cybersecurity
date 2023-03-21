import React from "react";
import AppLink from "../AppLink/AppLink";
import rightArrow from "../../assets/icons/right-arrow.png";

const LinkButtonWithArrow = ({
  text,
  children,
  color,
  fontSize,
  fontWeight,
  gap = "10px",
  to,
  href,
  state,
}) => {
  return (
    <AppLink to={to} href={href} state={state}>
      <span
        style={{
          color: color,
          fontSize: fontSize,
          fontWeight: fontWeight,
          marginRight: gap,
        }}
      >
        {text || children}
      </span>
      <img src={rightArrow} />
    </AppLink>
  );
};

export default LinkButtonWithArrow;
