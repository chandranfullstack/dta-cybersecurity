import React from "react";

const AppTitle3 = ({
  text,
  otherClassNames = "",
  color = "black",
  isBold = true,
  customStyles,
}) => (
  <h5
    className={`
            text-${color}
            ${otherClassNames}
            app_title_4
            ${isBold ? "app_font_weight_bold_1" : ""}
        `}
    style={{ ...customStyles }}
  >
    {text}
  </h5>
);

export default AppTitle3;
