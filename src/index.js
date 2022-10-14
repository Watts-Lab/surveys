import SurveyFactory from "./surveyFactory.jsx"

const ExampleSurvey = await SurveyFactory('exampleSurvey');
const TeamViability = await SurveyFactory('teamViability');
const DiscussionQualityControl = await SurveyFactory('discussionQualityControl');
const Demographics = await SurveyFactory('demographics');

export { 
    ExampleSurvey,
    TeamViability, 
    DiscussionQualityControl,
    Demographics
}