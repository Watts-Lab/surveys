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

  const rawNegativeEmotionValues = [
    reverseCode(responses["frustrated"], minVal, maxVal),
  ].map(parseFloat);

  console.log("rawNegativeEmotionValues", rawNegativeEmotionValues);

  const rawTabooIssuesValues = [
    reverseCode(responses["ideasDangerous"], minVal, maxVal),
  ].map(parseFloat);

  const rawDerogationOfOpponentsValues = [
    reverseCode(responses["emotionalArguments"], minVal, maxVal),
  ].map(parseFloat);

  const rawIntellectualCuriosityValues = [responses["reading"]].map(parseFloat);

  const rawReceptivenessValues = [
    ...rawNegativeEmotionValues,
    ...rawTabooIssuesValues,
    ...rawDerogationOfOpponentsValues,
    ...rawIntellectualCuriosityValues,
  ];

  console.log("rawReceptivenessValues", rawReceptivenessValues);

  const result = {
    rawReceptiveness: mean(rawReceptivenessValues).toFixed(3),
    normReceptiveness: mean(
      normalize(rawReceptivenessValues, minVal, maxVal)
    ).toFixed(3),

    rawNegativeEmotion: mean(rawNegativeEmotionValues).toFixed(3),
    normNegativeEmotion: mean(
      normalize(rawNegativeEmotionValues, minVal, maxVal)
    ).toFixed(3),

    rawTabooIssues: mean(rawTabooIssuesValues).toFixed(3),
    normTabooIssues: mean(
      normalize(rawTabooIssuesValues, minVal, maxVal)
    ).toFixed(3),

    rawDerogationOfOpponents: mean(rawDerogationOfOpponentsValues).toFixed(3),
    normDerogationOfOpponents: mean(
      normalize(rawDerogationOfOpponentsValues, minVal, maxVal)
    ).toFixed(3),

    rawIntellectualCuriosity: mean(rawIntellectualCuriosityValues).toFixed(3),
    normIntellectualCuriosity: mean(
      normalize(rawIntellectualCuriosityValues, minVal, maxVal)
    ).toFixed(3),
  };
  return result;
}
