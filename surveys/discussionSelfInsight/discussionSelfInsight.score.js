// No postprocessing needed for this survey

function normalize(array, minVal, maxVal) {
  return array.map((val) => (val - minVal) / (maxVal - 1));
}

function mean(array) {
  return array.reduce((acc, val) => acc + val, 0) / array.length;
}

function std(array) {
  const m = mean(array);
  return Math.sqrt(
    array.reduce((acc, val) => acc + Math.pow(val - m, 2), 0) / array.length
  );
}

export default function scoreFunc(responses) {
  const minVal = 1;
  const maxVal = 7;

  const rawValues = [
    responses["understandSelf"],
    responses["thinkDeeply"],
    responses["newInsights"],
    responses["reflectOnAttitudes"],
    responses["thinkDifferently"],
  ];

  const normedValues = normalize(rawValues, minVal, maxVal);

  const result = {
    rawMean: mean(rawValues),
    rawStd: std(rawValues),
    normMean: mean(normedValues),
    normStd: std(normedValues),
  };
  return result;
}
