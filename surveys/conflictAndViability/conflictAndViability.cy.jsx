import React from "react";
import { ConflictAndViability } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("ConflictAndViability", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<ConflictAndViability onComplete={dummy.set} />);

    cy.get('[data-name="heated"] input[value="6"]').click({
      force: true,
    });

    cy.get('[data-name="conflict"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="capableUnit"] input[value="3"]').click({
      force: true,
    });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    // check mandatory is enforced
    cy.contains("Response required");

    // finish the survey
    cy.get('[data-name="workTogetherAgain"] input[value="4"]').click({
      force: true,
    });

    cy.screenshot("conflictAndViability/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["normConflict"]).to.eq((0.5).toFixed(3));
      expect(spyCall["result"]["normViability"]).to.eq((0.416666).toFixed(3));
    });
  });
});
