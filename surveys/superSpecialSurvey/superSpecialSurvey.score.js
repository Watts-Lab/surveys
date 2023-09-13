// function normalize(array, minVal, maxVal) {
 //   return array.map((val) => (val - minVal) / (maxVal - minVal));
// }
function normalize(val, minVal, maxVal) {
    return (val - minVal) / (maxVal - minVal);
}

function normalizeDict(dict, minVal, maxVal) {
    return Object.entries(dict).forEach((k,v) => normalize(v, minVal, maxVal));
    //normalize(Object.values(dict), minVal, maxVal);
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

    const completedValues = Object.fromEntries(Object.entries(rawBigFiveValues).filter(([k,v]) => !Number.isNaN(v))); // don't include empty values in response, not normalized yet

    const completionLevel = Object.values(rawBigFiveValues).filter((v) => !Number.isNaN(v)).length / 5;
    // const normBigFiveValues = Object.entries(rawBigFiveValues).forEach(([k,v]) => {
    //    v = normalize(v, 2*minVal, 2*maxVal).toFixed(3)
    // });

    const result = {
        rawScore: rawValues.filter((v) => !Number.isNaN(v)),            // non-empty raw inputs from the questions
        normExtroversionScore: normalize(rawBigFiveValues["extroversion"], 2*minVal, 2*maxVal).toFixed(3),
        normAgreeablenessScore: normalize(rawBigFiveValues["agreeablness"], 2*minVal, 2*maxVal).toFixed(3),
        normConscientiousnessScore: normalize(rawBigFiveValues["conscientiousness"], 2*minVal, 2*maxVal.toFixed(3)),
        normEmotionalStabilityScore: normalize(rawBigFiveValues["emotionalStability"], 2*minVal, 2*maxVal).toFixed(3),
        normOpennessToExperienceScore: normalize(rawBigFiveValues["opennessToExperience"], 2*minVal, 2*maxVal).toFixed(3),
        // normScore: Object.values(normedValues).forEach(v => v.toFixed(3)),         // non-empty calculated normalized big-5 personaly scores
        completion: completionLevel // rawBigFiveValues.length / 5    // proportion of 5 outcomes that can be calculated with the inputs
    };

    return result;
}
