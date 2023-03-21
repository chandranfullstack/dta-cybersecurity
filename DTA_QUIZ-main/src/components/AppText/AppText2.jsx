import React from "react";

const AppText2 = ({
  text,
  otherClassNames = "",
  color = "black",
  isMultiLine = false,
  isBold = false,
  ...otherAttributes
}) => (
  <p
    className={`
            text-${color}
            ${otherClassNames}
            app_text_2
            ${isMultiLine ? "app_line_spacing_1" : ""}
            ${isBold ? "app_font_weight_bold_1" : ""}
        `}
    {...otherAttributes}
  >
    {text}
  </p>
);

export default AppText2;
