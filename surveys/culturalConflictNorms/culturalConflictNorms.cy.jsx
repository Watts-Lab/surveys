import React from "react";
import { CulturalConflictNorms } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("CulturalConflictNorms", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<CulturalConflictNorms onComplete={dummy.set} />);
    cy.viewport("macbook-11");

    cy.get('[data-name="openConflict"] input[value="6"]').click({
      force: true,
    });

    cy.get('[data-name="avoidConflict"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="resolveImmediately"] input[value="3"]').click({
      force: true,
    });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    // check mandatory is enforced
    cy.contains("Response required");

    // finish the survey
    cy.get('[data-name="conflictIsDetrimental"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="emotionAccepted"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="disagreementsEncouraged"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="differencesAvoided"] input[value="2"]').click({
      force: true,
    });

    cy.screenshot("culturalConflictNorms/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["normConflictOpenness"]).to.eq(
        (0.57142).toFixed(3)
      );
    });
  });
});
