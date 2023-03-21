import React from "react";
import HtmlContentContainer from "../AppHtmlContentContainer/AppHtmlContentContainer";
import AppTitle3 from "../AppTitle/AppTitle3";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import AppIcon from "../AppIcon/AppIcon";
import { SlNote } from "react-icons/sl";
import AppText1 from "../AppText/AppText1";
import { IoMdClose } from "react-icons/io";
import { AiOutlineCheck } from "react-icons/ai";

const AccordionItem = ({
  question,
  answer,
  index,
  accordionId,
  description,
  answerStatus,
}) => {
  const headingId = `heading-${index}`;
  const collapseId = `collapse-${index}`;

  return (
    <div className="accordion-item">
      <div className="accordion-header" id={headingId}>
        <button
          className={`accordion-button collapsed`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapseId}`}
          aria-expanded="true"
        >
          <MdOutlineKeyboardArrowRight
            className="app_result_icon1"
            style={{ marginRight: "15px" }}
          />

          <MdOutlineKeyboardArrowDown
            className="app_result_icon2"
            style={{ marginRight: "15px" }}
          />

          <div
            className="d-flex justify-content-between align-items-center"
            style={{ width: "100%" }}
          >
            <AppTitle3
              text={question}
              otherClassNames="mb-0 app_accordion_title"
              customStyles={{ width: "80%" }}
            />
            <AppIcon otherClassName={"app_icon"}>
              {!answerStatus ? (
                <IoMdClose color="#72170C" className="app_status_icon" />
              ) : (
                <AiOutlineCheck className="app_status_icon" color="#136378" />
              )}
              <SlNote className="app_right_icon" />
            </AppIcon>
          </div>
        </button>
      </div>
      <div
        id={collapseId}
        className={`accordion-collapse collapse `}
        aria-labelledby={headingId}
        data-bs-parent={`#${accordionId}`}
      >
        <div className="accordion-body" style={{ paddingLeft: "3.25rem" }}>
          <div
            className="d-flex align-items-center"
            style={{ marginLeft: "15px" }}
          >
            <AppText1
              text="Your Answer : "
              otherClassNames="mb-0 font-16"
              customstyles={{ marginRight: "5px" }}
              color="white"
            />
            <HtmlContentContainer content={answer || "N/A"} />
          </div>
          <HtmlContentContainer content={description} />
        </div>
      </div>
    </div>
  );
};

const AppQuestionPreview = (props) => {
  const { data, accordionId = "accordionId", otherClassNames = "" } = props;

  return (
    <div
      className={`accordion faqs_list_accordion ${otherClassNames}`}
      id={accordionId}
    >
      {data.map((q, index) => (
        <AccordionItem
          key={q.key + q.question}
          question={q.question}
          answer={q.answer}
          index={index + 1}
          description={q.description}
          CAnswer={q.CAnswer}
          CDescription={q.CDescription}
          accordionId={accordionId}
          answerStatus={q.answerStatus}
        />
      ))}
    </div>
  );
};

export default AppQuestionPreview;
