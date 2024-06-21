import React from "react";
import { TIPI } from "../../src/index";

const dummy = {
  set(response) {},
};

const dataNames = [
  "extroversion",
  "criticalness",
  "dependability",
  "anxiety",
  "openness",
  "quietness",
  "sympathy",
  "carelessness",
  "calmness",
  "conventionality",
];

describe("TIPI", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<TIPI onComplete={dummy.set} />);
    cy.viewport("macbook-11");
    cy.checkRandomization(dataNames);

    // extroversion
    cy.get('[data-name="extroversion"] input[value="1"]').click({
      force: true,
    });

    cy.get('[data-name="quietness"] input[value="6"]').click({
      force: true,
    });

    // Agreeableness
    cy.get('[data-name="criticalness"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="sympathy"] input[value="3"]').click({
      force: true,
    });

    // Conscientiousness
    cy.get('[data-name="dependability"] input[value="5"]').click({
      force: true,
    });

    cy.get('[data-name="carelessness"] input[value="2"]').click({
      force: true,
    });

    // Emotional Stability
    cy.get('[data-name="anxiety"] input[value="1"]').click({
      force: true,
    });

    cy.get('[data-name="calmness"] input[value="7"]').click({
      force: true,
    });

    // Openness
    cy.get('[data-name="openness"] input[value="4"]').click({
      force: true,
    });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    // check mandatory is enforced
    cy.contains("Response required");

    cy.get('[data-name="conventionality"] input[value="4"]').click({
      force: true,
    });

    cy.screenshot("TIPI/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["normExtroversion"]).to.eq(
        (0.083333).toFixed(3)
      );
      expect(spyCall["result"]["normAgreeableness"]).to.eq(
        (0.58333).toFixed(3)
      );
      expect(spyCall["result"]["normConscientiousness"]).to.eq(
        (0.75).toFixed(3)
      );
      expect(spyCall["result"]["normEmotionalStability"]).to.eq(
        (1.0).toFixed(3)
      );
      expect(spyCall["result"]["normOpennessToExperience"]).to.eq(
        (0.5).toFixed(3)
      );
    });
  });
});
