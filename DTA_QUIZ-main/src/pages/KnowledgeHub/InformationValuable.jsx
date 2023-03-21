import React from "react";
import useAppStore from "src/store";
import ListContent from "./components/ListContent";
import ReadNext from "./components/ReadNext";
import InformationResponsible from "./InformationResponsible";
import { informationValuable } from "./data";
import { useTranslation } from "react-i18next";

const InformationValuable = ({ noLink }) => {
  const { setSelectedComponent } = useAppStore((state) => state);

  const { t } = useTranslation();

  return (
    <div className="knowledge-hub-content" style={{ textAlign: "justify" }}>
      <h2 className="app-black-title mb-4" style={{ marginTop: "70px" }}>
        {t("knowledge_title_3")}
      </h2>
      {/* <div style={{ width: "100%" }}>
        <img
          src={InfoValuableImg1}
          className="w-100"
          style={{ marginBottom: "2.5rem" }}
        />
      </div> */}
      <ListContent data={informationValuable?.list} />
      {/* <Content>
        Information is extremely valuable. But this isn't always obvious at
        first glance. So let's look at concrete example:
      </Content>
      <Content>
        You have now become acquainted with this area of information security in
        the infoverse.
      </Content>
      <div style={{ width: "100%" }}>
        <img
          src={InfoValuableImg2}
          className="w-100"
          style={{ marginBottom: "2.5rem" }}
        />
      </div>
      <AppTitle3 text="Conclusion" isBold />
      <Content>
        If information cannot flow,due to an attack caused by malware, for
        example, the company incurs losses. This is why our information is
        valuable and we must protect it.
      </Content> */}
      {!noLink && (
        <div
          className="d-flex flex-column justify-content-end align-items-end pt-4 text-end"
          style={{ marginTop: "2.5rem" }}
          onClick={() => setSelectedComponent(<InformationResponsible />)}
        >
          <span
            style={{ fontWeight: 400, fontSize: "20px" }}
            className="font-family-regular"
          >
            {t("knowledge_title_4")}
          </span>

          <ReadNext />
        </div>
      )}
    </div>
  );
};

export default InformationValuable;
