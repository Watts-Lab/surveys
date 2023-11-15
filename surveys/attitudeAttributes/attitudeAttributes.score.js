// No postprocessing needed for this survey

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
  const result = {
    importance: normalize([responses["importance"]], 0, 4)[0].toFixed(3),
    knowledge: normalize([responses["knowledge"]], 0, 4)[0].toFixed(3),
    certainty: normalize([responses["certainty"]], 0, 4)[0].toFixed(3),
    ambivalence: normalize([responses["ambivalence"]], 0, 4)[0].toFixed(3),
    personalRelevance: normalize(
      [responses["personalRelevance"]],
      0,
      4
    )[0].toFixed(3),
    moralConviction: normalize([responses["moralConviction"]], 0, 4)[0].toFixed(
      3
    ),
    elaboration: normalize([responses["elaboration"]], 0, 4)[0].toFixed(3),
  };
  return result;
}
