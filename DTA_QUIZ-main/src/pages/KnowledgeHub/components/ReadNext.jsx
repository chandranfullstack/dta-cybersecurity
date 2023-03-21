import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import rightArrow from "../../../assets/icons/right-arrow.png";

const ReadNext = () => {
  const { t } = useTranslation();

  return (
    <Link to="#" style={{ textDecoration: "none", color: "black" }}>
      <span className="quiz-dashcard-action ">{t("read_next")}</span>
      <img className="ms-1" src={rightArrow} />
    </Link>
  );
};

export default ReadNext;
