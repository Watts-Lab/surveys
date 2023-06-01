import React from "react";
import { PsychologicalSafety } from "../../src/index";

const dummy = {
  set(response) {},
};

const ids = ["sq_100", "sq_101", "sq_102", "sq_103", 
  "sq_104", "sq_105", "sq_106", "sq_107"];
const ids2 = ["sq_108", "sq_109", "sq_110", "sq_111", 
  "sq_112", "sq_113", "sq_114", "sq_115"];

describe("PsychologicalSafety", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<PsychologicalSafety onComplete={dummy.set} />);

    const idList = [];
    cy.get(".sv-question.sv-row__question").each(($el) => {
      cy.wrap($el).invoke("attr", "id").then(curr => {
        idList.push(curr);
      });
    })
    cy.wrap(idList).should("not.be.deep.equal", ids);
    cy.wrap(idList).should("not.be.deep.equal", ids2);

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
      expect(spyCall["result"]["rawScore"]).to.eq(2);
      expect(spyCall["result"]["normScore"]).to.be.closeTo(0.16666, 0.0001);
      expect(spyCall["result"]["completion"]).to.be.closeTo(0.57, 0.01);
      expect(spyCall["responses"]["skillsValued"]).to.eq(2);
      expect(spyCall["responses"]["safeToTakeRisks"]).to.be.undefined;
    });
  });
});
