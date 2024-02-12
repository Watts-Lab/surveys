import React from "react";
import { Receptiveness4 } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("Receptiveness4", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<Receptiveness4 onComplete={dummy.set} />);
    cy.viewport("macbook-11");

    cy.get('[data-name="frustrated"] input[value="6"]').click({
      force: true,
    });

    cy.get('[data-name="reading"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="emotionalArguments"] input[value="3"]').click({
      force: true,
    });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    // check mandatory is enforced
    cy.contains("Response required");

    // finish the survey
    cy.get('[data-name="ideasDangerous"] input[value="4"]').click({
      force: true,
    });

    cy.screenshot("receptiveness4/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["normReceptiveness"]).to.eq((0.375).toFixed(3));
    });
  });
});
