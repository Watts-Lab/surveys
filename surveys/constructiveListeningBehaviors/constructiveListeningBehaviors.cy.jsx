import React from "react";
import { ConstructiveListeningBehaviors } from "../../src/index";

const dummy = {
  set(response) {},
};

const dataNames = [
  "tryToUnderstand",
  "askedQuestions",
  "encouragedClarification",
  "expressedInterest",
  "listenedAttentively",
  "paidAttention",
  "gaveSpace",
  "undividedAttention",
  "positiveAtmosphere",
  "allowedExpression"
];
const dataNameSet = new Set(dataNames);

describe("ConstructiveListeningBehaviors", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<ConstructiveListeningBehaviors onComplete={dummy.set} />);

     // check that the order of the questions is randomized
     const nameList = [];
     cy.get(".sv-question.sv-row__question").each(($el) => {
       cy.wrap($el)
         .invoke("attr", "data-name")
         .then((curr) => {
           nameList.push(curr);
         });
     });
 
     cy.wrap(nameList).then((nameList) => {
       const questions = nameList.slice(1); // slice to remove the prompt
       const nameSet = new Set(questions); // convert to set to allow comparison without order
       console.log("Expect set:", nameSet);
       console.log("to equal set:", dataNameSet);
       expect(nameSet).to.be.deep.equal(dataNameSet); // check that all expected questions are present
       expect(questions).to.have.length(dataNames.length); // check that there are no extra questions
       expect(questions).to.not.be.deep.equal(dataNames); // check that the order is randomized
     });

    cy.get('[data-name="tryToUnderstand"] input[value="3"]').click({
      force: true,
    });

    cy.get('[data-name="askedQuestions"] input[value="3"]').click({
      force: true,
    });

    cy.get('[data-name="encouragedClarification"] input[value="3"]').click({
      force: true,
    });

    cy.get('[data-name="expressedInterest"] input[value="3"]').click({
      force: true,
    });

    // Leave blank on purpose to check scoring algorithm
    // cy.get('[data-name="listenedAttentively"] input[value="0"]').click({
    //   force: true,
    // });

    // cy.get('[data-name="paidAttention"] input[value="0"]').click({
    //   force: true,
    // });

    // cy.get('[data-name="gaveSpace"] input[value="0"]').click({ force: true });

    // cy.get('[data-name="undividedAttention"] input[value="0"]').click({
    //   force: true,
    // });

    cy.get('[data-name="positiveAtmosphere"] input[value="3"]').click({
      force: true,
    });

    cy.get('[data-name="allowedExpression"] input[value="3"]').click({
      force: true,
    });

    cy.screenshot("constructiveListeningBehaviors/screenshot", {
      overwrite: true,
    });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["rawScore"]).to.eq((3).toFixed(3));
      expect(spyCall["result"]["normScore"]).to.eq((1).toFixed(3));
      expect(spyCall["result"]["completion"]).to.eq(0.6);
      expect(spyCall["responses"]["allowedExpression"]).to.eq(3);
      expect(spyCall["responses"]["undividedAttention"]).to.be.undefined;
    });
  });
});
