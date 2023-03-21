import React from "react";
import AppButton from "src/components/AppButton/AppButton";
import AppInformationModal from "src/components/AppInformationModel/AppInformationModel";
import AppJustClickableWrapper from "src/components/AppJustClickableWrapper/AppJustClickableWrapper";
import AppLayout from "src/components/AppLayout/AppLayout";
import AppQOptionCard from "src/components/AppQOptionCard/AppQOptionCard";
import AppQProgressTracker from "src/components/AppQProgressTracker/AppQProgressTracker";
import AppQuestionsTracker from "src/components/AppQuestionsTarcker/AppQuestionsTracker";
import AppText1 from "src/components/AppText/AppText1";
import AppText2 from "src/components/AppText/AppText2";
import AppTitle2 from "src/components/AppTitle/AppTitle2";
import AppToolTip from "src/components/AppToolTip/AppToolTip";
import AppPageComponent from "src/utils/AppPageComponent";
import { InstructionData } from "./data";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineRight } from "react-icons/ai";
import AppQOptionCard2 from "src/components/AppQOptionCard/AppQOptionCard2";
import AppModal from "src/components/AppModal/AppModal";
import { RESULT_ROUTE, SIGNIN_ROUTE } from "src/utils/constant";
import { withRouter } from "src/utils/withRouter";
import makeGetRequest from "src/utils/makeGetRequest";
import {
  GET_QUESTION_AND_GROUP,
  GET_QUESTION_ANSWER,
  SAVE_QUESTION_ANSWER,
} from "src/api/urls";
import { makePostRequest } from "src/utils/makePostRequest";
import { getTokenFromStorage } from "src/utils/tokenHandler";
import AppCard from "src/components/AppCard/AppCard";
import AppAlert from "src/components/AppAlert/AppAlert";

/**
 * When the user moves to the next or pervious question, these variables
 * have to be reset in the state, just a common constant.
 */
const COMMON_NEXT_OR_PREVIOUS_QUESTION_STATE_VARIABLES = {
  errorInformation: null,
  currentSelectedOptions: "",
};

class AppQuestionsPage extends AppPageComponent {
  state = {
    isLoading: true, // initial loader | reset after componentDidMount

    serverData: {}, // server related data
    currentQuestionIndex: 0, // index of question from `allAvailableQuestionsStore`
    allAvailableQuestionsStore: [], // list of question objects
    allAvailableQuestionGroupsStore: [], // list of question group objects
    allQuestionGroupIdsAndQuestionIdsStore: {}, // { <questionGroupId>: [...questionIds] }

    globalQuestionAndOptionsSelected: {}, // for global level { <questionId>: [optionIds] }
    currentSelectedOptions: "", // actual store
    answersDict: {}, // just for display

    // user notify error & info
    errorInformation: null,
    allOptionsSaved: false,
    isModal: false,
    rightAnswerModal: false,
    percentageCompleted: 0,
    hours: parseInt(0),
    minutes: parseInt(3),
    seconds: parseInt(0),
    over: false,
    alertModal: false,
    errorText: "",
  };

  /**
   * Returns all the selected option ids from the globalQuestionAndOptionsSelected.
   * Used to send data to the server to receive data accordingly.
   */
  getAllSelectedOptionIds = () => {
    const { globalQuestionAndOptionsSelected } = this.state;
    let allSelectedOptionIds = [];

    for (let [, optionIdsList] of Object.entries(
      globalQuestionAndOptionsSelected
    )) {
      optionIdsList = optionIdsList.map((id) => parseInt(id, 10));
      allSelectedOptionIds = [...allSelectedOptionIds, ...optionIdsList];
    }

    return allSelectedOptionIds;
  };

  /**
   * Get all necessary data from the server, like data for the left component, right component.
   */

