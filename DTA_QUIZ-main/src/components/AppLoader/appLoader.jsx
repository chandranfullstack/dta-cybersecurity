import React from "react";
import { BounceLoader } from "react-spinners";

const AppLoader = ({ cssOverride, overlayStyle }) => {
  return (
    <div className="app-loader-parent" style={{ ...overlayStyle }}>
      <BounceLoader cssOverride={cssOverride} color="#136378" />
    </div>
  );
};

export default AppLoader;
