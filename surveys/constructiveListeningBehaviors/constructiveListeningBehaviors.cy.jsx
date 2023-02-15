import React from "react";
import { ConstructiveListeningBehaviors } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("ConstructiveListeningBehaviors", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<ConstructiveListeningBehaviors onComplete={dummy.set} />);

    cy.get('[data-name="tryToUnderstand"] input[value="0"]').click({
      force: true,
    });

    cy.get('[data-name="askedQuestions"] input[value="0"]').click({
      force: true,
    });

    cy.get('[data-name="encouragedClarification"] input[value="0"]').click({
      force: true,
    });

    cy.get('[data-name="expressedInterest"] input[value="0"]').click({
      force: true,
    });

    cy.get('[data-name="listenedAttentively"] input[value="0"]').click({
      force: true,
    });

    cy.get('[data-name="paidAttention"] input[value="0"]').click({
      force: true,
    });

    cy.get('[data-name="gaveSpace"] input[value="0"]').click({ force: true });

    cy.get('[data-name="undividedAttention"] input[value="0"]').click({
      force: true,
    });

    cy.get('[data-name="positiveAtmosphere"] input[value="0"]').click({
      force: true,
    });

    cy.get('[data-name="allowedExpression"] input[value="0"]').click({
      force: true,
    });

    cy.screenshot("constructiveListeningBehaviors/screenshot", {
      overwrite: true,
    });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["rawScore"]).to.eq(0);
      expect(spyCall["result"]["normScore"]).to.eq(0.5);
      expect(spyCall["responses"]["allowedExpression"]).to.eq(0);
    });
  });
});
