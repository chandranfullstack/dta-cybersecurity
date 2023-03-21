import React from "react";

const AppTitle2 = ({
  text,
  otherClassNames = "",
  color = "black",
  isBold = true,
  isMultiLine = false,
  customStyles,
}) => (
  <h5
    style={{ ...customStyles }}
    className={`
            text-${color}
            ${otherClassNames}
            app_title_3
            ${isBold ? "app_font_weight_bold_1" : ""}
            ${isMultiLine ? "app_line_spacing_2" : ""}
        `}
  >
    {text}
  </h5>
);

export default AppTitle2;
