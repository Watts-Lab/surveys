export default function scoreFunc(responses) {
  const minScore = 0;
  const maxScore = 100;

  const normRepublicanTemp = (parseInt(responses["republicanTemp"])
    - minScore) / (maxScore - minScore);
  const normDemocratTemp = (parseInt(responses["democratTemp"])
    - minScore) / (maxScore - minScore);

  const order = Object.keys(responses);
  console.log(order);

  const result = {
    normRepublicanTemp: normRepublicanTemp,
    normDemocratTemp: normDemocratTemp,
    rawScore: normRepublicanTemp - normDemocratTemp,
    normScore: Math.abs(normRepublicanTemp - normDemocratTemp),
    order: order
  };
  return result;
}
