import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import AppLayout from "src/components/AppLayout/AppLayout";
import AppText1 from "src/components/AppText/AppText1";
import AppTitle3 from "src/components/AppTitle/AppTitle3";
import ListContent from "../KnowledgeHub/components/ListContent";

const ConcereteCaseDetail = ({ customData, onlyContent = false }) => {
  const { state } = useLocation();

  const dataToShow = state || customData;

  const { t } = useTranslation();

  return (
    <>
      {!onlyContent ? (
        <AppLayout>
          <div
            className="cases-detail-header"
            style={{ padding: "1.5rem 0rem" }}
          >
            <h3 className="font-family-regular">Headline</h3>
            <h2
              className="app-blue-title-w-dash mt-1"
              style={{ marginBottom: "32px" }}
            >
              {t(dataToShow?.title1)}
            </h2>
            <h3 className="mb-0 font-family-regular">{dataToShow?.date}</h3>
          </div>
          <div className="cases-detail-body">
            <div style={{ width: "100%" }}>
              <img
                src={dataToShow?.img}
                className="w-100"
                style={{ height: "300px", objectFit: "contain" }}
              />
            </div>
            <div style={{ marginTop: "2.5rem", marginBottom: "2.5rem" }}>
              <AppTitle3 text={t(dataToShow?.contentTitle1)} isBold />
              <AppText1
                text={t(dataToShow?.content1)}
                isMultiLine
                otherClassNames="font-family-regular mb-0"
              />
            </div>

            <div style={{ marginBottom: "2.5rem" }}>
              <AppTitle3 text={t(dataToShow?.contentTitle2)} isBold />
              <AppText1
                text={t(dataToShow?.content2)}
                isMultiLine
                otherClassNames="font-family-regular"
              />
            </div>

            <div style={{ marginBottom: "2.5rem" }}>
              <AppTitle3 text={t(dataToShow?.contentTitle3)} isBold />

              <ListContent data={dataToShow?.list} />
            </div>

            {/* <div className="d-flex flex-column justify-content-end align-items-end mt-5 pt-4 text-end">
          <span
            style={{ fontWeight: 400, fontSize: "20px" }}
            className="font-family-regular"
          >
            Allianz Detective Transmitted Client Information?
          </span>
          <Link to="#" style={{ textDecoration: "none", color: "black" }}>
            <span className="quiz-dashcard-action ">Read Next</span>{" "}
            <img className="ms-1" src={ArrowRightImg} />
          </Link>
        </div> */}
          </div>
        </AppLayout>
      ) : (
        <>
          <div
            className="cases-detail-header"
            style={{ padding: "1.5rem 0rem" }}
          >
            <h2
              className="app-blue-title-w-dash mt-1"
              style={{ marginBottom: "32px" }}
            >
              {t(dataToShow?.title1)}
            </h2>
            <h3 className="mb-0 font-family-regular">{dataToShow?.date}</h3>
          </div>
          <div className="cases-detail-body">
            <div style={{ width: "100%" }}>
              <img
                src={dataToShow?.img}
                className="w-100"
                style={{ height: "300px", objectFit: "contain" }}
              />
            </div>
            <div style={{ marginTop: "2.5rem", marginBottom: "2.5rem" }}>
              <AppTitle3 text={t(dataToShow?.contentTitle1)} isBold />
              <AppText1
                text={t(dataToShow?.content1)}
                isMultiLine
                otherClassNames="font-family-regular mb-0"
              />
            </div>

            <div style={{ marginBottom: "2.5rem" }}>
              <AppTitle3 text={t(dataToShow?.contentTitle2)} isBold />
              <AppText1
                text={t(dataToShow?.content2)}
                isMultiLine
                otherClassNames="font-family-regular"
              />
            </div>

            <div style={{ marginBottom: "2.5rem" }}>
              <AppTitle3 text={t(dataToShow?.contentTitle3)} isBold />

              <ListContent data={dataToShow?.list} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ConcereteCaseDetail;