  tick = () => {
    const { over, hours, minutes, seconds } = this.state;

    if (over) return;
    if (hours == 0 && minutes == 0 && seconds == 0)
      this.setState({ ...this.state, over: true });
    else if (minutes == 0 && seconds == 0)
      this.setState({
        ...this.state,
        hours: hours - 1,
        minutes: 59,
        seconds: 59,
      });
    else if (seconds == 0)
      this.setState({
        ...this.state,
        hours: hours,
        minutes: minutes - 1,
        seconds: 59,
      });
    else
      this.setState({
        ...this.state,
        hours: hours,
        minutes: minutes,
        seconds: seconds - 1,
      });
  };

  componentDidMount() {
    console.log(this.props);

    const { router } = this.props;

    if (!getTokenFromStorage()) {
      router.navigate(SIGNIN_ROUTE);
    }

    const getData = async () => {
      const res = await makeGetRequest(
        GET_QUESTION_AND_GROUP(router?.params?.quizID)
      );
      this.setState({
        ...this.state,
        isLoading: false,
      });

      const allAvailableQuestionsStore = [];
      const allAvailableQuestionGroupsStore = [];
      const allQuestionGroupIdsAndQuestionIdsStore = {};
      res?.data?.map((questionGroupData) => {
        allQuestionGroupIdsAndQuestionIdsStore[questionGroupData.Group_id] = [];
        allAvailableQuestionGroupsStore.push(questionGroupData);
        questionGroupData?.Questions?.map((questionData) => {
          allAvailableQuestionsStore.push(questionData);
          allQuestionGroupIdsAndQuestionIdsStore[
            questionGroupData.Group_id
          ].push(questionData.Question_id);
        });
      });

      this.setState(
        {
          ...this.state,
          QuestionGroupAndData: res?.data,
          serverData: res?.data,
          allAvailableQuestionsStore,
          allAvailableQuestionGroupsStore,
          allQuestionGroupIdsAndQuestionIdsStore,
          isLoading: false,
          isModal: true,
          percentageCompleted: 0,
        },
        () => {
          this.fetchAndSetCurrentQuestionDetails();
        }
      );
    };

    getData();

    // let timerID = setInterval(() => this.tick(), 1000);
    // return () => clearInterval(timerID);
  }

  /**
   * Very similar to `getCurrentQuestionDetails` but returns the question group
   * for the active question. This is used for validations and stuff.
   */
  getCurrentQuestionGroupDetails = () => {
    const questionData = this.getCurrentQuestionDetails();
    const {
      allQuestionGroupIdsAndQuestionIdsStore,
      allAvailableQuestionGroupsStore,
    } = this.state;

    for (const [questionGroupId, questionIds] of Object.entries(
      allQuestionGroupIdsAndQuestionIdsStore
    )) {
      if (questionIds.includes(questionData?.Question_id)) {
        for (
          let index = 0;
          index < allAvailableQuestionGroupsStore.length;
          index += 1
        ) {
          const questionGroupData = allAvailableQuestionGroupsStore[index];

          if (questionGroupData.Group_id === parseInt(questionGroupId, 10)) {
            return questionGroupData;
          }
        }
      }
    }

    return {};
  };

  /**
   * Gets the current question based on the currentQuestionIndex and allAvailableQuestionsStore.
   * This is just a centralized function to get the question.
   */
  getCurrentQuestionDetails = () => {
    const { currentQuestionIndex, allAvailableQuestionsStore } = this.state;
    return allAvailableQuestionsStore[currentQuestionIndex];
  };

