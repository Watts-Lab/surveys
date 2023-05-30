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
    responses["tryToUnderstand"],
    responses["askedQuestions"],
    responses["encouragedClarification"],
    responses["expressedInterest"],
    responses["listenedAttentively"],
    responses["paidAttention"],
    responses["gaveSpace"],
    responses["undividedAttention"],
    responses["positiveAtmosphere"],
    responses["allowedExpression"],
  ].map(parseFloat);

  const completedValues = rawValues.filter((v) => !Number.isNaN(v)); // don't include empty values in response
  const normedValues = normalize(completedValues, minVal, maxVal);
  const order = Object.keys(responses);

  const result = {
    rawScore: mean(completedValues),
    normScore: mean(normedValues),
    completion: completedValues.length / rawValues.length,
    order: order,
  };
  return result;
}
