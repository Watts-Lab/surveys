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

  const rawPersuasionValues = [
    responses["persuasiveOutcome"],
    reverseCode(responses["notPersuaded"], minVal, maxVal),
  ].map(parseFloat);

  const rawLearningValues = [
    responses["thinkDifferently"],
    responses["learning"],
  ].map(parseFloat);

  const result = {
    rawPersuasion: mean(rawPersuasionValues).toFixed(3),
    normPersuasion: mean(
      normalize(rawPersuasionValues, minVal, maxVal)
    ).toFixed(3),

    rawLearning: mean(rawLearningValues).toFixed(3),
    normLearning: mean(normalize(rawLearningValues, minVal, maxVal)).toFixed(3),
  };
  return result;
}
