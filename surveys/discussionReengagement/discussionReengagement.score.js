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
    study: responses["study"],
    partners: responses["partners"],
    topic: responses["topic"],
    overallReengagement: mean([
      responses["study"],
      responses["partners"],
      responses["topic"],
    ]).toFixed(3),
  };
  return result;
}
