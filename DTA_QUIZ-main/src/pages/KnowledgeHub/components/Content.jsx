import React from "react";
import AppText1 from "src/components/AppText/AppText1";

const Content = ({ children }) => {
  return (
    <AppText1
      text={children}
      isMultiLine
      otherClassNames="font-family-regular"
    />
  );
};

export default Content;
