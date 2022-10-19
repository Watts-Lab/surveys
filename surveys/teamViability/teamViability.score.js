// this is normalized 0 - 1 and corrects reverse coding in the falling apart question

export default function scoreFunc(responses) {
  const minScore = 1 * 6;
  const maxScore = 5 * 6;

  const rawScore =
    parseInt(responses["teamViability"]["capable unit"]) +
    parseInt(responses["teamViability"]["future success"]) +
    6 -
    parseInt(responses["teamViability"]["falling apart"]) +
    parseInt(responses["teamViability"]["welcome reunion"]) +
    parseInt(responses["teamViability"]["persist despite obstacles"]) +
    parseInt(responses["teamViability"]["succeed dispite dislike"]);

  const result = {
    rawScore: rawScore,
    normScore: (rawScore - minScore) / (maxScore - minScore),
  };
  return result;
}
