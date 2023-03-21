import React from "react";
import AppTitle3 from "src/components/AppTitle/AppTitle3";
import useAppStore from "src/store";
import Content from "./components/Content";
import ListContent from "./components/ListContent";
import ReadNext from "./components/ReadNext";
import { informationResponsible } from "./data";
import InfoResponsibleImg from "../../assets/infoResponsible.png";
import UserImg from "../../assets/user.png";
import TechnicalImg from "../../assets/technical.png";
import InfoResOwnerImg from "../../assets/infoOwner.png";
import InformationSecurity from "./InformationSecurity";
import { useTranslation } from "react-i18next";

const InformationResponsible = ({ noLink }) => {
  const { setSelectedComponent } = useAppStore((state) => state);

  const { t } = useTranslation();

  return (
    <div className="knowledge-hub-content" style={{ textAlign: "justify" }}>
      <h2 className="app-black-title mb-4" style={{ marginTop: "70px" }}>
        {t("knowledge_title_4")}
      </h2>

      <div style={{ width: "100%" }}>
        <Content>{t("knowledge_content_4")}</Content>
        <Content>They must work Together</Content>
        <img
          src={InfoResponsibleImg}
          alt="roles img"
          className="w-100"
          style={{ marginBottom: "2.5rem" }}
        />
      </div>
      <AppTitle3 text={t("knowledge_content_4_1")} isBold />
      {/* <ListContent data={informationCreated?.list} /> */}
      <div style={{ width: "100%" }}>
        <img
          src={InfoResOwnerImg}
          alt="IO image"
          className="w-100"
          style={{ marginBottom: "2.5rem" }}
        />
      </div>
      <ListContent data={informationResponsible?.list} />
      <AppTitle3 text={t("knowledge_content_4_5")} isBold />
      <Content>{t("knowledge_content_4_6")}</Content>
      <AppTitle3 text={t("knowledge_content_4_7")} isBold />
      {/* <ListContent data={informationCreated?.list} /> */}
      <div style={{ width: "100%" }}>
        <img
          src={TechnicalImg}
          alt="Technical image"
          className="w-100"
          style={{ marginBottom: "2.5rem" }}
        />
      </div>
      <ListContent data={informationResponsible?.list2} />
      <AppTitle3 text={t("knowledge_content_4_10")} isBold />
      <Content>{t("knowledge_content_4_11")}</Content>
      <AppTitle3 text={t("knowledge_content_4_12")} isBold />

      <div style={{ width: "100%" }}>
        <img
          src={UserImg}
          alt="User image"
          className="w-100"
          style={{ marginBottom: "2.5rem" }}
        />
      </div>
      <ListContent data={informationResponsible?.list3} />
      <AppTitle3 text={t("knowledge_content_4_15")} isBold />
      <Content>{t("knowledge_content_4_16")}</Content>
      {/* <AppTitle3 text="How do the operational roles work together?" isBold />
      <div style={{ width: "100%" }}>
        <img
          src={WorkTogetherImg1}
          className="w-100"
          style={{ marginBottom: "2.5rem" }}
        />
      </div>
      <ListContent data={informationResponsible?.list4} />
      <div style={{ width: "100%" }}>
        <img
          src={WorkTogetherImg2}
          className="w-100"
          style={{ marginBottom: "2.5rem" }}
        />
      </div>
      <ListContent data={informationResponsible?.list5} />
      <div style={{ width: "100%" }}>
        <img
          src={WorkTogetherImg3}
          className="w-100"
          style={{ marginBottom: "2.5rem" }}
        />
      </div>
      <ListContent data={informationResponsible?.list6} />
      <AppTitle3
        text="You have now become acquianted with this area of information security in the infoverse."
        isBold
      />

      <div style={{ width: "100%" }}>
        <img
          src={InfoResFinalImg}
          className="w-100"
          style={{ marginBottom: "2.5rem" }}
        />
      </div>

      <Content>
        of our corporate capital. There are many ways in which it can be
        created. New by people, processes, or technology is not automatically
        protected, If the flow of by an attack, for example due to malware, the
        company incurs losses. This is valuable and we must protect it.
      </Content>
      <Content>
        There are roles responsible for protecting information in our company.
        These are Information Owner, the Technical Owner and the User.
      </Content>

      <AppTitle3 text="Conclusion" isBold />
      <Content>
        All individual roles must work together to ensure that information is
        secure and protected.
      </Content> */}
      {!noLink && (
        <div
          className="d-flex flex-column justify-content-end align-items-end pt-4 text-end"
          style={{ marginTop: "2.5rem" }}
          onClick={() => setSelectedComponent(<InformationSecurity />)}
        >
          <span
            style={{ fontWeight: 400, fontSize: "20px" }}
            className="font-family-regular"
          >
            {t("knowledge_title_5")}
          </span>

          <ReadNext />
        </div>
      )}
    </div>
  );
};

export default InformationResponsible;
