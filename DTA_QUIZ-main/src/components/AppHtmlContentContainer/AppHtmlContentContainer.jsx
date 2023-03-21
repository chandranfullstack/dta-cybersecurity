import { renderToString } from "react-dom/server";
import React, { Component } from "react";

/**
 * Given a class based or functional component, this returns the html string of the same.
 */
export const getComponentAsHtmlString = (InputComponent) =>
  renderToString(InputComponent);

/**
 * Given an html string this processes it to be rendered as a html component.
 */
export const createHtmlMarkup = (htmlContent) => ({ __html: htmlContent });

export default class HtmlContentContainer extends Component {
  render() {
    const { content } = this.props;

    return (
      <div
        className="html_content_container font-family-regular"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={createHtmlMarkup(content)}
      />
    );
  }
}
