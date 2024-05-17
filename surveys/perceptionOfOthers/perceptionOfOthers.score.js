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
  const maxVal = 5;

  const rawLikingValues = [responses["liking"]].map(parseFloat);
  const rawSelfPerspectiveTakingValues = [
    responses["selfPerspectiveTaking"],
  ].map(parseFloat);
  const rawCommonValues = [responses["common"]].map(parseFloat);
  const rawPoliteValues = [responses["polite"]].map(parseFloat);
  const rawPartnerListeningValues = [responses["partnerListening"]].map(
    parseFloat
  );
  const rawPartnerPerspectiveTakingValues = [
    responses["partnerPerspectiveTaking"],
  ].map(parseFloat);
  const rawPartnerTalkingValues = [responses["partnerTalking"]].map(parseFloat);
  const rawPartnerReceptivenessValues = [
    reverseCode(responses["defensive"], minVal, maxVal),
  ].map(parseFloat);

  const result = {
    rawLiking: mean(rawLikingValues).toFixed(3),
    normLiking: mean(normalize(rawLikingValues, minVal, maxVal)).toFixed(3),

    rawSelfPerspectiveTaking: mean(rawSelfPerspectiveTakingValues).toFixed(3),
    normSelfPerspectiveTaking: mean(
      normalize(rawSelfPerspectiveTakingValues, minVal, maxVal)
    ).toFixed(3),

    rawCommon: mean(rawCommonValues).toFixed(3),
    normCommon: mean(normalize(rawCommonValues, minVal, maxVal)).toFixed(3),

    rawPolite: mean(rawPoliteValues).toFixed(3),
    normPolite: mean(normalize(rawPoliteValues, minVal, maxVal)).toFixed(3),

    rawPartnerListening: mean(rawPartnerListeningValues).toFixed(3),
    normPartnerListening: mean(
      normalize(rawPartnerListeningValues, minVal, maxVal)
    ).toFixed(3),

    rawPartnerPerspectiveTaking: mean(
      rawPartnerPerspectiveTakingValues
    ).toFixed(3),
    normPartnerPerspectiveTaking: mean(
      normalize(rawPartnerPerspectiveTakingValues, minVal, maxVal)
    ).toFixed(3),

    rawPartnerTalking: mean(rawPartnerTalkingValues).toFixed(3),
    normPartnerTalking: mean(
      normalize(rawPartnerTalkingValues, minVal, maxVal)
    ).toFixed(3),

    rawPartnerReceptiveness: mean(rawPartnerReceptivenessValues).toFixed(3),
    normPartnerReceptiveness: mean(
      normalize(rawPartnerReceptivenessValues, minVal, maxVal)
    ).toFixed(3),
  };
  return result;
}
