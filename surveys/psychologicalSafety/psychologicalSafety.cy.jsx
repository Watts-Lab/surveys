import React from "react";
import { PsychologicalSafety } from "../../src/index";

const dummy = {
  set(response) {},
};

const dataNames = [
  "holdMistake",
  "othersProblems",
  "rejectedDifferent",
  "safeToTakeRisks",
  "difficultToAskHelp",
  "notUndermine",
  "skillsValued",
];
const dataNameSet = new Set(dataNames);

describe("PsychologicalSafety", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<PsychologicalSafety onComplete={dummy.set} />);

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

    cy.get('[data-name="holdMistake"] input[value="6"]').click({
      force: true,
    });

    cy.get('[data-name="othersProblems"] input[value="2"]').click({
      force: true,
    });

    // Omit to test dealing with missing data
    // cy.get('[data-name="rejectedDifferent"] input[value="6"]').click({
    //   force: true,
    // });

    // cy.get('[data-name="safeToTakeRisks"] input[value="2"]').click({
    //   force: true,
    // });

    // cy.get('[data-name="difficultToAskHelp"] input[value="6"]').click({
    //   force: true,
    // });

    cy.get('[data-name="notUndermine"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="skillsValued"] input[value="2"]').click({
      force: true,
    });

    cy.screenshot("psychologicalSafety/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["rawScore"]).to.eq((2).toFixed(3));
      expect(spyCall["result"]["normScore"]).to.eq((0.167).toFixed(3));
      expect(spyCall["result"]["completion"]).to.be.closeTo(0.57, 0.01);
      expect(spyCall["responses"]["skillsValued"]).to.eq(2);
      expect(spyCall["responses"]["safeToTakeRisks"]).to.be.undefined;
    });
  });
});
