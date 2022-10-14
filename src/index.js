import SurveyFactory from "./surveyFactory.jsx";

const ExampleSurvey = await SurveyFactory("exampleSurvey");
const TeamViability = await SurveyFactory("teamViability");
const ListeningQualityPartner = await SurveyFactory("listeningQualityPartner");
const DiscussionQualityControl = await SurveyFactory(
  "discussionQualityControl"
);
const Demographics = await SurveyFactory("demographics");
const LonelinessSingleItem = await SurveyFactory("lonelinessSingleItem");

export {
  ExampleSurvey,
  TeamViability,
  ListeningQualityPartner,
  DiscussionQualityControl,
  Demographics,
  LonelinessSingleItem,
};