  /**
   * Given the `currentQuestionId` in the state, this gets the question details
   * from the server and sets it on the screen along with the options.
   */
  fetchAndSetCurrentQuestionDetails = () => {
    const currentQuestion = this.getCurrentQuestionDetails();
    const { globalQuestionAndOptionsSelected } = this.state;

    this.setState({
      ...this.state,
      currentSelectedOptions:
        globalQuestionAndOptionsSelected[currentQuestion.Question_id] || [],
      serverData: {
        ...this.serverData,
        currentQuestionData: currentQuestion,
      },
      allOptionsSaved: false,
      isLoading: false,
    });

    // triggerSimpleAjax(
    //   `api/question-with-options/${currentQuestion.id}/`,
    //   "post",
    //   {
    //     other_linkages: this.getAllSelectedOptionIds(),
    //   }
    // ).then((responseData) => {
    //   const { serverData = {} } = this.state;

    //   this.setState({
    //     ...this.state,
    //     currentSelectedOptions:
    //       globalQuestionAndOptionsSelected[currentQuestion.id] || [],
    //     serverData: {
    //       ...serverData,
    //       currentQuestionData: responseData,
    //     },
    //     allOptionsSaved: false,
    //     isLoading: false,
    //   });
    // });
  };

  /**
   * Given the Id of a question, this returns the index of the question
   * with the given Id in the question store.
   */
  getIndexOfQuestionFromStoreWhereQuestionId = (questionId) => {
    const { allAvailableQuestionsStore } = this.state;

    for (let index = 0; index < allAvailableQuestionsStore.length; index += 1) {
      const questionData = allAvailableQuestionsStore[index];
      if (questionData.Question_id === questionId) {
        return index;
      }
    }

    return null;
  };

  /**
   * Handles the fact that the user has selected a question section.
   * Like reload the questions answers or load fresh page etc.
   */
  onQuestionSectionClicked = async (questionId) => {
    const {
      currentQuestionIndex,
      allAvailableQuestionsStore,
      globalQuestionAndOptionsSelected,
    } = this.state;

    const destinationQuestionIndex =
      this.getIndexOfQuestionFromStoreWhereQuestionId(questionId);

    const filterQuestion = allAvailableQuestionsStore?.filter(
      (data) => data?.Question_id === questionId
    );

    const filterOption = await filterQuestion?.[0]?.Options?.filter(
      (option) => {
        return (
          +option?.Option_id === +globalQuestionAndOptionsSelected?.[questionId]
        );
      }
    );

    if (
      destinationQuestionIndex < currentQuestionIndex ||
      this.isValidAndAllowedToMoveFromQuestion()
    )
      this.setState(
        {
          ...this.state,
          ...COMMON_NEXT_OR_PREVIOUS_QUESTION_STATE_VARIABLES,
          selectedOption: {
            Answer: filterOption?.[0]?.identity,
            option: filterOption?.[0]?.Option_id?.toString(),
          },
          currentQuestionIndex: destinationQuestionIndex,
          errorText: "",
          alertModal: false,
        },
        () => {
          this.fetchAndSetCurrentQuestionDetails();
        }
      );
  };

  /**
   * Handles the fact that the user has selected a given option.
   * Basically handles the toggle operation and other stuff.
   */
  handleOptionClicked = (option) => {
    // const { currentSelectedOptions } = this.state;

    // if (!currentSelectedOptions.includes(optionId)) {
    //   currentSelectedOptions.push(optionId);
    // } else {
    //   currentSelectedOptions.pop(optionId);
    // }

    this.setState({
      ...this.state,
      currentSelectedOptions: option.id,
      selectedOption: {
        Answer: option?.title,
        option: option?.id?.toString(),
      },
    });

    this.IsNextArrowValid();
  };

  /**
   * Handles the fact that the user has clicked on the previous question button.
   * Makes necessary api calls and stuff.
   */
  handlePreviousQuestionButtonClicked = () => {
    let { currentQuestionIndex } = this.state;
    this.setState(
      {
        ...this.state,
        ...COMMON_NEXT_OR_PREVIOUS_QUESTION_STATE_VARIABLES,
        currentQuestionIndex: (currentQuestionIndex -= 1),
      },
      () => {
        this.fetchAndSetCurrentQuestionDetails();
      }
    );
  };

