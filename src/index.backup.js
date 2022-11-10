import SurveyFactory from "./surveyFactory.backup.jsx"

const ExampleSurvey = await SurveyFactory('exampleSurvey');
const TeamViability = await SurveyFactory('teamViability');
const DiscussionQualityControl = await SurveyFactory('discussionQualityControl');
const Demographics = await SurveyFactory('demographics');
const LonelinessSingleItem = await SurveyFactory('lonelinessSingleItem');

export { 
    ExampleSurvey,
    TeamViability, 
    DiscussionQualityControl,
    Demographics,
    LonelinessSingleItem
}