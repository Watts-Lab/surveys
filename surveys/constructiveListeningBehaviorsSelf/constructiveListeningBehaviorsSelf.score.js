// No postprocessing needed for this survey

export default function scoreFunc(responses) {
  const minScore = -3;
  const maxScore = 3;

  const rawScore =
    parseInt(responses["tryToUnderstand"]) +
    parseInt(responses["askedQuestions"]) +
    parseInt(responses["encouragedClarification"]) +
    parseInt(responses["expressedInterest"]) +
    parseInt(responses["listenedAttentively"]) +
    parseInt(responses["paidAttention"]) +
    parseInt(responses["gaveSpace"]) +
    parseInt(responses["undividedAttention"]) +
    parseInt(responses["positiveAtmosphere"]) +
    parseInt(responses["allowedExpression"]);

  const result = {
    rawScore: rawScore,
    normScore: (rawScore - minScore) / (maxScore - minScore),
  };
  return result;
}
