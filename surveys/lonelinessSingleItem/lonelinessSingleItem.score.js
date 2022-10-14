// simple normalization only

export default function scoreFunc(responses) {
    const minScore = 0;
    const maxScore = 10;

    const rawScore = parseInt(responses["loneliness"]);

    const result = {
        rawScore: rawScore,
        normScore: (rawScore - minScore) / (maxScore - minScore),
      };
    return result;
}