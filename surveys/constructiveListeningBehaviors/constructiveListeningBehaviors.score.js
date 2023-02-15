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

export default function scoreFunc(responses) {
  const minVal = -3;
  const maxVal = 3;

  const rawValues = [
    parseInt(responses["tryToUnderstand"]) +
      parseInt(responses["askedQuestions"]) +
      parseInt(responses["encouragedClarification"]) +
      parseInt(responses["expressedInterest"]) +
      parseInt(responses["listenedAttentively"]) +
      parseInt(responses["paidAttention"]) +
      parseInt(responses["gaveSpace"]) +
      parseInt(responses["undividedAttention"]) +
      parseInt(responses["positiveAtmosphere"]) +
      parseInt(responses["allowedExpression"]),
  ];

  const normedValues = normalize(rawValues, minVal, maxVal);

  const result = {
    rawScore: mean(rawValues),
    normScore: mean(normedValues),
  };
  return result;
}
