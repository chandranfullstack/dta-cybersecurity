import React from "react";
import useAppStore from "src/store";
import Content from "./components/Content";
import ReadNext from "./components/ReadNext";
import InfoSecurityImg1 from "../../assets/infoSecurity1.png";
import ConcreteCasesKnowledge from "./ConcreteCasesKnowledge";
import { useTranslation } from "react-i18next";

const InformationSecurity = ({ noLink }) => {
  const { setSelectedComponent } = useAppStore((state) => state);
  const { t } = useTranslation();

  return (
    <div className="knowledge-hub-content" style={{ textAlign: "justify" }}>
      <h2 className="app-black-title mb-4" style={{ marginTop: "70px" }}>
        {t("knowledge_title_5")}
      </h2>
      {/* <AppTitle3 text="No results without goals" isBold /> */}
      <Content>{t("knowledge_content_5")}</Content>
      {/* <AppTitle3 text="Explore the protection goals" isBold /> */}

      <div style={{ width: "100%" }}>
        <img
          src={InfoSecurityImg1}
          className="w-100"
          style={{ marginBottom: "2.5rem" }}
        />
      </div>
      {/* <div style={{ width: "100%" }}>
        <img
          src={InfoSecurityImg2}
          className="w-100"
          style={{ marginBottom: "2.5rem" }}
        />
      </div> 

      <AppTitle3 text="Conclusion" isBold />
      <Content>
        The protection goals help us to define what property of our information
        we need to protect.
      </Content>*/}
      {!noLink && (
        <div
          className="d-flex flex-column justify-content-end align-items-end pt-4 text-end"
          style={{ marginTop: "2.5rem" }}
          onClick={() => setSelectedComponent(<ConcreteCasesKnowledge />)}
        >
          <span
            style={{ fontWeight: 400, fontSize: "20px" }}
            className="font-family-regular"
          >
            {t("knowledge_title_6")}
          </span>

          <ReadNext />
        </div>
      )}
    </div>
  );
};

export default InformationSecurity;
