import React from "react";
import { useParams } from "react-router-dom";
import { GET_RESULT_LIST } from "src/api/urls";
import AppButton from "src/components/AppButton/AppButton";
import AppLayout from "src/components/AppLayout/AppLayout";
import AppQuestionPreview from "src/components/AppQuestionPreview/AppQuestionPreview";
import AppText1 from "src/components/AppText/AppText1";
import makeGetRequest from "src/utils/makeGetRequest";
import { useQuery } from "react-query";

const Result = () => {
  const params = useParams();

  const { data: resultData, isLoading } = useQuery(
    GET_RESULT_LIST(params.quizID),
    () => makeGetRequest(GET_RESULT_LIST(params.quizID))
  );

  return (
    <AppLayout isLoading={isLoading}>
      <div className="text-center">
        <AppText1
          text={`Your Score : ${resultData?.scorecount?.Score} / ${resultData?.scorecount?.Outof}`}
          isBold
          color="primary"
          customstyles={{ fontSize: "28px" }}
        />
        <AppText1
          text="Congratulations! Here is a quick review of your questions and answers!"
          isBold
          customstyles={{ fontSize: "28px" }}
        />
      </div>
      <div className="app_result_pdf_btn_row">
        <AppText1
          text="The list of answers and recommendations based on the questions you answered"
          otherClassNames="mb-0 font-family-regular"
        />
        <AppButton text="Download PDF" />
      </div>
      <AppQuestionPreview
        otherClassNames="no_app_row_padded_columns_fix_1"
        data={(resultData?.data || [])?.map((data) => ({
          key: data.Question_id,
          question: data.Question,
          answer: data.Answer,
          answerStatus: data.AnswerStatus,
          // description: data.description,
          // CAnswer: data.correctAnswer,
          // CDescription: data.correctDescription,
        }))}
        accordionId="accordionFaq"
      />
    </AppLayout>
  );
};

export default Result;
