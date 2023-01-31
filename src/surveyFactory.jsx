import "survey-react/modern.min.css";
import * as SurveyJS from "survey-react";
import React, { useEffect } from "react";
import packageJson from "../package.json";
import { labeledRange } from "./customQuestionTypes/labeledRange";

labeledRange(SurveyJS);
SurveyJS.StylesManager.applyTheme("modern");

import "./customQuestionTypes/labeledRange.css";

export default function SurveyFactory(surveyName, surveyJson, scoreFunc, sha) {
  // console.log("sha", sha);

  function Survey({ onComplete, storageName }) {
    const surveyModel = new SurveyJS.Model(surveyJson);

    useEffect(() => {
      surveyModel.startTimer();
    }, []);

    function saveState(survey) {
      var res = { currentPageNo: survey.currentPageNo, data: survey.data };
      //console.log("Saving state to localStorage", res);
      window.localStorage.setItem(storageName, JSON.stringify(res));
    }

    function loadState(survey) {
      var storageSt = window.localStorage.getItem(storageName) || "";
      var res = {};
      if (storageSt) res = JSON.parse(storageSt);
      if (res.currentPageNo) survey.currentPageNo = res.currentPageNo;
      if (res.data) {
        survey.data = res.data;
        //console.log("Loading state from localStorage", res);
      }
    }

    function clearStorage() {
      window.localStorage.removeItem(storageName);
    }

    const scoreResponses = (sender) => {
      const { data: responses } = sender;
      sender.stopTimer();
      const result = scoreFunc(responses);
      const record = {
        surveySource: packageJson["name"],
        version: packageJson["version"],
        surveySha: sha.survey,
        scoreSha: sha.score,
        surveyName,
        responses,
        result,
        secondsElapsed: sender.timeSpent,
      };
      console.log(record);
      onComplete(record);
      clearStorage();
    };

    surveyModel.onComplete.add(scoreResponses);
    surveyModel.onValueChanged.add(function (survey, options) {
      saveState(survey);
    });
    surveyModel.onCurrentPageChanged.add(function (survey, options) {
      saveState(survey);
    });
    loadState(surveyModel);

    return <SurveyJS.Survey model={surveyModel} />;
  }

  return Survey;
}
