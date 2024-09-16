import React from "react";
import { CRT } from "../../src/index";

// Initialize an empty answers object

const dummy = {
  set(response) {},
};

describe("CRT", () => {
  it("completes the survey", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<CRT onComplete={dummy.set} />);
    cy.viewport("macbook-11");

    cy.get('[data-name="drill_hammer"] input[type="number"]').type(15); // correct
    cy.get('[data-name="rachel"] input[type="number"]').type(19); // correct
    cy.get('[data-name="toaster"] input[type="number"]').type(125); // correct
    cy.get('[data-name="apples"] input[type="number"]').type(-3); // wrong
    cy.get('[data-name="eggs"] input[type="number"]').type("cat"); // wrong
    cy.get('[data-name="dog_cat"] input[type="number"]').type(100000000000); // wrong

    cy.screenshot("CRT/screenshot", {
      overwrite: true,
    });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["score"]).to.eq(3);
      expect(spyCall["result"]["normScore"]).to.eq((0.5).toFixed(3));
    });
  });
});
