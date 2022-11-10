// No postprocessing needed for this survey

export default function scoreFunc(responses) {
  const minScore = 1 * 10;
  const maxScore = 9 * 10;

  const rawScore =
    parseInt(responses["tryToUnderstand2"]) +
    parseInt(responses["askedQuestions2"]) +
    parseInt(responses["encouragedClarification2"]) +
    parseInt(responses["expressedInterest2"]) +
    parseInt(responses["listenedAttentively2"]) +
    parseInt(responses["paidAttention2"]) +
    parseInt(responses["gaveSpace2"]) +
    parseInt(responses["undividedAttention2"]) +
    parseInt(responses["positiveAtmosphere2"]) +
    parseInt(responses["allowedExpression2"]);

  const result = {
    rawScore: rawScore,
    normScore: (rawScore - minScore) / (maxScore - minScore),
  };
  return result;
}
