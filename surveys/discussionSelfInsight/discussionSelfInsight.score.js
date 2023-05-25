// No postprocessing needed for this survey

function normalize(array, minVal, maxVal) {
  return array.map((val) => (val - minVal) / (maxVal - minVal));
}

function mean(array) {
  return array.reduce((acc, val) => acc + val, 0) / array.length;
}

// function std(array) {
//   const m = mean(array);
//   return Math.sqrt(
//     array.reduce((acc, val) => acc + Math.pow(val - m, 2), 0) / array.length
//   );
// }

export default function scoreFunc(responses) {
  const minVal = 1;
  const maxVal = 7;

  const rawValues = [
    responses["understandSelf"],
    responses["thinkDeeply"],
    responses["newInsights"],
    responses["reflectOnAttitudes"],
    responses["thinkDifferently"],
  ].map(parseFloat);

  const completedValues = rawValues.filter((v) => !Number.isNaN(v)); // don't include empty values in response
  const normedValues = normalize(completedValues, minVal, maxVal);

  const result = {
    rawScore: mean(completedValues).toFixed(3),
    normScore: mean(normedValues).toFixed(3),
    completion: completedValues.length / rawValues.length,
  };
  return result;
}
