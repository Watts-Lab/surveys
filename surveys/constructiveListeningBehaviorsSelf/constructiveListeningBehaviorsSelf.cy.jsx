import React from "react";
import { ConstructiveListeningBehaviorsSelf } from "../../src/index";

const dummy = {
  set(response) {},
};

const ids = ["sq_100", "sq_101", "sq_102", "sq_103", 
  "sq_104", "sq_105", "sq_106", "sq_107", "sq_108", "sq_109", "sq_110"];
const ids2 = ["sq_111", "sq_112", "sq_113", "sq_114", 
  "sq_115", "sq_116", "sq_117", "sq_118", "sq_119", "sq_120", "sq_121"];

describe("ConstructiveListeningBehaviors", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<ConstructiveListeningBehaviorsSelf onComplete={dummy.set} />);

    const idList = [];
    cy.get(".sv-question.sv-row__question").each(($el) => {
      cy.wrap($el).invoke("attr", "id").then(curr => {
        idList.push(curr);
      });
    })
    cy.wrap(idList).should("not.be.deep.equal", ids);
    cy.wrap(idList).should("not.be.deep.equal", ids2);

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
      expect(spyCall["result"]["rawScore"]).to.eq(3);
      expect(spyCall["result"]["normScore"]).to.eq(1);
      expect(spyCall["result"]["completion"]).to.eq(0.6);
      expect(spyCall["responses"]["allowedExpression"]).to.eq(3);
      expect(spyCall["responses"]["undividedAttention"]).to.be.undefined;
    });
  });
});
