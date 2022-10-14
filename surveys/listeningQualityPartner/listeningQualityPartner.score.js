// No postprocessing needed for this survey

export default function scoreFunc(responses) {
  const minScore = 1 * 10;
  const maxScore = 9 * 10;

  const rawScore =
    parseInt(responses["listeningQualityPartner"]["tried to understand"]) +
    parseInt(responses["listeningQualityPartner"]["asked questions"]) +
    parseInt(responses["listeningQualityPartner"]["encouraged clarification"]) +
    parseInt(responses["listeningQualityPartner"]["expressed interest"]) +
    parseInt(responses["listeningQualityPartner"]["listened attentively"]) +
    parseInt(responses["listeningQualityPartner"]["paid attention"]) +
    parseInt(responses["listeningQualityPartner"]["time and space"]) +
    parseInt(responses["listeningQualityPartner"]["undivided attention"]) +
    parseInt(responses["listeningQualityPartner"]["positive atmosphere"]) +
    parseInt(responses["listeningQualityPartner"]["full expression"]);

  const result = {
    rawScore: rawScore,
    normScore: (rawScore - minScore) / (maxScore - minScore),
  };
  return result;
}
