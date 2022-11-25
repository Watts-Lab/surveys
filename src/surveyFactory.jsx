import "survey-react/modern.min.css";
import { Survey as SurveyJS, StylesManager, Model } from "survey-react";
import React, { useEffect, useState } from "react";
import packageJson from "../package.json";

StylesManager.applyTheme("modern");

export default function SurveyFactory(surveyName, surveyJson, scoreFunc) {
  function Survey({ onComplete, storageName }) {
    let startTime;
    const surveyModel = new Model(surveyJson);

    useEffect(() => {
      startTime = Date.now();
    }, []);

    function saveState(survey) {
      var res = { currentPageNo: survey.currentPageNo, data: survey.data };
      console.log("Saving state to localStorage", res);
      window.localStorage.setItem(storageName, JSON.stringify(res));
    }

    function loadState(survey) {
      var storageSt = window.localStorage.getItem(storageName) || "";
      var res = {};
      if (storageSt) res = JSON.parse(storageSt);
      if (res.currentPageNo) survey.currentPageNo = res.currentPageNo;
      if (res.data) {
        survey.data = res.data;
        console.log("Loading state from localStorage", res);
      }
    }

    function clearStorage() {
      window.localStorage.removeItem(storageName);
    }

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

    return <SurveyJS model={surveyModel} />;
  }

  return Survey;
}
