import React from "react";
import AppText1 from "../AppText/AppText1";

const AppQProgressTracker = (props) => {
  const { otherClassNames = "", totalAnswered, totalQuestions } = props;

  // get and pre-process
  // let { progress } = this.props;
  // progress = parseInt(progress, 10);
  // progress += '%';

  return (
    <div className={`app_progress_tracker ${otherClassNames}`}>
      <AppText1
        text={`You have completed out of ${totalQuestions}`}
        otherClassNames="app_progress_tracker_text font-family-regular"
      />
      <div className="app_circle_1 p-3 bg-primary">
        <AppText1
          text={totalAnswered}
          otherClassNames="mb-0"
          color="white"
          isBold
        />
      </div>
    </div>
  );
};

export default AppQProgressTracker;
