// No postprocessing needed for this survey

export default function scoreFunc(responses) {
  const minScore = 1 * 8;
  const maxScore = 9 * 8;

  const rawScore =
    parseInt(responses["chooseDirection"]) +
    10 -
    parseInt(responses["chooseContent"]) +
    parseInt(responses["sharingChoice"]) +
    parseInt(responses["importantDiscussion"]) +
    parseInt(responses["sensitiveTopics"]) +
    parseInt(responses["feelingFree"]) +
    parseInt(responses["voiceOpinion"]) +
    10 -
    parseInt(responses["controlledPressured"]);

  const result = {
    rawScore: rawScore,
    normScore: (rawScore - minScore) / (maxScore - minScore),
  };
  return result;
}
