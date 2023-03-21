import { Component } from "react";
// import { triggerSimpleAjax } from "appApi/helper";

/**
 * The app's common `Component` version used for all the pages defined in the application.
 * This is done so that there is centralized parent class for the same.
 */
export default class AppPageComponent extends Component {
  API_ENDPOINT_FOR_INITIAL_PAGE_DATA = null; // on page load | get initial data from server

  constructor(props) {
    super(props);

    this.state = {
      serverData: {},
    };
  }

  /**
   * On component load, trigger api call and set data from server.
   * Later used by the child class for rendering the elements.
   */
  componentDidMount() {
    if (this.API_ENDPOINT_FOR_INITIAL_PAGE_DATA !== null) {
      //   const initialState = this.state;
      //   triggerSimpleAjax(this.API_ENDPOINT_FOR_INITIAL_PAGE_DATA).then(
      //     (responseData) => {
      //       this.setState({
      //         ...initialState,
      //         serverData: responseData,
      //       });
      //     }
      //   );
    }
  }

  /**
   * Changes the current location of the browser, basically a
   * central redirect or href action.
   */
  changeWindowLocation = (pathname, otherConfig = {}) => {
    const { history } = this.props;
    const { urlParams = {} } = otherConfig;

    // url pre-processing: /data-models/:id => /data-models/10
    pathname = this.getReplacedString(pathname, urlParams);

    history.push({
      pathname,
      ...otherConfig,
    });
  };

  /**
   * Similar to `changeWindowLocation` except this is not within the react app.
   * So takes the user to a completely new page. Like for downloading etc.
   */
  changeLocationOutsideWindow = (pathname) => {
    window.open(pathname, "_blank");
  };

  /**
   * Given the following inputs:
   *      stringToReplace: /data-models/:id
   *      replaceConfig: {id: 10}
   *
   * Returns the following output:
   *      output: /data-models/10
   *
   * This is used as a centralized function to generate dynamic urls.
   */
  getReplacedString = (stringToReplace, replaceConfig) => {
    // url pre-processing: /data-models/:id => /data-models/10
    Object.keys(replaceConfig).map((key) => {
      stringToReplace = stringToReplace.replaceAll(
        `:${key}`,
        replaceConfig[key]
      );
    });

    return stringToReplace;
  };

  /**
   * Checks if the given array is empty or not. Used as an api helper
   * to check if data from backend is empty or not.
   */
  isArrayEmpty = (dataList) => Array.isArray(dataList) && dataList.length === 0;
}
