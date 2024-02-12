import React from "react";
import { AwarenessOfArgumentsYN } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("AwarenessOfArguments", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<AwarenessOfArgumentsYN onComplete={dummy.set} />);
    cy.viewport("macbook-11");

    // cy.get('[data-name="heated"] input[value="6"]').click({
    //   force: true,
    // });

    // cy.get('[data-name="conflict"] input[value="2"]').click({
    //   force: true,
    // });

    // cy.get('[data-name="capableUnit"] input[value="3"]').click({
    //   force: true,
    // });

    cy.get('[data-name="reasonYes"] input').click().type("first reason yes");
    cy.get('[data-name="reasonYesPanel"] button').contains("Add new").click();
    cy.get('[data-name="reasonYes"] input')
      .eq(1)
      .click()
      .type("second reason yes");

    cy.get('[data-name="reasonNo"] input').click().type("first reason no");
    cy.get('[data-name="reasonNoPanel"] button').contains("Add new").click();
    cy.get('[data-name="reasonNo"] input')
      .eq(1)
      .click()
      .type("second reason no");

    cy.screenshot("awarenessOfArgumentsYN/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      //   expect(spyCall["result"]["normConflict"]).to.eq((0.5).toFixed(3));
      //   expect(spyCall["result"]["normViability"]).to.eq((0.416666).toFixed(3));
    });
  });
});
