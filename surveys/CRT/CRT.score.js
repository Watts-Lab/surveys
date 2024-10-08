// drill_hammer	A drill and a hammer cost $330 in total. The drill costs $300 more than the hammer. How much does the hammer cost?	number	15	Please only write the numeric answer to the following questions.
// rachel	Rachel is the 10th tallest and the 10th shortest girl in her class. How many girls are in her class?	number	19	Please only write the numeric answer to the following questions.
// toaster	When on sale for 20% off, a toaster costs $100. What does it cost when not on sale?	number	125	Please only write the numeric answer to the following questions.
// apples	In a pail of 60 apples, red apples are 3 times more common than green ones. How many are green?	number	15	Please only write the numeric answer to the following questions.
// eggs	After hatching from its egg, a baby bird doubles in weight every day. By day 12 it weighs a pound. On what day does the bird weigh half a pound?	number	11	Please only write the numeric answer to the following questions.
// dog_cat	A dog and a cat weigh 100 pounds in total. The dog weighs 86 pounds. What is the difference in weight between the dog and the cat?	number	72	Please only write the numeric answer to the following questions.

const answers = {
  drill_hammer: 15,
  rachel: 19,
  toaster: 125,
  apples: 15,
  eggs: 11,
  dog_cat: 72,
};

export default function scoreFunc(responses) {
  // Calculate score
  let score = 0;

  Object.keys(answers).forEach((questionName) => {
    const response = responses[questionName];
    const answer = answers[questionName];

    if (response === answer) {
      score += 1;
    }
  });

  return { score: score, normScore: (score / 6).toFixed(3) };
}
