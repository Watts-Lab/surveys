// this is normalized 0 - 1 and corrects reverse coding in a few of the questions

function normalize(array, minVal, maxVal) {
  return array.map((val) => (val - minVal) / (maxVal - minVal));
}

function sum(array) {
  return array.reduce((acc, val) => acc + val, 0);
}

function mean(array) {
  return sum(array) / array.length;
}

function reverseCode(value, minVal, maxVal) {
  const floatVal = parseFloat(value);
  if (Number.isNaN(floatVal)) return undefined;
  return maxVal - (value - minVal);
}

export default function scoreFunc(responses) {
  const minVal = 1;
  const maxVal = 7;

  const rawValues = [
    reverseCode(responses["holdMistake"], minVal, maxVal),
    responses["othersProblems"],
    reverseCode(responses["rejectedDifferent"], minVal, maxVal),
    responses["safeToTakeRisks"],
    reverseCode(responses["difficultToAskHelp"], minVal, maxVal),
    responses["notUndermine"],
    responses["skillsValued"],
  ].map(parseFloat);
  const completedValues = rawValues.filter((v) => !Number.isNaN(v)); // don't include empty values in response

  const normedValues = normalize(completedValues, minVal, maxVal);

  const order = Object.keys(responses);

  const result = {
    rawScore: mean(completedValues).toFixed(3),
    normScore: mean(normedValues).toFixed(3),
    completion: completedValues.length / rawValues.length,
    order: order,
  };
  return result;
}
