import React from "react";
// import { ListeningQualityOwn } from "@watts-lab/surveys";
import { ListeningQualityOwn } from "../../src/index";
const dummy = {
  set(response) {},
};

describe("ListeningQualityOwn", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<ListeningQualityOwn onComplete={dummy.set} />);

    cy.get('[data-name="tryToUnderstand"] input[type=range]')
      .invoke("val", 25)
      .trigger("mousedown", "center");

    cy.get('[data-name="askedQuestions"] input[type=range]')
      .invoke("val", 25)
      .trigger("mousedown", "center");

    cy.get('[data-name="encouragedClarification"] input[type=range]')
      .invoke("val", 25)
      .trigger("mousedown", "center");

    cy.get('[data-name="expressedInterest"] input[type=range]')
      .invoke("val", 25)
      .trigger("mousedown", "center");

    cy.get('[data-name="listenedAttentively"] input[type=range]')
      .invoke("val", 25)
      .trigger("mousedown", "center");

    cy.get('[data-name="paidAttention"] input[type=range]')
      .invoke("val", 25)
      .trigger("mousedown", "center");

    cy.get('[data-name="gaveSpace"] input[type=range]')
      .invoke("val", 25)
      .trigger("mousedown", "center");

    cy.get('[data-name="undividedAttention"] input[type=range]')
      .invoke("val", 25)
      .trigger("mousedown", "center");

    cy.get('[data-name="positiveAtmosphere"] input[type=range]')
      .invoke("val", 25)
      .trigger("mousedown", "center");

    cy.get('[data-name="allowedExpression"] input[type=range]')
      .invoke("val", 25)
      .trigger("mousedown", "center");

    cy.screenshot("listeningQualityOwn/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["rawScore"]).to.eq(20);
      expect(spyCall["result"]["normScore"]).to.eq(0.125);
      expect(spyCall["responses"]["allowedExpression"]).to.eq(2);
    });
  });
});
