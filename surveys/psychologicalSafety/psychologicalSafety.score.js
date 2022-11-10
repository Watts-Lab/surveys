// this is normalized 0 - 1 and corrects reverse coding in a few of the questions

export default function scoreFunc(responses) {
  const minScore = 1 * 7;
  const maxScore = 7 * 7;

  const rawScore =
    8 -
    parseInt(responses["holdMistake"]) +
    parseInt(responses["othersProblems"]) +
    8 -
    parseInt(responses["rejectedDifferent"]) +
    parseInt(responses["safeToTakeRisks"]) +
    8 -
    parseInt(responses["difficultToAskHelp"]) +
    parseInt(responses["notUndermine"]) +
    parseInt(responses["skillsValued"]);

  const result = {
    rawScore: rawScore,
    normScore: (rawScore - minScore) / (maxScore - minScore),
  };
  return result;
}
