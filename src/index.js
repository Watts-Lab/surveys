import SurveyFactory from "./surveyFactory.jsx";

const ExampleSurvey = await SurveyFactory("exampleSurvey");
const TeamViability = await SurveyFactory("teamViability");
const ListeningQualityPartner = await SurveyFactory("listeningQualityPartner");
const DiscussionQualityControl = await SurveyFactory(
  "discussionQualityControl"
);

export {
  ExampleSurvey,
  TeamViability,
  ListeningQualityPartner,
  DiscussionQualityControl,
};
