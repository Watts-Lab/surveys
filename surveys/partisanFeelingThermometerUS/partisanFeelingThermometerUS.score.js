export default function scoreFunc(responses) {
  const minScore = 0;
  const maxScore = 100;

  const rawScore = Math.abs(
    parseInt(responses["republicanTemp"]) 
    - parseInt(responses["democratTemp"]));

  const order = Object.keys(responses);

  const result = {
    rawScore: rawScore,
    normScore: (rawScore - minScore) / (maxScore - minScore),
    order: order
  };
  return result;
}
