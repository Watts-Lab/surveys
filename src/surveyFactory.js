import 'survey-react/modern.min.css';
import { Survey as SurveyJS, StylesManager, Model } from 'survey-react';

StylesManager.applyTheme("modern");

export function SurveyFactory({surveyName}) {
    const surveyJson = import(`../surveys/${surveyName}/${surveyName}.json`);
    const scoreFunc = import(`../surveys/${surveyName}/${surveyName}.score.js`); 

    Survey = (onComplete) => {
        const scoreResponses = (sender) => {
            const { data: responses } = sender;
            const result = scoreFunc(responses)
            const record = { responses, result }
            onComplete(record)
        }
    
        const surveyModel = new Model(surveyJson);
        surveyModel.onComplete.add(scoreResponses);
    
        return SurveyJS(style={surveyStyle}, model={surveyModel})
    }

    return Survey
}
