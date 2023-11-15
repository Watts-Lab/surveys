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

  const rawConflictValues = [responses["heated"], responses["conflict"]].map(
    parseFloat
  );

  const rawViabilityValues = [
    responses["capableUnit"],
    responses["workTogetherAgain"],
  ].map(parseFloat);

  const result = {
    rawConflict: mean(rawConflictValues).toFixed(3),
    normConflict: mean(normalize(rawConflictValues, minVal, maxVal)).toFixed(3),

    rawViability: mean(rawViabilityValues).toFixed(3),
    normViability: mean(normalize(rawViabilityValues, minVal, maxVal)).toFixed(
      3
    ),
  };
  return result;
}
