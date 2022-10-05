import 'survey-react/modern.min.css';
import { Survey as SurveyJS, StylesManager, Model } from 'survey-react';
import React from 'react'

StylesManager.applyTheme("modern");

export default async function SurveyFactory(surveyName) {
    const surveyJson = await import(`../surveys/${surveyName}/${surveyName}.json`);
    const scoreFunc = await import(`../surveys/${surveyName}/${surveyName}.score.js`); 

    function Survey ({ onComplete }) {
        const scoreResponses = (sender) => {
            const { data: responses } = sender;
            const result = scoreFunc(responses)
            const record = { responses, result }
            onComplete(record)
        }
    
        const surveyModel = new Model(surveyJson);
        surveyModel.onComplete.add(scoreResponses);
    
        return <SurveyJS model={surveyModel}/>
    }

    return Survey
}