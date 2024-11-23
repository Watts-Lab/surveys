import { parse } from "survey-react";

function sum(array) {
  return array.reduce((acc, val) => acc + val, 0);
}

function mean(array) {
  return sum(array) / array.length;
}

export default function scoreFunc(responses) {
  console.log([
    parseFloat(responses["discussionEnjoy"]),
    parseFloat(responses["discussionDepth"]),
    // 1-responses["discussionDisagreement"].map(parseFloat), // There is no particular valence to this, positive or negative, so omit
    1 - parseFloat(responses["discussionTension"]),
    parseFloat(responses["selfLearned"]),
    parseFloat(responses["selfSpeakUp"]),
    parseFloat(responses["selfVoice"]),
    1 - parseFloat(responses["selfAnxious"]),
    parseFloat(responses["selfInsight"]),
  ]);
  const result = {
    selfLearned: responses["selfLearned"],
    selfSpeakUp: responses["selfSpeakUp"],
    selfVoice: responses["selfVoice"],
    selfAnxious: responses["selfAnxious"],
    selfJudged: responses["selfJudged"],
    selfInsight: responses["selfInsight"],

    discussionEnjoy: responses["discussionEnjoy"],
    discussionDepth: responses["discussionDepth"],
    discussionDisagreement: responses["discussionDisagreement"],
    discussionTension: responses["discussionTension"],

    discussionOverall: mean([
      parseFloat(responses["discussionEnjoy"]),
      parseFloat(responses["discussionDepth"]),
      // 1-responses["discussionDisagreement"].map(parseFloat), // There is no particular valence to this, positive or negative, so omit
      1 - parseFloat(responses["discussionTension"]),
      parseFloat(responses["selfLearned"]),
      parseFloat(responses["selfSpeakUp"]),
      parseFloat(responses["selfVoice"]),
      1 - parseFloat(responses["selfAnxious"]),
      1 - parseFloat(responses["selfJudged"]),
      parseFloat(responses["selfInsight"]),
    ]).toFixed(3),
  };
  return result;
}
