/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect } from "react";
import AppLayout from "src/components/AppLayout/AppLayout";
import knowledgeHubTopic from "../../assets/knowledge-hub-topic.png";
import Infoverse from "./Infoverse";
import InformationCreated from "./InformationCreated";
import useAppStore from "src/store";
import InformationValuable from "./InformationValuable";
import InformationResponsible from "./InformationResponsible";
import InformationSecurity from "./InformationSecurity";
import ConcreteCasesKnowledge from "./ConcreteCasesKnowledge";
import { useTranslation } from "react-i18next";

const KnowledgeHub = ({ onlyContent }) => {
  const { selectedComponent, setSelectedComponent } = useAppStore(
    (state) => state
  );

  console.log("selected component", selectedComponent);

  useEffect(() => {
    setSelectedComponent(<Infoverse />);
  }, []);

  return (
    <>
      {!onlyContent ? (
        <AppLayout>
          <div
            style={{
              padding: "1.5rem 0rem",
              marginBottom: "1.5rem",
            }}
          >
            <h2 className="app-blue-title d-inline text-sm-center text-md-start">
              Welcome to Cyber Security Awareness & Assessment Portal
            </h2>
            <span
              className="mb-4 font-family-regular"
              style={{
                fontWeight: 400,
                fontSize: "28px",
                color: "#26455E",
                marginLeft: "0.5rem",
              }}
            ></span>
          </div>
          <div className="d-flex flex-wrap">
            <div>
              <h2
                className="app-blue-title-w-dash"
                style={{ marginBottom: "40px" }}
              >
                Browse Knowledge Hub Topics
              </h2>
              <KnowledgeHubTopic
                selectedComponent={selectedComponent}
                setSelectedComponent={setSelectedComponent}
              />
            </div>
            {selectedComponent}
          </div>
        </AppLayout>
      ) : (
        <>{selectedComponent}</>
      )}
    </>
  );
};

const KnowledgeHubTopic = ({ selectedComponent, setSelectedComponent }) => {
  const Pagelinks = [
    {
      name: "knowledge_title_1",
      component: <Infoverse />,
      checkName: "Infoverse",
    },
    {
      name: "knowledge_title_2",
      component: <InformationCreated />,
      checkName: "InformationCreated",
    },
    {
      name: "knowledge_title_3",
      component: <InformationValuable />,
      checkName: "InformationValuable",
    },
    {
      name: "knowledge_title_4",
      component: <InformationResponsible />,
      checkName: "InformationResponsible",
    },
    {
      name: "knowledge_title_5",
      component: <InformationSecurity />,
      checkName: "InformationSecurity",
    },
    {
      name: "knowledge_title_6",
      component: <ConcreteCasesKnowledge />,
      checkName: "ConcreteCasesKnowledge",
    },
  ];

  const { t } = useTranslation();

  return (
    <div className="knowlegde-hub-topic">
      {Pagelinks.map((data) => (
        <div
          key={data.name}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => setSelectedComponent(data?.component)}
        >
          <img src={knowledgeHubTopic} />
          <span
            className="ms-3 font-family-regular"
            style={{
              fontSize: "20px",
              fontWeight: 400,
              color:
                data?.checkName === selectedComponent?.type?.name
                  ? "#136378"
                  : "#444444",
            }}
          >
            {t(data?.name)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default KnowledgeHub;
