import React from "react";
import AppText1 from "../AppText/AppText1";
import AppTitle2 from "../AppTitle/AppTitle2";

const AppTitleAndText = ({
  title,
  text,
  isTitle = true,
  wholeText,
  customStyles,
}) => {
  const splitedWord = wholeText?.split(" ");
  const customTitle = splitedWord?.[0];
  const customText = splitedWord?.slice(1)?.join(" ");
  return (
    <div className=" align-items-center" style={{ marginBottom: "1rem" }}>
      {isTitle && (
        <AppTitle2
          text={customTitle || title}
          customStyles={{
            marginRight: "5px",
            fontSize: "32px",
            ...customStyles,
          }}
        />
      )}
      <AppText1
        text={customText || text}
        otherClassNames="app_title_text"
        customstyles={{
          fontSize: "32px",
          fontFamily: "Daimler CS Regular",
          ...customStyles,
        }}
      />
    </div>
  );
};

export default AppTitleAndText;
