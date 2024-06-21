import React from "react";
import { TraitRatings } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("TraitRatings", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<TraitRatings onComplete={dummy.set} />);
    cy.viewport("macbook-11");

    cy.get('[data-name="patriotic"] input[value="1"]').click({
      force: true,
    });

    cy.get('[data-name="intelligent"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="honest"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="openMinded"] input[value="3"]').click({
      force: true,
    });

    cy.get('[data-name="generous"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="hypocritical"] input[value="0"]').click({
      force: true,
    });

    cy.get('[data-name="selfish"] input[value="1"]').click({
      force: true,
    });

    cy.get('[data-name="mean"] input[value="2"]').click({
      force: true,
    });

    cy.screenshot("traitRatings/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["responses"]["patriotic"]).to.eq(1);
      expect(spyCall["responses"]["hypocritical"]).to.eq(0);
      expect(spyCall["result"]["normIntelligent"]).to.eq((0.5).toFixed(3));
      expect(spyCall["result"]["normOverallAffect"]).to.eq(
        (0.65625).toFixed(3)
      );
    });
  });
});
