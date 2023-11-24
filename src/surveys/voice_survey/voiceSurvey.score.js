// this is normalized 0 - 1
export default function scoreFunc(responses) {
  const minScore = 1 * 4;
  const maxScore = 7 * 4;

  const rawScore =
    parseInt(responses["voice"]["express views"]) +
    parseInt(responses["voice"]["new ideas"]) +
    parseInt(responses["voice"]["speaking up"]) +
    parseInt(responses["voice"]["diff opinion"]);

  const result = {
    rawScore: rawScore,
    normScore: (rawScore - minScore) / (maxScore - minScore),
  };
  return result;
}
