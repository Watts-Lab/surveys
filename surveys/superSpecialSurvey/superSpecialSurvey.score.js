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
  
    const completedValues = rawValues.filter((v) => !Number.isNaN(v)); // don't include empty values in response
  
    const normedValues = normalize(completedValues, minVal, maxVal);
  
    
    
    {
      extroversion: responses["extroversion"] + reverseCode(responses["quietness"], minVal, maxVal),
      agreeablness: mean(normedValues).toFixed(3),
      conscientiousness: completedValues.length / rawValues.length,
      emotionalStability:
      opennessToExperience:
    };

    const result = normalize(bigFivePersonality, minVal, maxVal);
    return result;
  }
  