  /**
   * Handles the fact that the user has clicked on the next question button.
   * Makes necessary api calls and stuff.
   */
  handleNextQuestionButtonClicked = async () => {
    if (this.isValidAndAllowedToMoveFromQuestion()) {
      this.setState(
        {
          ...this.state,
          ...COMMON_NEXT_OR_PREVIOUS_QUESTION_STATE_VARIABLES,
        },
        () => {
          this.fetchAndSetCurrentQuestionDetails();
        }
      );
    }
  };

  /**
   * Handles the fact that the user wants to save the progress of the current
   * step. Validates the user input and send request to server etc.
   */
  handleSaveAndNextQuestionClicked = async (type = "normal") => {
    if (this.isValidAndAllowedToMoveFromQuestion()) {
      const { currentSelectedOptions } = this.state;

      if (currentSelectedOptions) {
        const {
          globalQuestionAndOptionsSelected,
          answersDict,
          allAvailableQuestionsStore,
        } = this.state;
        const { currentQuestionData } = this.state.serverData; // from server

        const questionData = this.getCurrentQuestionDetails(); // in-app

        const { selectedOption } = this.state;

        this.setState({
          ...this.state,
          isLoading: true,
        });

        const { router } = this.props;

        await makePostRequest(SAVE_QUESTION_ANSWER, {
          Answer: selectedOption?.Answer || null,
          option: selectedOption?.option || null,
          Quiz_id: router?.params?.quizID,
          Question_id: currentQuestionData?.Question_id,
          Status: router?.location?.state?.quizStatus,
        })
          .then(async (res) => {
            // pre-process
            globalQuestionAndOptionsSelected[questionData.Question_id] =
              currentSelectedOptions;

            answersDict[questionData.Question_id] = [];
            currentQuestionData.Options.map((option) => {
              if (currentSelectedOptions === option.Option_id)
                answersDict[questionData.Question_id].push(option.identity);
            });

            let answerResponse;

            await makeGetRequest(
              GET_QUESTION_ANSWER(
                currentQuestionData?.Question_id,
                selectedOption?.option,
                res?.data?.Answer_id
              )
            )
              .then((res) => {
                answerResponse = res;
              })
              .catch((err) => {
                answerResponse = err?.response?.data;
                this.setState({
                  ...this.state,
                  isLoading: false,
                  alertModal: false,
                  errorText: "",
                });
              });

            if (type === "submit") {
              const { navigate, params } = this.props.router;

              navigate(RESULT_ROUTE(params.quizID));
            }

            // save
            this.setState(
              {
                ...this.state,
                globalQuestionAndOptionsSelected,
                answersDict,
                rightAnswerModal: true,
                currentQuestionIndex: (this.state.currentQuestionIndex += 1),
                percentageCompleted:
                  (Object.keys(globalQuestionAndOptionsSelected).length /
                    allAvailableQuestionsStore.length) *
                  100,
                selectedOption: {},
                isLoading: false,
                rightAnswerOption: answerResponse,
                alertModal: false,
                errorText: "",
              },
              () => {
                const { currentQuestionIndex } = this.state;
                const hasNextQuestion =
                  currentQuestionIndex < allAvailableQuestionsStore.length;

                if (hasNextQuestion) {
                  this.handleNextQuestionButtonClicked();
                }
              }
            );
          })
          .catch((err) => {
            this.setState({
              ...this.state,
              isLoading: false,
              alertModal: true,
              errorText: err?.response?.data?.message,
            });
          });
      } else {
        // this.handleSkipThisQuestionClicked(); // chain of responsibility
        // this.setState({
        //   ...this.state,
        //   currentQuestionIndex: (this.currentQuestionIndex += 1),
        // });
      }
    }
  };

  handleSubmitQuestionClicked = () => {
    this.handleSaveAndNextQuestionClicked("submit");
  };

  /**
   * Handles the fact that the user has clicked the skip this question
   * button, very similar to `handleSkipThisQuestionClicked`.
   */

