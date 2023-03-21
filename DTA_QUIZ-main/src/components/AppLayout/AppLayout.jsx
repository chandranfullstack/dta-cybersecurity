import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SIGNIN_ROUTE } from "src/utils/constant";
import { getTokenFromStorage } from "src/utils/tokenHandler";
import AppFooter from "../AppFooter/AppFooter";
import AppHeader from "../AppHeader/AppHeader";
import AppLoader from "../AppLoader/appLoader";
// import {LOGIN_routes}

const AppLayout = ({
  children,
  isFooter = true,
  background,
  isMenu = true,
  isLoading = false,
  isTranslucentLoader = false,
}) => {
  const translucentStyle = {
    position: "fixed",
    zIndex: 999,
    backgroundColor: "rgb(0,0,0,0.4)",
  };

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (!getTokenFromStorage() && location?.pathname !== "/cyber") {
      navigate(SIGNIN_ROUTE);
    }
    // if(isUserAuthenticated().then(()=>{
    // }))
  }, []);

  return (
    <div
      className="layout"
      style={{ background: background, position: "relative" }}
    >
      {isTranslucentLoader && <AppLoader overlayStyle={translucentStyle} />}
      <AppHeader isMenu={isMenu} />
      {isLoading ? (
        <AppLoader />
      ) : (
        <div className={"app_inner_page_1 container"}>
          {children}
          {isFooter && <AppFooter />}
        </div>
      )}
    </div>
  );
};

export default AppLayout;
