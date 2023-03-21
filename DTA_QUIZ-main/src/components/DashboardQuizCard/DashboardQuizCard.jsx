import React from "react";
import { QUESTION_ROUTE, REGULAR, RESULT_ROUTE } from "src/utils/constant";
import AppLink from "../AppLink/AppLink";
import rightArrowImg from "../../assets/icons/right-arrow.png";
import BeginnerQuizImg from "../../assets/beginner-quiz.png";

const DashboardQuizCard = ({ quizData }) => {
  return (
    <div className="dashboard-quiz-card">
      <div className="d-flex justify-content-center align-items-center">
        <img
          className={`${quizData?.img === "email-security.png" && "ms-2"}`}
          src={quizData?.img || BeginnerQuizImg}
        />
      </div>
      <div>
        <h2 className="app-blue-title " style={{ marginBottom: "10px" }}>
          {quizData?.Quiz_name}
        </h2>
        <div
          className="quiz-dashcard-subdata"
          style={{ marginBottom: "10px", display: "flex", gap: "5px" }}
        >
          {quizData?.Quiz_time && (
            <>
              <span style={{ fontFamily: REGULAR }}>{quizData?.Quiz_time}</span>
              |
            </>
          )}
          <span style={{ fontFamily: REGULAR }}>
            {quizData?.Quiz_No_Of_questions}
          </span>
          |
          {quizData?.Quiz_status ? (
            <>
              <span style={{ color: "#319291", fontWeight: 700 }}>
                {`Score: ${quizData?.Quiz_score} / ${quizData?.Quiz_totalmarks} `}
              </span>
              {/* |
              <span
                style={{ fontFamily: REGULAR }}
              >{`(Dated: ${quizData?.date})`}</span> */}
            </>
          ) : (
            <span style={{ color: "#CA9100", fontWeight: 700 }}>
              Yet To Start
            </span>
          )}
        </div>
        <div
          className="quiz-dashcard-action"
          style={{ display: "flex", gap: "5px" }}
        >
          {quizData?.Quiz_status ? (
            <>
              <AppLink
                to={QUESTION_ROUTE(quizData?.Quiz_id)}
                state={{ quizStatus: quizData?.Quiz_status }}
              >
                <span role="button">Retake Quiz</span>
              </AppLink>
              |
              <AppLink to={RESULT_ROUTE(quizData?.Quiz_id)}>
                <span role="button">View Result</span>
              </AppLink>
            </>
          ) : (
            <>
              <AppLink
                to={QUESTION_ROUTE(quizData?.Quiz_id)}
                state={{ quizStatus: quizData?.Quiz_status }}
              >
                <span
                  role="button"
                  data-bs-toggle="modal"
                  data-bs-target="#question_instruction"
                >
                  Start Quiz
                  <img className="ms-2" src={rightArrowImg} />
                </span>
              </AppLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardQuizCard;