  handleSkipThisQuestionClicked = () => {
    const { globalQuestionAndOptionsSelected, answersDict } = this.state;

    const questionData = this.getCurrentQuestionDetails();

    // pre-process | reset the selected stuff for the question
    delete globalQuestionAndOptionsSelected[questionData.Question_id];
    delete answersDict[questionData.Question_id];

    this.setState(
      {
        ...this.state,
        globalQuestionAndOptionsSelected,
        answersDict,
      },
      () => this.handleNextQuestionButtonClicked()
    );
  };

  /**
   * Returns if the current question is required or not. This is parent
   * deciding function to check if the question can be skipped or not.
   */
  checkIfCurrentQuestionRequired = () =>
    this.getCurrentQuestionGroupDetails().is_required;

  /**
   * Checks if the user is allowed to move to the next question, returns a boolean accordingly.
   * If not allowed, then sets the error message, why so. This is the validation function.
   */
  isValidAndAllowedToMoveFromQuestion = () => {
    const questionGroupData = this.getCurrentQuestionGroupDetails();
    const { currentSelectedOptions } = this.state;

    if (questionGroupData.is_required === true && !currentSelectedOptions) {
      this.setState({
        ...this.state,
        errorInformation: `
                    Please select at least one option to continue to the
                    next question.
                    `,
      });
      return false;
    }

    return true;
  };

  /**
   * User has filled all the necessary questions and wishes to view
   * the predicted models for his inputs. Make the server call
   * and move to the next page.
   */
  handleViewPredictedModelsButtonClicked = () => {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    // triggerSimpleAjax(`api/generate-recommended-model/`, "post", {
    //   other_linkages: this.getAllSelectedOptionIds(),
    // }).then((responseData) => {
    //   this.setState(
    //     {
    //       ...this.state,
    //       isLoading: false,
    //     },
    //     () => {
    //       const { setViewerToken } = this.props;
    //       setViewerToken(responseData.token);
    //       this.changeWindowLocation(APP_DATA_MODELS_RECOMMENDATION_PAGE_URL);
    //     }
    //   );
    // });
  };

  /**
   * Called when a option is clicked
   * Checks if all the options that are currently saved in answerDict
   * If not updates the state to disable the next Arrow
   * */
  IsNextArrowValid = () => {
    const {
      allAvailableQuestionsStore,
      currentQuestionIndex,
      answersDict,
      currentSelectedOptions,
    } = this.state;

    const currentQuestionId =
      allAvailableQuestionsStore[currentQuestionIndex]?.Question_id;
    const currentSavedAnswers = answersDict[currentQuestionId];

    if (currentSavedAnswers) {
      const isNextButtonAllowed =
        currentSavedAnswers.length === currentSelectedOptions.length;
      this.setState({
        allOptionsSaved: !isNextButtonAllowed,
      });
    } else {
      this.setState({
        allOptionsSaved: true,
      });
    }
  };

  onHide = () => {
    this.setState({
      isModal: false,
    });
  };

  onCloseRightAnswerModal = () => {
    this.setState({
      ...this.state,
      rightAnswerModal: false,
    });
  };

