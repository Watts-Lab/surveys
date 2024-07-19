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
    everydayPeople: normalize([responses["everydayPeople"]], 0, 4)[0].toFixed(
      3
    ),
    electedOfficials: normalize(
      [responses["electedOfficials"]],
      0,
      4
    )[0].toFixed(3),
    bipartisanOpportunity: normalize(
      [responses["bipartisanOpportunity"]],
      0,
      4
    )[0].toFixed(3),
    overallBipartisanship: mean([
      normalize([responses["everydayPeople"]], 0, 4)[0],
      normalize([responses["electedOfficials"]], 0, 4)[0],
      normalize([responses["bipartisanOpportunity"]], 0, 4)[0],
    ]).toFixed(3),
  };
  return result;
}
