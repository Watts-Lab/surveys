import React from "react";
import { PerceptionOfOthers } from "../../src/index";

const dummy = {
  set(response) {},
};

const dataNames = [
  "liking",
  "dismissiveOther",
  "curious",
  "respectfulDisagreement",
  "authenticity",
  "ambiguity",
  "directness",
  "undermining",
];

describe("PerceptionOfOthers", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<PerceptionOfOthers onComplete={dummy.set} />);
    cy.viewport("macbook-11");
    cy.checkRandomization(dataNames);

    cy.get('[data-name="liking"] input[value="1"]').click({
      force: true,
    });

    cy.get('[data-name="selfPerspectiveTaking"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="common"] input[value="3"]').click({
      force: true,
    });

    cy.get('[data-name="polite"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="partnerListening"] input[value="5"]').click({
      force: true,
    });

    cy.get('[data-name="partnerPerspectiveTaking"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="partnerTalking"] input[value="3"]').click({
      force: true,
    });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    // check mandatory is enforced
    cy.contains("Response required");

    cy.get('[data-name="defensive"] input[value="2"]').click({
      force: true,
    });

    cy.screenshot("perceptionOfOthers/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["normLiking"]).to.eq((0).toFixed(3));
      expect(spyCall["result"]["normPartnerPerspectiveTaking"]).to.eq(
        (0.75).toFixed(3)
      );
      expect(spyCall["result"]["normPolite"]).to.eq((0.75).toFixed(3));
      expect(spyCall["result"]["normPartnerReceptiveness"]).to.eq(
        (0.75).toFixed(3)
      );
    });
  });
});
