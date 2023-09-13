function normalize(val, minVal, maxVal) {
    return (val - minVal) / (maxVal - minVal);
}

function reverseCode(value, minVal, maxVal) {
    const floatVal = parseFloat(value);
    if (Number.isNaN(floatVal)) return undefined;
    return maxVal - (value - minVal);
}

// returns the sum if both inputs are nonempty, returns undefined otherwise
function decidesCompletion(value1, value2) {
    const floatVal1 = parseFloat(value1);
    const floatVal2 = parseFloat(value2);
    if (Number.isNaN(floatVal1) || Number.isNaN(floatVal2)) return undefined;
    else return value1+value2;
}

export default function scoreFunc(responses) {
    const minVal = 1;
    const maxVal = 7;

    const rawValues = [
        responses["extroversion"],
        responses["criticalness"],
        responses["dependability"],
        responses["anxiety"],
        responses["openness"],
        responses["quietness"],
        responses["sympathy"],
        responses["carelessness"],
        responses["calmness"],
        responses["conventionality"],
    ].map(parseFloat);

    const rawBigFiveValues = {
        extroversion: decidesCompletion(responses["extroversion"], reverseCode(responses["quietness"], minVal, maxVal)),
        agreeablness: decidesCompletion(reverseCode(responses["criticalness"], minVal, maxVal), responses["sympathy"]),
        conscientiousness: decidesCompletion(responses["dependability"], reverseCode(responses["carelessness"], minVal, maxVal)),
        emotionalStability: decidesCompletion(reverseCode(responses["anxiety"], minVal, maxVal), responses["calmness"]),
        opennessToExperience: decidesCompletion(responses["openness"], reverseCode(responses["conventionality"], minVal, maxVal))
    };

    const completionLevel = Object.values(rawBigFiveValues).filter(v => v !== undefined).length / 5;
    const normBigFiveValues = Object.fromEntries(Object.entries(rawBigFiveValues).map(([k,v]) => [k, parseFloat(normalize(v, 2*minVal, 2*maxVal)).toFixed(3)]));

    const result = {
        // These 5 are the normalized scores of big-5 personality traits; returns undefined if no enough information collected 
        normExtroversionScore: normBigFiveValues["extroversion"],
        normAgreeablenessScore: normBigFiveValues["agreeablness"],
        normConscientiousnessScore: normBigFiveValues["conscientiousness"],
        normEmotionalStabilityScore: normBigFiveValues["emotionalStability"],
        normOpennessToExperienceScore: normBigFiveValues["opennessToExperience"],
        completion: completionLevel   // proportion of 5 outcomes that can be calculated with the inputs
    };

    return result;
}
