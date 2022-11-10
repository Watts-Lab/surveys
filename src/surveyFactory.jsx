import "survey-react/modern.min.css";
import { Survey as SurveyJS, StylesManager, Model } from "survey-react";
import React, { useEffect } from "react";
import packageJson from "../package.json";

StylesManager.applyTheme("modern");

export default function SurveyFactory(surveyName, surveyJson, scoreFunc) {
  function Survey({ onComplete }) {
    let startTime;
    useEffect(() => {
      startTime = Date.now();
    }, []);

    const scoreResponses = (sender) => {
      let submitTime = Date.now();
      const { data: responses } = sender;
      const result = scoreFunc(responses);
      const record = {
        surveySource: packageJson["name"],
        surveyVersion: packageJson["version"],
        surveyName,
        responses,
        result,
        startTime,
        submitTime,
        secondsElapsed: Math.floor((submitTime - startTime) / 1000),
      };
      onComplete(record);
    };

    const surveyModel = new Model(surveyJson);
    surveyModel.onComplete.add(scoreResponses);

    return <SurveyJS model={surveyModel} />;
  }

  return Survey;
}
