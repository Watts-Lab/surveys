import 'survey-react/modern.min.css';
import { Survey, StylesManager, Model } from 'survey-react';
import React, { useCallback, useEffect } from "react";

StylesManager.applyTheme("modern");

export async function SurveyWrapper({surveyName, onComplete})  {
    // surveyName examples: "exampleSurvey", "teamViability"
    // onComplete callback should expect the "record"

    surveyPath = `/surveys/${surveyName}/${surveyName}.json`;
    scoreFuncPath = `/surveys/${surveyName}/${surveyName}.score.js`;

    try {
        const surveyJson = await import(surveyPath);
        const scoreFunc = await import(scoreFuncPath); 
    } catch (error) {
        throw `Could not load survey with name: ${surveyName}`
    }
    
    const scoreResponses = useCallback( (sender) => {
        const { data: responses } = sender;
        const result = scoreFunc(responses)
        const record = { responses, result }
        onComplete(record)
    })

    const surveyModel = new Model(surveyJson);
    surveyModel.onComplete.add(scoreResponses);

    return <Survey style={surveyStyle} model={surveyModel} />
    
}

