import React from "react";
import { PersuasionAndLearning } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("PersuasionAndLearning", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<PersuasionAndLearning onComplete={dummy.set} />);
    cy.viewport("macbook-11");

    // learning questions
    cy.get('[data-name="learning"] input[value="6"]').click({
      force: true,
    });

    cy.get('[data-name="thinkDifferently"] input[value="2"]').click({
      force: true,
    });

    // pseruasion questions
    cy.get('[data-name="persuasiveOutcome"] input[value="3"]').click({
      force: true,
    });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    // check mandatory is enforced
    cy.contains("Response required");

    // finish the survey
    cy.get('[data-name="notPersuaded"] input[value="4"]').click({
      force: true,
    });

    cy.screenshot("persuasionAndLearning/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["normLearning"]).to.eq((0.5).toFixed(3));
      expect(spyCall["result"]["normPersuasion"]).to.eq((0.416666).toFixed(3));
    });
  });
});
