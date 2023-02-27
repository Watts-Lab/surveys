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
  const minVal = 1;
  const maxVal = 9;

  const rawValues = [
    responses["closeness"],
    reverseCode(responses["distance"], minVal, maxVal),
    responses["caredAbout"],
  ]
    .map(parseFloat)
    .filter((v) => !Number.isNaN(v)); // don't include empty values in response

  const normedValues = normalize(rawValues, minVal, maxVal);

  const result = {
    rawScore: mean(rawValues),
    normScore: mean(normedValues),
  };
  return result;
}
