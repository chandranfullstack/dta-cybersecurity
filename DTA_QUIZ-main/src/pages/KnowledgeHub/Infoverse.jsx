import React from "react";
import ReadNext from "./components/ReadNext";
import Content from "./components/Content";
import InformationCreated from "./InformationCreated";
import useAppStore from "src/store";
import { useTranslation } from "react-i18next";

const Infoverse = ({ noLink = false }) => {
  const { t } = useTranslation();

  const { setSelectedComponent } = useAppStore((state) => state);
  return (
    <div className="knowledge-hub-content" style={{ textAlign: "justify" }}>
      <h2 className="app-black-title mb-4" style={{ marginTop: "70px" }}>
        {t("knowledge_title_1")}
      </h2>
      {/* <div style={{ width: "100%" }}>
        <img
          src={InfoverseImg}
          className="w-100"
          style={{ marginBottom: "2.5rem" }}
        />
      </div> */}
      <Content>{t("knowledge_content_1")}</Content>

      {!noLink && (
        <div
          className="d-flex flex-column justify-content-end align-items-end pt-4 text-end"
          style={{ marginTop: "2.5rem" }}
          onClick={() => setSelectedComponent(<InformationCreated />)}
        >
          <span
            style={{ fontWeight: 400, fontSize: "20px" }}
            className="font-family-regular"
          >
            {t("knowledge_title_2")}
          </span>
          <ReadNext />
        </div>
      )}
    </div>
  );
};

export default Infoverse;
