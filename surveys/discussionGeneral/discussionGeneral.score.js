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

  const rawDiscussionEnjoyValues = [responses["discussionEnjoy"]].map(
    parseFloat
  );
  const rawSelfLearnedValues = [responses["selfLearned"]].map(parseFloat);
  const rawDiscussionDepthValues = [responses["discussionDepth"]].map(
    parseFloat
  );
  const rawDiscussionDisagreementValues = [
    responses["discussionDisagreement"],
  ].map(parseFloat);
  const rawDiscussionTensionValues = [responses["discussionTension"]].map(
    parseFloat
  );
  const rawSelfSpeakUpValues = [responses["selfSpeakUp"]].map(parseFloat);
  const rawSelfVoiceValues = [responses["selfVoice"]].map(parseFloat);
  const rawSelfAnxiousValues = [responses["selfAnxious"]].map(parseFloat);
  const rawSelfInsightValues = [responses["selfInsight"]].map(parseFloat);

  const result = {
    rawDiscussionEnjoy: mean(rawDiscussionDepthValues).toFixed(3),
    normDiscussionEnjoy: mean(
      normalize(rawDiscussionEnjoyValues, minVal, maxVal)
    ).toFixed(3),

    rawSelfLearned: mean(rawSelfLearnedValues).toFixed(3),
    normSelfLearned: mean(
      normalize(rawSelfLearnedValues, minVal, maxVal)
    ).toFixed(3),

    rawDiscussionDepth: mean(rawDiscussionDepthValues).toFixed(3),
    normDiscussionDepth: mean(
      normalize(rawDiscussionDepthValues, minVal, maxVal)
    ).toFixed(3),

    rawDiscussionDisagreement: mean(rawDiscussionDisagreementValues).toFixed(3),
    normDiscussionDisagreement: mean(
      normalize(rawDiscussionDisagreementValues, minVal, maxVal)
    ).toFixed(3),

    rawDiscussionTension: mean(rawDiscussionTensionValues).toFixed(3),
    normDiscussionTension: mean(
      normalize(rawDiscussionTensionValues, minVal, maxVal)
    ).toFixed(3),

    rawSelfSpeakUp: mean(rawSelfSpeakUpValues).toFixed(3),
    normSelfSpeakUp: mean(
      normalize(rawSelfSpeakUpValues, minVal, maxVal)
    ).toFixed(3),

    rawSelfVoice: mean(rawSelfVoiceValues).toFixed(3),
    normSelfVoice: mean(normalize(rawSelfVoiceValues, minVal, maxVal)).toFixed(
      3
    ),

    rawSelfAnxious: mean(rawSelfAnxiousValues).toFixed(3),
    normSelfAnxious: mean(
      normalize(rawSelfAnxiousValues, minVal, maxVal)
    ).toFixed(3),

    rawSelfInsight: mean(rawSelfInsightValues).toFixed(3),
    normSelfInsight: mean(
      normalize(rawSelfInsightValues, minVal, maxVal)
    ).toFixed(3),
  };
  return result;
}
