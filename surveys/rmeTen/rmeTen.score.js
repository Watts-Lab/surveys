const answers = {
  rme_item_4: "insisting",
  rme_item_6: "fantasizing",
  rme_item_11: "regretful",
  rme_item_15: "contemplative",
  rme_item_17: "doubtful",
  rme_item_22: "preoccupied",
  rme_item_24: "pensive",
  rme_item_27: "cautious",
  rme_item_28: "interested",
  rme_item_29: "reflective",
};

export default function scoreFunc(responses) {
  let score = 0;

  Object.keys(answers).forEach((questionName) => {
    const response = responses[questionName];
    const answer = answers[questionName];

    if (response === answer) {
      score += 1;
    }
  });

  return { score: score, normScore: (score / 10).toFixed(3) };
}
