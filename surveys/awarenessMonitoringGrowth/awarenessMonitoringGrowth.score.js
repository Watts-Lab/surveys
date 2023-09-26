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

  // Self-awareness
  const rawSelfAwarenessValues = [
    responses["innermostThoughts"],
    responses["othersThinkOfMe"],
    responses["goingOnAroundMe"],
  ].map(parseFloat);

  const rawSelfMonitoringValues = [
    responses["canAdjust"],
    reverseCode(responses["troubleChanging"], minVal, maxVal),
    responses["emotionalIntuition"],
    responses["tellInappropriate"],
  ].map(parseFloat);

  const rawGrowthMindsetValues = [
    responses["fixedIntelligence"],
    responses["onlyLearnNewThings"],
  ].map(parseFloat);

  const result = {
    rawSelfAwareness: mean(rawSelfAwarenessValues).toFixed(3),
    normSelfAwareness: mean(
      normalize(rawSelfAwarenessValues, minVal, maxVal)
    ).toFixed(3),

    rawSelfMonitoring: mean(rawSelfMonitoringValues).toFixed(3),
    normSelfMonitoring: mean(
      normalize(rawSelfMonitoringValues, minVal, maxVal)
    ).toFixed(3),

    rawGrowthMindset: mean(rawGrowthMindsetValues).toFixed(3),
    normGrowthMindset: mean(
      normalize(rawGrowthMindsetValues, minVal, maxVal)
    ).toFixed(3),
  };
  return result;
}
