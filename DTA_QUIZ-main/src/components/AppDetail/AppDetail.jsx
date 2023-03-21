import React from "react";
import AppCard from "../AppCard/AppCard";
import AppText1 from "../AppText/AppText1";
import Warning from "../../assets/warning.svg";
import AppTitle2 from "../AppTitle/AppTitle2";
import MoreIcon from "../../assets/more.svg";
import { t } from "i18next";

const AppDetail = () => {
  return (
    <div className="app_detail">
      <AppText1
        text={t("home_section_2_content")}
        isMultiLine
        otherClassNames="app_detail_text font-family-regular"
      />
      <AppCard otherClassName="app_detail_card">
        <img src={Warning} alt="" className="mb-2" />
        <AppTitle2
          text={t("home_section_2_content_2")}
          color="warning"
          otherClassNames="font-24"
        />
        <img src={MoreIcon} />
      </AppCard>
    </div>
  );
};

export default AppDetail;
