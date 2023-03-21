import React from "react";
import { useTranslation } from "react-i18next";
import AppText1 from "src/components/AppText/AppText1";
import AppTitle3 from "src/components/AppTitle/AppTitle3";

const ListContent = ({ title, data = [] }) => {
  const { t } = useTranslation();

  return (
    <div style={{ marginBottom: "2.5rem" }}>
      {title && <AppTitle3 text={title} isBold />}

      <ul>
        {data?.map((text, index) => {
          return (
            <li key={index} className="app_instruction_list">
              <AppText1
                text={t(text)}
                isMultiLine
                otherClassNames="font-family-regular"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListContent;
