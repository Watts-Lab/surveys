function normalize(array, minVal, maxVal) {
  return array.map((val) => (val - minVal) / (maxVal - minVal));
}

function reverseCode(value, minVal, maxVal) {
  const floatVal = parseFloat(value);
  if (Number.isNaN(floatVal)) return undefined;
  return maxVal - (value - minVal);
}

function sum(array) {
  return array.reduce((acc, val) => acc + val, 0);
}

function mean(array) {
  return sum(array) / array.length;
}

export default function scoreFunc(responses) {
  const minVal = 1;
  const maxVal = 7;

  const rawExtroversionValues = [
    responses["extroversion"],
    reverseCode(responses["quietness"], minVal, maxVal),
  ].map(parseFloat);

  const rawAgreeablenessValues = [
    reverseCode(responses["criticalness"], minVal, maxVal),
    responses["sympathy"],
  ].map(parseFloat);

  const rawConscientiousnessValues = [
    responses["dependability"],
    reverseCode(responses["carelessness"], minVal, maxVal),
  ].map(parseFloat);

  const rawEmotionalStabilityValues = [
    reverseCode(responses["anxiety"], minVal, maxVal),
    responses["calmness"],
  ].map(parseFloat);

  const rawOpennessToExperienceValues = [
    responses["openness"],
    reverseCode(responses["conventionality"], minVal, maxVal),
  ].map(parseFloat);

  const result = {
    rawExtroversion: mean(rawExtroversionValues).toFixed(3),
    rawAgreeableness: mean(rawAgreeablenessValues).toFixed(3),
    rawConscientiousness: mean(rawConscientiousnessValues).toFixed(3),
    rawEmotionalStability: mean(rawEmotionalStabilityValues).toFixed(3),
    rawOpennessToExperience: mean(rawOpennessToExperienceValues).toFixed(3),

    normExtroversion: mean(
      normalize(rawExtroversionValues, minVal, maxVal)
    ).toFixed(3),

    normAgreeableness: mean(
      normalize(rawAgreeablenessValues, minVal, maxVal)
    ).toFixed(3),

    normConscientiousness: mean(
      normalize(rawConscientiousnessValues, minVal, maxVal)
    ).toFixed(3),

    normEmotionalStability: mean(
      normalize(rawEmotionalStabilityValues, minVal, maxVal)
    ).toFixed(3),

    normOpennessToExperience: mean(
      normalize(rawOpennessToExperienceValues, minVal, maxVal)
    ).toFixed(3),
  };

  return result;
}
