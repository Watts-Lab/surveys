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
  const minVal = 0;
  const maxVal = 4;

  const rawOverallAffectValues = [
    responses["patriotic"],
    responses["intelligent"],
    responses["honest"],
    responses["openMinded"],
    responses["generous"],
    reverseCode(responses["hypocritical"], minVal, maxVal),
    reverseCode(responses["selfish"], minVal, maxVal),
    reverseCode(responses["mean"], minVal, maxVal),
  ].map(parseFloat);

  const normedOverallAffectValues = normalize(
    rawOverallAffectValues,
    minVal,
    maxVal
  );

  const result = {
    normOverallAffect: mean(normedOverallAffectValues).toFixed(3),
    normPatriotic: mean(
      normalize([responses["patriotic"]], minVal, maxVal)
    ).toFixed(3),
    normIntelligent: mean(
      normalize([responses["intelligent"]], minVal, maxVal)
    ).toFixed(3),
    normHonesty: mean(normalize([responses["honest"]], minVal, maxVal)).toFixed(
      3
    ),
    normOpenMinded: mean(
      normalize([responses["openMinded"]], minVal, maxVal)
    ).toFixed(3),
    normGenerous: mean(
      normalize([responses["generous"]], minVal, maxVal)
    ).toFixed(3),
    normHypocritical: mean(
      normalize([responses["hypocritical"]], minVal, maxVal)
    ).toFixed(3),
    normSelfish: mean(
      normalize([responses["selfish"]], minVal, maxVal)
    ).toFixed(3),
    normMean: mean(normalize([responses["mean"]], minVal, maxVal)).toFixed(3),
  };
  return result;
}
