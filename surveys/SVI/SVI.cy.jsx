import React from "react";
import { SVI } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("SubjectiveValueInventory", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<SVI onComplete={dummy.set} />);

    // Instrumental Outcome
    cy.get('[data-name="Instrumental Outcome 1"] input[value="5"]').click({
      force: true,
    });

    cy.get('[data-name="Instrumental Outcome 2"] input[value="6"]').click({
      force: true,
    });
    
    cy.get('[data-name="Instrumental Outcome 3"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="Instrumental Outcome 4"] input[value="4"]').click({
      force: true,
    });

    // Self
    cy.get('[data-name="Self 1"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="Self 2"] input[value="2"]').click({
      force: true,
    });
    cy.get('[data-name="Self 3"] input[value="5"]').click({
      force: true,
    });

    cy.get('[data-name="Self 4"] input[value="7"]').click({
      force: true,
    });

    // Process
    cy.get('[data-name="Process 1"] input[value="7"]').click({
      force: true,
    });

    cy.get('[data-name="Process 2"] input[value="6"]').click({
      force: true,
    });

    cy.get('[data-name="Process 3"] input[value="5"]').click({
      force: true,
    });

    cy.get('[data-name="Process 4"] input[value="undefined"]').click({
      force: true,
    });

    // Relationship
    cy.get('[data-name="Relationship 1"] input[value="7"]').click({
      force: true,
    });

    cy.get('[data-name="Relationship 2"] input[value="6"]').click({
      force: true,
    });

    cy.get('[data-name="Relationship 3"] input[value="5"]').click({
      force: true,
    });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    // check mandatory is enforced
    cy.contains("Response required");

    cy.get('[data-name="Relationship 4"] input[value="4"]').click({
      force: true,
    });

    cy.screenshot("SVI/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["InstrumentalOutcome"]).to.eq((5.25).toFixed(3));
      expect(spyCall["result"]["Self"]).to.eq((4.5).toFixed(3));
      expect(spyCall["result"]["Process"]).to.eq((6).toFixed(3));
      expect(spyCall["result"]["Relationship"]).to.eq((5.5).toFixed(3));
      expect(spyCall["result"]["Global"]).to.eq((5.266666667).toFixed(3));
      expect(spyCall["result"]["Rapport"]).to.eq((5.714285714).toFixed(3));
    });
  });
});
