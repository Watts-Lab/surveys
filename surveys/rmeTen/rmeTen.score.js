// No postprocessing needed for this survey
// Item 4: Insisting
// Item 6: Fantasizing
// Item 11: Regretful
// Item 15: Contemplative
// Item 17: Doubtful
// Item 22: Preoccupied
// Item 24: Pensive
// Item 27: Cautious
// Item 28: Interested
// Item 29: Reflective

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
