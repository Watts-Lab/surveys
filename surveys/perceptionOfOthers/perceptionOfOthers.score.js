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

  const rawLikingValues = [responses["liking"]].map(parseFloat);

  const rawReceptivenessValues = [
    reverseCode(responses["dismissiveOther"], minVal, maxVal),
    responses["curious"],
    responses["respectfulDisagreement"],
  ].map(parseFloat);

  const rawAuthenticityValues = [responses["authenticity"]].map(parseFloat);

  const rawAmbiguityValues = [responses["ambiguity"]].map(parseFloat);

  const rawDirectnessValues = [responses["directness"]].map(parseFloat);

  const rawUnderminingValues = [responses["undermining"]].map(parseFloat);

  const result = {
    rawLiking: mean(rawLikingValues).toFixed(3),
    normLiking: mean(normalize(rawLikingValues, minVal, maxVal)).toFixed(3),

    rawReceptiveness: mean(rawReceptivenessValues).toFixed(3),
    normReceptiveness: mean(
      normalize(rawReceptivenessValues, minVal, maxVal)
    ).toFixed(3),

    rawAuthenticity: mean(rawAuthenticityValues).toFixed(3),
    normAuthenticity: mean(
      normalize(rawAuthenticityValues, minVal, maxVal)
    ).toFixed(3),

    rawAmbiguity: mean(rawAmbiguityValues).toFixed(3),
    normAmbiguity: mean(normalize(rawAmbiguityValues, minVal, maxVal)).toFixed(
      3
    ),

    rawDirectness: mean(rawDirectnessValues).toFixed(3),
    normDirectness: mean(
      normalize(rawDirectnessValues, minVal, maxVal)
    ).toFixed(3),

    rawUndermining: mean(rawUnderminingValues).toFixed(3),
    normUndermining: mean(
      normalize(rawUnderminingValues, minVal, maxVal)
    ).toFixed(3),
  };
  return result;
}
