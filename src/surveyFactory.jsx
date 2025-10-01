import "survey-react/modern.min.css";
import * as SurveyJS from "survey-react";
import React, { useEffect, useRef, useCallback } from "react";
import packageJson from "../package.json";
import { labeledRange } from "./customQuestionTypes/labeledRange";

labeledRange(SurveyJS);
SurveyJS.StylesManager.applyTheme("modern");

import "./customQuestionTypes/labeledRange.css";

// timeSpent doesn't track properly across rerenders, so track it manually

// Helper function to extract question order from survey
function getQuestionOrder(surveyModel) {
  const allQuestions = surveyModel.getAllQuestions();
  return allQuestions
    .filter(q => q.getType() !== 'html') // exclude html elements
    .map(q => q.name);
}

// Helper function to set questionsOrder to 'initial' in all panels/pages to preserve order
function preserveQuestionOrder(surveyJson) {
  const jsonCopy = JSON.parse(JSON.stringify(surveyJson));
  
  // Recursively set questionsOrder to 'initial' for all pages and panels
  function setInitialOrder(obj) {
    if (obj && typeof obj === 'object') {
      if (obj.questionsOrder === 'random') {
        obj.questionsOrder = 'initial';
      }
      // Recursively process nested objects and arrays
      Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key])) {
          obj[key].forEach(item => setInitialOrder(item));
        } else if (typeof obj[key] === 'object') {
          setInitialOrder(obj[key]);
        }
      });
    }
  }
  
  setInitialOrder(jsonCopy);
  return jsonCopy;
}

export default function SurveyFactory(surveyName, surveyJson, scoreFunc, sha) {
  function BuiltSurvey({ onComplete, storageName, language }) {
    const timerStartedAt = useRef(Date.now());

    // Check if we have stored state with question order
    var prevData = window.localStorage.getItem(storageName) || null;
    var data = prevData ? JSON.parse(prevData) : null;
    
    // Use stored surveyJson if available (which has order preserved), otherwise use original
    const jsonToUse = data?.surveyJson || surveyJson;
    const surveyModel = new SurveyJS.Model(jsonToUse);
    surveyModel.locale = language; // set the language for the survey

    const saveState = useCallback(
      (survey) => {
        // make sure we have most recent version of previous timeSpent
        var prevData = window.localStorage.getItem(storageName) || null;
        var data = prevData ? JSON.parse(prevData) : null;
        const prevTimeSpent = data?.timeSpent || 0;
        const newTimeSpent = Date.now() - timerStartedAt.current;
        timerStartedAt.current = Date.now(); // reset timer

        // Capture question order and preserve it in the survey JSON
        const questionOrder = getQuestionOrder(survey);
        const surveyJsonWithOrder = survey.toJSON();
        const preservedJson = preserveQuestionOrder(surveyJsonWithOrder);

        var res = {
          currentPageNo: survey.currentPageNo,
          data: survey.data,
          timeSpent: prevTimeSpent + newTimeSpent,
          questionOrder: questionOrder,
          surveyJson: preservedJson,
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

        // make sure we have most recent version of previous timeSpent
        var prevData = window.localStorage.getItem(storageName) || null;
        var data = prevData ? JSON.parse(prevData) : null;
        const prevTimeSpent = data?.timeSpent || 0;
        const newTimeSpent = Date.now() - timerStartedAt.current;

        // Get question order from stored state or capture it now
        const questionOrder = data?.questionOrder || getQuestionOrder(sender);

        const result = scoreFunc(responses);
        const record = {
          surveySource: packageJson["name"],
          version: packageJson["version"],
          surveySha: sha.survey,
          scoreSha: sha.score,
          surveyName,
          responses,
          result,
          questionOrder,
          secondsElapsed: (prevTimeSpent + newTimeSpent) / 1000,
        };

        console.log("submitting", record);
        onComplete(record);
      },
      [clearStorage, onComplete, scoreFunc, sha.score, sha.survey, surveyName]
    );

    useEffect(() => {
      surveyModel.onComplete.add(scoreResponses);
      surveyModel.onValueChanged.add(saveState);
      surveyModel.onCurrentPageChanged.add(saveState);

      return () => saveState(surveyModel);
    }, [saveState, scoreResponses, clearStorage]);

    // Restore previous data if available (already loaded jsonToUse at the top)
    if (data) {
      surveyModel.currentPageNo = data.currentPageNo;
      surveyModel.data = data.data;
    }

    return <SurveyJS.Survey model={surveyModel} />;
  }

  return BuiltSurvey;
}
