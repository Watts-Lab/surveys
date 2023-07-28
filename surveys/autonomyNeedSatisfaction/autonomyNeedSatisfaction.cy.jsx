import React from "react";
import { AutonomyNeedSatisfaction } from "../../src/index";

const dummy = {
  set(response) {},
};

const dataNames = [
  "chooseDirection",
  "chooseContent",
  "sharingChoice",
  "importantDiscussion",
  "sensitiveTopics",
  "feelingFree",
  "voiceOpinion",
  "controlledPressured",
];
const dataNameSet = new Set(dataNames);

describe("AutonomyNeedSatisfaction", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<AutonomyNeedSatisfaction onComplete={dummy.set} />);

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

    // submit answers
    cy.get('[data-name="chooseDirection"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="chooseContent"] input[value="8"]').click({
      force: true,
    });

    // omitted to test that the survey can be completed without answering all questions
    // cy.get('[data-name="sharingChoice"] input[value="2"]').click({
    //   force: true,
    // });

    // cy.get('[data-name="importantDiscussion"] input[value="2"]').click({
    //   force: true,
    // });

    cy.get('[data-name="sensitiveTopics"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="feelingFree"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="voiceOpinion"] input[value="2"]').click({
      force: true,
    });

    // cy.get('[data-name="controlledPressured"] input[value="8"]').click({
    //   force: true,
    // });

    cy.screenshot("autonomyNeedSatisfaction/screenshot", { overwrite: true });

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
      expect(spyCall["result"]["normScore"]).to.eq((0.125).toFixed(3));
      expect(spyCall["result"]["completion"]).to.eq(0.625);
      expect(spyCall["responses"]["chooseDirection"]).to.eq(2.0);
      expect(spyCall["responses"]["controlledPressured"]).to.be.undefined;
    });
  });
});
