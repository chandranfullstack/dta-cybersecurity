import React, { useState, useRef } from "react";
import ConcereteCaseDetail from "src/pages/ConcreteCaseDetail/ConcereteCaseDetail";
import ReadNext from "src/pages/KnowledgeHub/components/ReadNext";
import ConcreteCasesKnowledge from "src/pages/KnowledgeHub/ConcreteCasesKnowledge";
import InformationCreated from "src/pages/KnowledgeHub/InformationCreated";
import InformationResponsible from "src/pages/KnowledgeHub/InformationResponsible";
import InformationSecurity from "src/pages/KnowledgeHub/InformationSecurity";
import InformationValuable from "src/pages/KnowledgeHub/InformationValuable";
import Infoverse from "src/pages/KnowledgeHub/Infoverse";
import AppTitle1 from "../AppTitle/AppTitle1";
import AppTitle2 from "../AppTitle/AppTitle2";
import { concreteCasesData } from "src/pages/ConcreteCases/data";
import AppButton from "../AppButton/AppButton";

const IntroModal = ({ setIntroModalOff }) => {
  const [pagination, setPagination] = useState(0);
  // const { selectedComponent, setSelectedComponent } = useAppStore(
  //   (state) => state
  // );
  const headSection = useRef(null);
  const pageContents = [
    {
      name: "Welcome to the Infoverse",
      component: <Infoverse noLink={true} />,
      checkName: "Infoverse",
    },
    {
      name: "What is Information anyway and how is it created ?",
      component: <InformationCreated noLink={true} />,
      checkName: "InformationCreated",
    },
    {
      name: "Why is information Valuable ?",
      component: <InformationValuable noLink={true} />,
      checkName: "InformationValuable",
    },
    {
      name: "Which roles are responsible for handling information ?",
      component: <InformationResponsible noLink={true} />,
      checkName: "InformationResponsible",
    },
    {
      name: "What are the main protection goals of information security ?",
      component: <InformationSecurity noLink={true} />,
      checkName: "InformationSecurity",
    },
    {
      name: "Concrete Cases",
      component: <ConcreteCasesKnowledge noLink={true} />,
      checkName: "ConcreteCasesKnowledge",
    },
    {
      name: "Company car of the Men in Black",
      component: (
        <ConcereteCaseDetail
          customData={concreteCasesData[0]}
          onlyContent={true}
        />
      ),
      checkName: "Company car of the Men in Black",
    },
    {
      name: "Allianz Detective Transmitted Client Information",
      component: (
        <ConcereteCaseDetail
          customData={concreteCasesData[1]}
          onlyContent={true}
        />
      ),
      checkName: "Allianz Detective Transmitted Client Information",
    },
    {
      name: "A first-class leak",
      component: (
        <ConcereteCaseDetail
          customData={concreteCasesData[2]}
          onlyContent={true}
        />
      ),
      checkName: "A first-class leak",
    },
  ];
  const moveNext = () => {
    headSection.current?.scrollIntoView({ block: "nearest" });
    setPagination((prev) => prev + 1);
    console.log("currentPage check", pagination);
  };
  console.log("currentPage check", pagination);
  const closeModal = () => {
    setIntroModalOff({
      showIntroModal: false,
    });
  };
  return (
    <div className="intro-modal">
      <div className="into-modal-layout">
        <div className="intro-body">
          <div ref={headSection}></div>
          {pagination === 0 && (
            <>
              <AppTitle1
                text="Welcome"
                otherClassNames="text-center"
                color="primary"
              />
              <AppTitle2
                text="Explore our Knowledge base and Concrete cases"
                otherClassNames="text-center"
              />
            </>
          )}
          {/* <KnowledgeHub onlyContent={true} /> */}
          {pageContents[pagination].component}
          {pagination < 8 ? (
            <div
              className="d-flex flex-column justify-content-end align-items-end pt-4 text-end"
              style={{ marginTop: "2.5rem" }}
              onClick={() => moveNext()}
            >
              <span
                style={{ fontWeight: 400, fontSize: "20px" }}
                className="font-family-regular"
              >
                {pageContents[pagination].name}
              </span>
              <ReadNext />
            </div>
          ) : (
            <div
              className="d-flex flex-column justify-content-center align-items-center pt-4"
              style={{ marginTop: "2.5rem" }}
              onClick={() => null}
            >
              <AppButton
                text="Continue with Quiz "
                onClick={() => closeModal()}
              />
              {/* <span
                style={{ fontWeight: 400, fontSize: "20px" }}
                className="font-family-regular"
              >
                Continue with the site
              </span> */}
              {/* <ReadNext /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntroModal;
