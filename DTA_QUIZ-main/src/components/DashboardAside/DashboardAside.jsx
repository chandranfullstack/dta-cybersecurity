import React from "react";
import AppLink from "../AppLink/AppLink";

const DashboardAside = ({ asideData }) => {
  return (
    <div className="d-flex flex-column" style={{ gap: "80px" }}>
      {asideData?.map((data) => (
        <div key={data?.menutitle}>
          <h2
            className="app-blue-title-r-dash"
            style={{ marginBottom: "40px" }}
          >
            {data?.menutitle}
          </h2>
          <div className="d-flex flex-column ms-4" style={{ gap: "22px" }}>
            {data.submenu?.map((subData) => (
              <div
                key={subData?.subtitle}
                className="d-flex align-items-center"
              >
                <AppLink to={subData?.to} style={{ textDecoration: "none" }}>
                  <img src={subData?.icon} height="32px" />
                  <span className="dashmenu-aside-sub ms-3">
                    {subData?.subtitle}
                  </span>
                </AppLink>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardAside;
