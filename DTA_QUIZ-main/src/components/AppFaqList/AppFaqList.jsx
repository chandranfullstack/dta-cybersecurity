import React, { Component } from "react";
import HtmlContentContainer from "../AppHtmlContentContainer/AppHtmlContentContainer";
import AppLink from "../AppLink/AppLink";
import AppTitle3 from "../AppTitle/AppTitle3";

const AccordionItem = ({
  question,
  answer,
  answer2,
  link,
  index,
  accordionId,
  path,
}) => {
  const headingId = `heading-${index}`;
  const collapseId = `collapse-${index}`;
  return (
    <div className="accordion-item">
      <div className="accordion-header" id={headingId}>
        <button
          className={`accordion-button ${index === 1 ? "" : "collapsed"}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapseId}`}
          aria-expanded="true"
        >
          <AppTitle3
            text={`Q${index}. ${question}`}
            otherClassNames="mb-0 app_title_4_accordion"
          />
        </button>
      </div>
      <div
        id={collapseId}
        className={`accordion-collapse collapse ${index === 1 ? "show" : ""} `}
        aria-labelledby={headingId}
        data-bs-parent={`#${accordionId}`}
      >
        <div className="accordion-body">
          <HtmlContentContainer content={answer} />
          <HtmlContentContainer content={answer2} />
          <AppLink href={path} otherClassNames="faq_app_link">
            {link}
          </AppLink>
        </div>
      </div>
    </div>
  );
};

export default class AppFaqsList extends Component {
  render() {
    const {
      data,
      accordionId = "accordionId",
      otherClassNames = "",
    } = this.props;
    return (
      <div
        className={`accordion faqs_list_accordion ${otherClassNames}`}
        id={accordionId}
      >
        {data.map((faq, index) => (
          <AccordionItem
            key={faq.key + faq.question}
            question={faq.question}
            answer={faq.answer}
            answer2={faq.answer2}
            link={faq.link}
            path={faq.path}
            index={index + 1}
            accordionId={accordionId}
          />
        ))}
      </div>
    );
  }
}