  /**
   * Called before the return inside render(), this is used as a per layer to
   * get a config dict which contains necessary variables for the jsx.
   * Just a dry layer above the render() layer.
   */
  preRenderAndGetNecessaryConfig = () => {
    const {
      currentSelectedOptions,
      isLoading,
      currentQuestionIndex,
      allQuestionGroupIdsAndQuestionIdsStore,
      errorInformation,
      answersDict,
      allAvailableQuestionsStore,
      QuestionGroupAndData,
      globalQuestionAndOptionsSelected,
    } = this.state;

    const {
      currentQuestionData = QuestionGroupAndData?.[currentQuestionIndex || 0],
    } = this.state.serverData || {}; // server data state

    // derived stuff
    const isCurrentQuestionRequired = this.checkIfCurrentQuestionRequired();

    // pre-processing left side tab data
    const questionGroupsAndQuestionsData = [];
    // change questions_groups_and_questions ||
    QuestionGroupAndData?.map((questionGroupData) => {
      // questions
      const questionsList = [];
      questionGroupData.Questions?.map((questionData) => {
        questionsList.push({
          id: questionData.Question_id,
          title: questionData.identity,
          // hint: questionData?.hint,
          onClick: () => {
            this.onQuestionSectionClicked(questionData?.Question_id);
          },
          isActive:
            currentQuestionData?.Question_id === questionData?.Question_id,
        });
      });

      // question groups
      questionGroupsAndQuestionsData.push({
        id: questionGroupData.Group_id,
        title: questionGroupData.Group_name,
        isRequired: questionGroupData.is_required,
        isCollapsed: !(
          allQuestionGroupIdsAndQuestionIdsStore[questionGroupData.Group_id] ||
          []
        ).includes(currentQuestionData?.Question_id),
        questionsList,
        answersDict,
      });
    });

    let isPrevious =
      globalQuestionAndOptionsSelected?.[currentQuestionData?.Question_id];

    // pre-processing current question options
    const currentQuestionOptions = (currentQuestionData?.Options || []).map(
      (option) => ({
        id: option.Option_id,
        title: option.identity,
        description: option.description,
        info: option.why_we_ask_this,
        infoTitle: option.why_we_ask_this_title,
        isDisabled: isPrevious ? true : option.is_disabled,
        icon: option.image_placeholder,
      })
    );

    // layout navigation stuff
    const hasPreviousQuestion = currentQuestionIndex !== 0;
    const hasNextQuestion =
      currentQuestionIndex < allAvailableQuestionsStore.length - 1;

    // progress bar Stuff
    const totalNumberOfAnsweredQuestions = Object.keys(answersDict).length;
    const totalNumberOfQuestions = allAvailableQuestionsStore.length;

    return {
      // layout
      isLoading,
      // data
      questionGroupsAndQuestionsData,
      currentQuestionIndex,
      currentQuestionData,
      // validations
      errorInformation,
      currentQuestionOptions,
      currentSelectedOptions,
      isCurrentQuestionRequired,
      // navigation
      hasNextQuestion,
      hasPreviousQuestion,
      // progressbar
      totalNumberOfAnsweredQuestions,
      totalNumberOfQuestions,
      // next button
      // isNextButtonAllowed,
    };
  };

