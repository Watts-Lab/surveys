import SurveyFactory from "./surveyFactory.jsx"

const TeamViability = await SurveyFactory('teamViability');
const DiscussionQualityControl = await SurveyFactory('discussionQualityControl');

export { TeamViability, DiscussionQualityControl }