import React from "react";
import { NavLink } from "react-router-dom";

const AppLink = ({
  to,
  href,
  children,
  otherClassNames = "",
  state,
  ...restprops
}) => {
  return href ? (
    <a
      href={href}
      className={`app_link ${otherClassNames}`}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  ) : (
    <NavLink
      to={to}
      className={`app_link ${otherClassNames} `}
      state={state}
      {...restprops}
    >
      {children}
    </NavLink>
  );
};

export default AppLink;