  render() {
    const {
      // data
      questionGroupsAndQuestionsData,
      currentQuestionIndex,
      currentQuestionData,
      // validations
      errorInformation,
      currentQuestionOptions,
      currentSelectedOptions,
      isCurrentQuestionRequired,
      // navigation
      hasNextQuestion,
      hasPreviousQuestion,
      // progressbar
      totalNumberOfAnsweredQuestions,
      totalNumberOfQuestions,
    } = this.preRenderAndGetNecessaryConfig();

    const {
      allOptionsSaved,
      percentageCompleted,
      allAvailableQuestionsStore,
      globalQuestionAndOptionsSelected,
      selectedOption,
      hours,
      minutes,
      seconds,
    } = this.state;

    const insDesc = InstructionData.split(".");

    return (
      <AppLayout isFooter={false} isTranslucentLoader={this.state.isLoading}>
        {!this.state.isLoading && (
          <div className="wizard_based_questions_page">
            <div className="page_section_1 pt-0">
              <AppQProgressTracker
                otherClassNames=""
                totalAnswered={totalNumberOfAnsweredQuestions}
                totalQuestions={totalNumberOfQuestions}
                progress={percentageCompleted}
              />
              <div className="row">
                <div className="col-lg-4 pt-4 d-flex justify-content-center">
                  <AppQuestionsTracker data={questionGroupsAndQuestionsData} />
                  {/* <AppCard otherClassName="app_time_remain_card">
                  <div className="d-flex justify-content-center align-items-center">
                    <AppText1
                      text="Time Remaining : "
                      otherClassNames="mb-0 font-family-regular"
                    />
                    <AppText1
                      text={`${hours.toString().padStart(2, "0")}:${minutes
                        .toString()
                        .padStart(2, "0")}:${seconds
                        .toString()
                        .padStart(2, "0")}`}
                      isBold
                      otherClassNames="mb-0 ms-1"
                    />
                  </div>
                </AppCard> */}
                </div>
                <div className="col-lg-8 pt-4">
                  <AppTitle2
                    isMultiLine
                    otherClassNames="mb-2"
                    text={`#${currentQuestionData?.Question_group} ${currentQuestionData?.title}`}
                  />
                  <div className="d-flex align-items-baseline flex-column mb-2">
                    <AppTitle2
                      otherClassNames="mb-2 me-2 font-family-regular"
                      text={currentQuestionData?.title_2}
                      isBold={false}
                      isMultiLine
                    />

                    {currentQuestionData?.why_we_ask_this && (
                      <>
                        <div className="d-flex">
                          <AppText2
                            otherClassNames="d-inline  mb-0 font-family-regular"
                            text={currentQuestionData?.why_we_ask_this_title}
                          />
                          <AppText2
                            otherClassNames="d-inline ms-1 mb-0 link_underline font-family-regular"
                            color="primary"
                            data-bs-toggle="modal"
                            data-bs-target="#question_why_we_ask_this_modal"
                            text={currentQuestionData?.why_we_ask_this_title_2}
                          />
                          <AppInformationModal
                            title={currentQuestionData?.why_we_ask_this_title}
                            description={currentQuestionData?.why_we_ask_this}
                            modalId="question_why_we_ask_this_modal"
                          />
                        </div>
                        <div className="alert-why-ask-this mt-3">
                          <div className="d-flex justify-content-between">
                            <AppText1
                              text={currentQuestionData?.hint_title}
                              color="primary"
                              isBold
                              customstyles={{ fontSize: "12px" }}
                            />
                            <MdOutlineClose style={{ cursor: "pointer" }} />
                          </div>

                          <AppText1
                            text={currentQuestionData?.hint_description}
                            customstyles={{ fontSize: "12px" }}
                            otherClassNames="font-family-regular"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {this.state.errorText && (
                    <AppAlert variant={"danger"} otherClassNames="errorAlert">
                      {this.state.errorText}
                    </AppAlert>
                  )}

                  <div className="pb-2 row app_just_row_padded_columns">
                    {currentQuestionData?.type === "regular" ||
                    !currentQuestionData?.type ? (
                      currentQuestionOptions.map((option) => (
                        <div className="col-md-6" key={`option-${option.id}`}>
                          <AppQOptionCard
                            isSelected={currentSelectedOptions === option.id}
                            onClick={() => {
                              if (!option.isDisabled)
                                this.handleOptionClicked(option);
                            }}
                            {...option}
                          />
                        </div>
                      ))
                    ) : (
                      <>
                        {currentQuestionData?.img && (
                          <img
                            src={currentQuestionData?.img}
                            style={{
                              marginTop: "1rem",
                              maxHeight: "300px",
                              objectFit: "fill",
                            }}
                          />
                        )}
                        {currentQuestionOptions.map((option) => (
                          <div className="col-md-6" key={`option-${option.id}`}>
                            <AppQOptionCard2
                              isSelected={currentSelectedOptions === option.id}
                              onClick={() => {
                                if (!option.isDisabled)
                                  this.handleOptionClicked(option);
                              }}
                              {...option}
                            />
                          </div>
                        ))}
                      </>
                    )}

                    {/* <div className="page_bottom_actions pt-4">
                    <div className="right_scroll_actions">
                      <AppButton
                        onClick={this.handlePreviousQuestionButtonClicked}
                        otherClassNames="px-2"
                        color="light"
                        isDisabled={!hasPreviousQuestion}
                        // icon={
                        //   <AppFontAwesomeIcon
                        //     otherClassNames="text-black"
                        //     icon={faChevronUp}
                        //     size="sm"
                        //   />
                        // }
                      />
                      <AppToolTip
                        content={nextArrowErrorDescription}
                        show={allOptionsSaved}
                      >
                        <div>
                          <AppButton
                            onClick={this.handleNextQuestionButtonClicked}
                            otherClassNames="px-2 ms-1"
                            color="light"
                            isDisabled={allOptionsSaved}
                            // icon={
                            //   <AppFontAwesomeIcon
                            //     otherClassNames="text-black"
                            //     icon={faChevronDown}
                            //     size="sm"
                            //   />
                            // }
                          />
                        </div>
                      </AppToolTip>
                    </div>
                  </div> */}
                  </div>

                  <div className="col-12 mt-3 app_question_next_btn_col">
                    <div className="page_top_actions justify-content-end">
                      <AppButton
                        // isDisabled={selectedOption?.option ? false : true}
                        onClick={
                          currentQuestionIndex <
                          allAvailableQuestionsStore.length - 1
                            ? this.handleSaveAndNextQuestionClicked
                            : this.handleSubmitQuestionClicked
                        }
                        text={
                          currentQuestionIndex <
                          allAvailableQuestionsStore.length - 1
                            ? "Next"
                            : "Submit"
                        }
                        iconOrientation="right"
                        icon={
                          currentQuestionIndex <
                            allAvailableQuestionsStore.length - 1 && (
                            <AiOutlineRight
                              style={{ cursor: "pointer", marginLeft: "10px" }}
                            />
                          )
                        }
                        //   isDisabled={!currentSelectedOptions.length}
                        data-bs-toggle={!hasNextQuestion && "modal"}
                        // data-bs-target="#viewPredictedModals"
                      />
                      {/* {isCurrentQuestionRequired || (
                      <div className="d-flex align-items-center">
                        <AppText2 otherClassNames="m-0 ms-2 me-2" text="OR" />
                        <AppJustClickableWrapper
                          onClick={this.handleSkipThisQuestionClicked}
                        >
                          <AppText2
                            otherClassNames="d-inline ms-1 mb-0 link_underline"
                            color="primary"
                            text={"Skip This For now"}
                          />
                        </AppJustClickableWrapper>
                      </div>
                    )} */}

                      <AppInformationModal
                        title="Successfully Completed"
                        description="Thank you for your responses! You have
                                            reached the end of our tool, click on the button
                                            below to view related data stewardship models
                                            and case studies."
                        modalId="viewPredictedModals"
                        button={
                          <AppButton
                            onClick={() =>
                              // eslint-disable-next-line max-len
                              this.handleViewPredictedModelsButtonClicked()
                            }
                            text="View stewardship Models"
                            isTextOnly
                            color="outline-primary"
                            iconOrientation="right"
                            data-bs-dismiss="modal"
                            //   icon={
                            //     <AppFontAwesomeIcon
                            //       icon={faChevronRight}
                            //       color="primary"
                            //       size="sm"
                            //       otherClassNames="ms-2"
                            //     />
                            //   }
                          />
                        }
                      />
                      <AppModal
                        show={this.state.isModal}
                        onHide={this.onHide}
                        title_1={"Important Instructions"}
                        title_2={"Before You Get Started"}
                        description={insDesc}
                        btnText="Am Good! Lets Get Started"
                      />

                      <AppModal
                        show={this.state.rightAnswerModal}
                        onHide={this.onCloseRightAnswerModal}
                        title_1={this?.state?.rightAnswerOption?.message}
                        // selectedOptionData={selectedOption}
                        option={this?.state?.rightAnswerOption?.option}
                        description={this?.state?.rightAnswerOption?.Answer}
                        isRight={true}
                        btnText="OK, Got it !"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AppLayout>
    );
  }
}

export default withRouter(AppQuestionsPage);
