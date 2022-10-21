import React from "react";
import { ListeningQualityOwn } from "@watts-lab/surveys";

const dummy = {
  set(response) {},
};

describe("ListeningQualityOwn", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<ListeningQualityOwn onComplete={dummy.set} />);

    cy.get('[data-name="tryToUnderstand2"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="askedQuestions2"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="encouragedClarification2"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="expressedInterest2"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="listenedAttentively2"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="paidAttention2"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="gaveSpace2"] input[value="2"]').click({ force: true });

    cy.get('[data-name="undividedAttention2"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="positiveAtmosphere2"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="allowedExpression2"] input[value="2"]').click({
      force: true,
    });

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
      expect(spyCall["responses"]["allowedExpression2"]).to.eq(2);
    });
  });
});
