import "survey-react/modern.min.css";
import * as SurveyJS from "survey-react";
import React, { useEffect, useRef, useState, useCallback } from "react";
import packageJson from "../package.json";
import { labeledRange } from "./customQuestionTypes/labeledRange";

labeledRange(SurveyJS);
SurveyJS.StylesManager.applyTheme("modern");

import "./customQuestionTypes/labeledRange.css";

// Timespent doesn't track properly across rerenders, so track it manually

export default function SurveyFactory(surveyName, surveyJson, scoreFunc, sha) {
  function BuiltSurvey({ onComplete, storageName }) {
    const [submitted, setSubmitted] = useState(false);
    const timerStartedAt = useRef(Date.now());

    const surveyModel = new SurveyJS.Model(surveyJson);

    const saveState = useCallback(
      (survey) => {
        // make sure we have most recent version of previous timeSpent
        var prevData = window.localStorage.getItem(storageName) || null;
        var data = prevData ? JSON.parse(prevData) : null;
        const prevTimeSpent = data?.timeSpent || 0;
        const newTimeSpent = Date.now() - timerStartedAt.current;
        timerStartedAt.current = Date.now(); // reset timer

        var res = {
          currentPageNo: survey.currentPageNo,
          data: survey.data,
          timeSpent: prevTimeSpent + newTimeSpent,
        };

        window.localStorage.setItem(storageName, JSON.stringify(res));
      },
      [storageName]
    );

    const clearStorage = useCallback(() => {
      window.localStorage.removeItem(storageName);
    }, [storageName]);

    const scoreResponses = useCallback(
      (sender) => {
        const { data: responses } = sender;

        var prevData = window.localStorage.getItem(storageName) || null;
        var data = prevData ? JSON.parse(prevData) : null;
        const prevTimeSpent = data?.timeSpent || 0;
        const newTimeSpent = Date.now() - timerStartedAt.current;

        const result = scoreFunc(responses);
        const record = {
          surveySource: packageJson["name"],
          version: packageJson["version"],
          surveySha: sha.survey,
          scoreSha: sha.score,
          surveyName,
          responses,
          result,
          secondsElapsed: (prevTimeSpent + newTimeSpent) / 1000,
        };
        clearStorage();
        setSubmitted(true);
        onComplete(record);
      },
      [clearStorage, onComplete, scoreFunc, sha.score, sha.survey, surveyName]
    );

    useEffect(() => {
      console.log("loading survey");

      surveyModel.onComplete.add(scoreResponses);
      surveyModel.onValueChanged.add(saveState);
      surveyModel.onCurrentPageChanged.add(saveState);

      return () => {
        if (submitted) {
          clearStorage();
        } else {
          saveState(surveyModel);
        }
      };
    }, [saveState, scoreResponses, clearStorage]);

    var prevData = window.localStorage.getItem(storageName) || null;
    if (prevData) {
      var data = JSON.parse(prevData);
      surveyModel.currentPageNo = data.currentPageNo;
      surveyModel.data = data.data;
    }

    return <SurveyJS.Survey model={surveyModel} />;
  }

  return BuiltSurvey;
}
