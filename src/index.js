import SurveyFactory from "./surveyFactory.jsx"

const ExampleSurvey = await SurveyFactory('exampleSurvey');
const TeamViability = await SurveyFactory('teamViability');
const DiscussionQualityControl = await SurveyFactory('discussionQualityControl');

export { 
    ExampleSurvey,
    TeamViability, 
    DiscussionQualityControl 
}