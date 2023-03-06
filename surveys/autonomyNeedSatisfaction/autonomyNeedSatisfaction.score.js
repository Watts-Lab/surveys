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
    responses["chooseDirection"],
    reverseCode(responses["chooseContent"], minVal, maxVal),
    responses["sharingChoice"],
    responses["importantDiscussion"],
    responses["sensitiveTopics"],
    responses["feelingFree"],
    responses["voiceOpinion"],
    reverseCode(responses["controlledPressured"], minVal, maxVal),
  ].map(parseFloat);

  const completedValues = rawValues.filter((v) => !Number.isNaN(v)); // don't include empty values in response
  const normedValues = normalize(completedValues, minVal, maxVal);

  const result = {
    rawScore: mean(completedValues),
    normScore: mean(normedValues),
    completion: completedValues.length / rawValues.length,
  };
  return result;
}
