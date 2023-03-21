import React from "react";
import AppText1 from "../AppText/AppText1";

const AppButton = (props) => {
  const {
    color = "primary",
    textColor = "White",
    otherClassNames = "",
    text = null,
    isTextOnly = false,
    icon = null,
    size = "normal",
    onClick = () => {},
    iconOrientation = "left",
    isDisabled = false,
    reference,
    customStyles,
    textStyles,
    ...otherAttributes
  } = props;

  let { isBold = false } = props;

  if (["light"].includes(color)) {
    isBold = true;
  }

  return (
    <button
      disabled={isDisabled}
      type="button"
      className={`
                    
                    app_button_1
                    btn btn-${color} btn-size-${size}
                    ${isTextOnly ? "text_only_button_1" : ""}
                    ${icon ? "icon_button" : ""}
                    ${otherClassNames}
                `}
      onClick={onClick}
      ref={reference}
      style={{ ...customStyles }}
      {...otherAttributes}
    >
      {iconOrientation === "left" && icon}
      {text && (
        <AppText1
          text={text}
          otherClassNames="m-0 font-16"
          isBold={isBold || isTextOnly}
          color={textColor}
          customstyles={{ ...textStyles }}
        />
      )}
      {iconOrientation === "right" && icon}
    </button>
  );
};

export default AppButton;
