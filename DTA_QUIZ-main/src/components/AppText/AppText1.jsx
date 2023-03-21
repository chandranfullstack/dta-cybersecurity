import React from "react";

const AppText1 = ({
  text,
  otherClassNames = "",
  color = "black",
  isMultiLine = false,
  isBold = false,
  SuffixComponent = null,
  customstyles,
  // wants to display a component at the end
}) => (
  <p
    className={`text-${color}  app_text_1 ${
      isMultiLine ? "app_line_spacing_1" : ""
    } ${isBold ? "app_font_weight_bold_1" : ""} ${otherClassNames}`}
    style={{ ...customstyles }}
  >
    {text}
    {SuffixComponent}
  </p>
);

export default AppText1;
