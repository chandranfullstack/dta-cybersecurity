import React from "react";
import AppTitle3 from "src/components/AppTitle/AppTitle3";
import Content from "./components/Content";
import ConcreteCasesImg from "../../assets/concreteCases.png";
import { useTranslation } from "react-i18next";

const ConcreteCasesKnowledge = () => {
  const { t } = useTranslation();

  return (
    <div className="knowledge-hub-content" style={{ textAlign: "justify" }}>
      <h2 className="app-black-title mb-4" style={{ marginTop: "70px" }}>
        {t("knowledge_title_6")}
      </h2>
      <AppTitle3 text={t("knowledge_content_6")} isBold />
      <Content>{t("knowledge_content_6_1")}</Content>

      <Content>{t("knowledge_content_6_2")}</Content>

      <div style={{ width: "100%" }}>
        <img
          src={ConcreteCasesImg}
          className="w-100"
          style={{ marginBottom: "2.5rem" }}
        />
      </div>
    </div>
  );
};

export default ConcreteCasesKnowledge;
