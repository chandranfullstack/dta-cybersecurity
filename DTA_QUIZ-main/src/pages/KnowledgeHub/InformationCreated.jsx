import React from "react";
import Content from "./components/Content";
import ListContent from "./components/ListContent";
import ReadNext from "./components/ReadNext";
import { informationCreated } from "./data";
import useAppStore from "src/store";
import InformationValuable from "./InformationValuable";
import { useTranslation } from "react-i18next";

const InformationCreated = ({ noLink }) => {
  const { setSelectedComponent } = useAppStore((state) => state);
  const { t } = useTranslation();
  return (
    <div className="knowledge-hub-content" style={{ textAlign: "justify" }}>
      <h2 className="app-black-title mb-4" style={{ marginTop: "70px" }}>
        {t("knowledge_title_2")}
      </h2>
      {/* <AppTitle3 text="Where can we find information? A few examples" isBold />
      <div style={{ width: "100%" }}>
        <img
          src={InfoverseImg2}
          className="w-100"
          style={{ marginBottom: "2.5rem" }}
        />
      </div>
      <Content>
        As you can see,Information constantly surrounds us in our work. If you
        consider your area of expertise.
      </Content>

      <AppTitle3 text="How and where is information created ?" isBold /> */}
      <Content>{t("knowledge_content_2")}</Content>
      <ListContent data={informationCreated?.list} />
      {/* <div style={{ width: "100%" }}>
        <img
          src={InformationCreatedImg1}
          className="w-100"
          style={{ marginBottom: "2.5rem" }}
        />
      </div>
      <Content>
        Unfortunately, it is not always clear from the outset how and by whom
        information must be protected. And not all information has to be
        protected in the same way. In the next chapter, we will show you the
        criteria according to which information is protected.
      </Content>
      <Content>
        You have now become acquainted with this area of information security in
        the infoverse.
      </Content>

      <div style={{ width: "100%" }}>
        <img
          src={InformationCreatedImg2}
          className="w-100"
          style={{ marginBottom: "2.5rem" }}
        />
      </div>
      <AppTitle3 text="Conclusion" isBold />
      <Content>
        Information is part of our corporate capital. There are many ways in
        which it can be created. New information isn't automatically protected
        upon creation.
      </Content> */}
      {!noLink && (
        <div
          className="d-flex flex-column justify-content-end align-items-end pt-4 text-end"
          style={{ marginTop: "2.5rem" }}
          onClick={() => setSelectedComponent(<InformationValuable />)}
        >
          <span
            style={{ fontWeight: 400, fontSize: "20px" }}
            className="font-family-regular"
          >
            {t("knowledge_title_3")}
          </span>

          <ReadNext />
        </div>
      )}
    </div>
  );
};

export default InformationCreated;
