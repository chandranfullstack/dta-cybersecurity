import React from "react";
import DashboardQuizCard from "src/components/DashboardQuizCard/DashboardQuizCard";
import DashboardAside from "src/components/DashboardAside/DashboardAside";
import AppLayout from "src/components/AppLayout/AppLayout";
import {
  CONCRETE_CASES_LIST_ROUTE,
  KNOWLEDGEHUB_ROUTE,
  PASSWORD_GENERATOR_ROUTE,
  PASSWORD_SECURITY_CHECKER_ROUTE,
  REGULAR,
} from "src/utils/constant";
import InfoImg from "../../assets/info-security.png";
import concreteCasesImg from "../../assets/concrete-cases.png";
import strongPassImg from "../../assets/strong-pass.png";
import checkPassImg from "../../assets/check-pass.png";
import makeGetRequest from "src/utils/makeGetRequest";
import { GET_QUIZ_LIST } from "src/api/urls";
import { useQuery } from "react-query";

const Dashboard = () => {
  const { data: quizList, isLoading } = useQuery(GET_QUIZ_LIST, () =>
    makeGetRequest(GET_QUIZ_LIST)
  );
  // const { showIntroModal, setIntroModalOff } = useAppStore((state) => state);
  // console.log("showIntroModal", showIntroModal);

  // {
  //   img: PhishingImg,
  //   title: "Phishing : To Click Or Not To Click Assessment",
  //   duration: "10 Mins",
  //   questions: "20 Scenarios",
  //   score: null,
  //   date: null,
  // },
  // {
  //   img: EmailImg,
  //   title: "Email Security 101",
  //   duration: "5 Mins",
  //   questions: "5 Scenarios",
  //   score: null,
  //   date: null,
  // },

  const asideData = [
    {
      menutitle: "Knowledge Corner",
      submenu: [
        {
          icon: InfoImg,
          subtitle: "About Information Security",
          to: KNOWLEDGEHUB_ROUTE,
        },
        {
          icon: concreteCasesImg,
          subtitle: "Top Concrete Cases",
          to: CONCRETE_CASES_LIST_ROUTE,
        },
      ],
    },
    {
      menutitle: "Useful Tools",
      submenu: [
        {
          icon: strongPassImg,
          subtitle: "Strong Password Generator",
          to: PASSWORD_GENERATOR_ROUTE,
        },
        {
          icon: checkPassImg,
          subtitle: "Check Your Password Strength",
          to: PASSWORD_SECURITY_CHECKER_ROUTE,
        },
      ],
    },
  ];

  return (
    <AppLayout isLoading={isLoading}>
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
          className="mb-4"
          style={{
            fontFamily: REGULAR,
            fontSize: "28px",
            color: "#26455E",
            marginLeft: "0.5rem",
          }}
        ></span>
      </div>
      <div className="dash-cont">
        <div className="left-content">
          <h2
            className="app-blue-title-y-dash"
            style={{ marginBottom: "40px" }}
          >
            Your Quizzes
          </h2>
          <div className="d-flex flex-column" style={{ gap: "24px" }}>
            {quizList?.data?.map((data) => (
              <DashboardQuizCard key={data.img} quizData={data} />
            ))}
          </div>
        </div>
        <div>
          <DashboardAside asideData={asideData} />
        </div>
      </div>
      {/* {showIntroModal && <IntroModal setIntroModalOff={setIntroModalOff} />} */}
    </AppLayout>
  );
};

export default Dashboard;
