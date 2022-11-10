// No postprocessing needed for this survey

export default function scoreFunc(responses) {
  const minScore = 1 * 3;
  const maxScore = 9 * 3;

  const rawScore =
    parseInt(responses["closeness"]) +
    10 -
    parseInt(responses["distance"]) +
    parseInt(responses["caredAbout"]);

  const result = {
    rawScore: rawScore,
    normScore: (rawScore - minScore) / (maxScore - minScore),
  };
  return result;
}
