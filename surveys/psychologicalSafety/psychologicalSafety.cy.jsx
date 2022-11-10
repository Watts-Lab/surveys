import React from "react";
//import { PsychologicalSafety } from "@watts-lab/surveys";
import { PsychologicalSafety } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("PsychologicalSafety", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<PsychologicalSafety onComplete={dummy.set} />);

    cy.get('[data-name="holdMistake"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="othersProblems"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="rejectedDifferent"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="safeToTakeRisks"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="difficultToAskHelp"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="notUndermine"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="skillsValued"] input[value="4"]').click({
      force: true,
    });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["rawScore"]).to.eq(28);
      expect(spyCall["result"]["normScore"]).to.eq(0.5);
      expect(spyCall["responses"]["skillsValued"]).to.eq(4);
    });
  });
});
