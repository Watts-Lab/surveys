import React from "react";
// import { ListeningQualityOwn } from "@watts-lab/surveys";
import { DiscussionSelfInsight } from "../../src/index";
const dummy = {
  set(response) {},
};

const dataNames = [
  "understandSelf",
  "thinkDeeply",
  "newInsights",
  "reflectOnAttitudes",
  "thinkDifferently",
];
const dataNameSet = new Set(dataNames);

describe("DiscussionSelfInsight", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<DiscussionSelfInsight onComplete={dummy.set} />);

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

    cy.get('[data-name="understandSelf"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="thinkDeeply"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="newInsights"] input[value="4"]').click({
      force: true,
    });

    // Omit to test ability to handle incomplete surveys
    // cy.get('[data-name="reflectOnAttitudes"] input[value="1"]').click({
    //   force: true,
    // });

    cy.get('[data-name="thinkDifferently"] input[value="1"]').click({
      force: true,
    });

    // cy.screenshot("discussionSelfInsight/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["rawScore"]).to.eq((3.25).toFixed(3));
      expect(spyCall["result"]["normScore"]).to.eq((0.375).toFixed(3));
      expect(spyCall["result"]["completion"]).to.eq(0.8);
      expect(spyCall["responses"]["thinkDeeply"]).to.eq(4);
    });
  });
});
