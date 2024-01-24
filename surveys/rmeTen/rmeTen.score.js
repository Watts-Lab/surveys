const answers = {
  question1: "insisting",
  question2: "fantasizing",
  question3: "regretful",
  question4: "contemplative",
  question5: "doubtful",
  question6: "preoccupied",
  question7: "pensive",
  question8: "cautious",
  question9: "interested",
  question10: "reflective",
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

  return { score: score, maxScore: 10, minScore: 0, responses: responses };
}
