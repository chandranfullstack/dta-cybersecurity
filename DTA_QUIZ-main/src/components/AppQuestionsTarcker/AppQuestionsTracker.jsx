import React from "react";
import AppText1 from "../AppText/AppText1";
import AppTitle3 from "../AppTitle/AppTitle3";

const WIZARD_ACCORDION_PARENT_ID = "wizard_questions_tracker";

/**
 * The component that represents the single question group block, the questions
 * and answers under it. This communicates the on click events to the page
 * using an interface or function passed from the page like an interface.
 */
const WizardQuestionGroupBlock = ({
  title,
  index,
  questionsList,
  answersDict = {},
  isRequired = false,
  isCollapsed = true,
}) => {
  // for mapping the group to the body
  const questionGroupCollapseId = `collapse-${index}`;

  // other common stuff
  const totalQuestionsAnswered = questionsList?.filter((questionInfo) =>
    Object.keys(answersDict)?.includes(questionInfo?.id?.toString())
  ).length;
  const totalQuestions = questionsList?.length;

  return (
    <div className="accordion-item">
      {/* the header */}
      <div className="accordion-header">
        <button
          className={`accordion-button ${isCollapsed && "collapsed"}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${questionGroupCollapseId}`}
        >
          <AppTitle3
            text={`${title} (${totalQuestionsAnswered}/${totalQuestions})`}
            otherClassNames="mb-0 app_letter_spacing_1 font-16"
            customStyles={{ color: "black" }}
          />

          {isRequired && <span className="text-danger ms-1">*</span>}
        </button>
      </div>

      {/* the body under the header */}
      <div
        id={questionGroupCollapseId}
        className={`accordion-collapse collapse ${!isCollapsed && "show"}`}
        data-bs-parent={`#${WIZARD_ACCORDION_PARENT_ID}`}
      >
        <div className="accordion-body">
          {/* the questions under the question group */}
          {questionsList?.map((question, questionIndex) => {
            const answerForQuestion = answersDict[question.id] || null;
            questionIndex += 1; // 0 -> 1 | for displaying serial number

            return (
              <div
                key={question.title}
                className={`question_section ${question.isActive && "active"}`}
                onClick={question.onClick}
              >
                <div className="d-flex align-items-center">
                  <div className={`number ${answerForQuestion && "active"}`}>
                    <AppText1
                      text={questionIndex}
                      otherClassNames="m-0"
                      customstyles={{ fontSize: "15px" }}
                      color="white"
                    />
                  </div>
                  <div>
                    <AppTitle3
                      text={question.title}
                      otherClassNames="mb-0"
                      color="primary"
                      isBold
                      customStyles={{ fontSize: "15px" }}
                    />
                    {answerForQuestion ? (
                      <div className="answer_body">
                        <AppText1
                          otherClassNames="mb-0 me-1 font-family-regular"
                          text="Your Answer:"
                          customstyles={{ fontSize: "14px" }}
                        />
                        <AppText1
                          otherClassNames="mb-0"
                          text={
                            answerForQuestion.join(", ")
                              ? answerForQuestion.join(", ")
                              : "N/A"
                          }
                          customstyles={{ fontSize: "14px" }}
                        />
                      </div>
                    ) : (
                      <AppText1 text={question.hint} otherClassNames="m-0" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/**
 * The left side component of the wizard questions page where this represents
 * the list of question groups and the questions under it.
 */
const AppQuestionsTracker = (props) => {
  const { data } = props;

  return (
    <div
      className="wizard_questions_tracker accordion"
      id={WIZARD_ACCORDION_PARENT_ID}
    >
      {data.map((questionGroup, index) => (
        <WizardQuestionGroupBlock
          key={questionGroup.title}
          index={index + 1}
          {...questionGroup}
        />
      ))}
    </div>
  );
};

export default AppQuestionsTracker;
