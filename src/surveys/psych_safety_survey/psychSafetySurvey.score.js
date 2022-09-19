// this is normalized 0 - 1 and corrects reverse coding in a few of the questions

export default function scoreFunc(responses) {
  const minScore = 1 * 7;
  const maxScore = 7 * 7;

  const rawScore =
    8 -
    parseInt(responses["psych-safety"]["mistake"]) +
    parseInt(responses["psych-safety"]["discuss problems"]) +
    8 -
    parseInt(responses["psych-safety"]["reject different"]) +
    parseInt(responses["psych-safety"]["take risks"]) +
    8 -
    parseInt(responses["psych-safety"]["asking help"]) +
    parseInt(responses["psych-safety"]["undermining"]) +
    parseInt(responses["psych-safety"]["skills valued"]);

  const result = {
    rawScore: rawScore,
    normScore: (rawScore - minScore) / (maxScore - minScore),
  };
  return result;
}
