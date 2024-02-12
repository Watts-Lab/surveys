import React from "react";
import { AttitudeAttributes } from "../../src/index";

const dummy = {
  set(response) {},
};

const dataNames = [
  "importance",
  "knowledge",
  "certainty",
  "ambivalence",
  "personalRelevance",
  "moralConviction",
  "elaboration",
];

describe("AttitudeAttributes", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<AttitudeAttributes onComplete={dummy.set} />);
    cy.viewport("macbook-11");
    cy.checkRandomization(dataNames);

    cy.get('[data-name="importance"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="knowledge"] input[value="1"]').click({
      force: true,
    });

    cy.get('[data-name="certainty"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="ambivalence"] input[value="3"]').click({
      force: true,
    });

    cy.get('[data-name="personalRelevance"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="moralConviction"] input[value="0"]').click({
      force: true,
    });

    cy.get('[data-name="elaboration"] input[value="1"]').click({
      force: true,
    });

    cy.screenshot("attitudeAttributes/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["importance"]).to.eq((0.5).toFixed(3));
      expect(spyCall["result"]["personalRelevance"]).to.eq((1).toFixed(3));
      expect(spyCall["result"]["knowledge"]).to.eq((0.25).toFixed(3));
      expect(spyCall["responses"]["importance"]).to.eq(2);
      expect(spyCall["responses"]["elaboration"]).to.eq(1);
    });
  });
});
