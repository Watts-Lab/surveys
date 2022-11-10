// No postprocessing needed for this survey

export default function scoreFunc(responses) {
    const minScore = 0;
    const maxScore = 10;

    const rawScore = parseInt(responses["nps_score"]);

    const result = {
        rawScore: rawScore,
        normScore: (rawScore - minScore) / (maxScore - minScore),
      };
    return result;
}