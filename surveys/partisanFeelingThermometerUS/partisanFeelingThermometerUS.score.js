export default function scoreFunc(responses) {
  const result = {
    normDemocratTemp: (parseFloat(responses["democratTemp"]) / 100).toFixed(3),
    normRepublicanTemp: (parseFloat(responses["republicanTemp"]) / 100).toFixed(
      3
    ),
  };
  return result;
}
