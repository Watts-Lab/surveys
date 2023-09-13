import React from "react";
import { SuperSpecialSurvey } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("SuperSpecialSurvey", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<SuperSpecialSurvey onComplete={dummy.set} />);

    cy.get('[data-name="extroversion"] input[value="5"]').click({
      force: true,
    });

    cy.get('[data-name="quietness"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="calmness"] input[value="3"]').click({
        force: true,
      });

    cy.screenshot("superSpecialSurvey/screenshot", {
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
      expect(spyCall["result"]["test"]).to.eq((0.786).toFixed(3));
    //  expect(spyCall["result"]["rawScore"].(5);
    //  expect(spyCall["result"]["rawScore"]["quietness"]).to.eq(2);
      expect(spyCall["result"]["normExtroversionScore"]).to.eq((0.786).toFixed(3));
      expect(spyCall["result"]["normEmotionalStabilityScore"]).to.be.undefined;
      expect(spyCall["result"]["completion"]).to.eq(0.2);
    });
  });
});