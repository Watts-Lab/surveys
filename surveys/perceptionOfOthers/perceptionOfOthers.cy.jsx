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

    cy.get('[data-name="liking"] input[value="6"]').click({
      force: true,
    });

    cy.get('[data-name="dismissiveOther"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="curious"] input[value="3"]').click({
      force: true,
    });

    cy.get('[data-name="respectfulDisagreement"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="authenticity"] input[value="1"]').click({
      force: true,
    });

    cy.get('[data-name="ambiguity"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="directness"] input[value="7"]').click({
      force: true,
    });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    // check mandatory is enforced
    cy.contains("Response required");

    cy.get('[data-name="undermining"] input[value="2"]').click({
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
      expect(spyCall["result"]["normLiking"]).to.eq((0.83333).toFixed(3));
      expect(spyCall["result"]["normReceptiveness"]).to.eq(
        (0.555555).toFixed(3)
      );
      expect(spyCall["result"]["normAuthenticity"]).to.eq((0).toFixed(3));
      expect(spyCall["result"]["normAmbiguity"]).to.eq((0.166666).toFixed(3));
      expect(spyCall["result"]["normDirectness"]).to.eq((1).toFixed(3));
      expect(spyCall["result"]["normUndermining"]).to.eq((0.166667).toFixed(3));
    });
  });
});
