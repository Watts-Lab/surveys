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

  const rawConflictOpennessValues = [
    responses["openConflict"],
    reverseCode(responses["avoidConflict"], minVal, maxVal),
    reverseCode(responses["resolveImmediately"], minVal, maxVal),
    reverseCode(responses["conflictIsDetrimental"], minVal, maxVal),
    responses["emotionAccepted"],
    responses["disagreementsEncouraged"],
    reverseCode(responses["differencesAvoided"], minVal, maxVal),
  ].map(parseFloat);

  const result = {
    rawConflictOpenness: mean(rawConflictOpennessValues).toFixed(3),
    normConflictOpenness: mean(
      normalize(rawConflictOpennessValues, minVal, maxVal)
    ).toFixed(3),
  };
  return result;
}
