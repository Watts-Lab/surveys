import React from "react";
import { ConstructiveListeningBehaviorsSelf } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("ConstructiveListeningBehaviors", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<ConstructiveListeningBehaviorsSelf onComplete={dummy.set} />);

    cy.get('[data-name="tryToUnderstand"] input[value="3"]').click({
      force: true,
    });

    cy.get('[data-name="askedQuestions"] input[value="3"]').click({
      force: true,
    });

    cy.get('[data-name="encouragedClarification"] input[value="3"]').click({
      force: true,
    });

    cy.get('[data-name="expressedInterest"] input[value="3"]').click({
      force: true,
    });

    // Leave blank on purpose to check scoring algorithm
    // cy.get('[data-name="listenedAttentively"] input[value="0"]').click({
    //   force: true,
    // });

    // cy.get('[data-name="paidAttention"] input[value="0"]').click({
    //   force: true,
    // });

    // cy.get('[data-name="gaveSpace"] input[value="0"]').click({ force: true });

    // cy.get('[data-name="undividedAttention"] input[value="0"]').click({
    //   force: true,
    // });

    cy.get('[data-name="positiveAtmosphere"] input[value="3"]').click({
      force: true,
    });

    cy.get('[data-name="allowedExpression"] input[value="3"]').click({
      force: true,
    });

    cy.screenshot("constructiveListeningBehaviorsSelf/screenshot", {
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
      expect(spyCall["result"]["rawScore"]).to.eq((3).toFixed(3));
      expect(spyCall["result"]["normScore"]).to.eq((1).toFixed(3));
      expect(spyCall["result"]["completion"]).to.eq(0.6);
      expect(spyCall["responses"]["allowedExpression"]).to.eq(3);
      expect(spyCall["responses"]["undividedAttention"]).to.be.undefined;
    });
  });
});
