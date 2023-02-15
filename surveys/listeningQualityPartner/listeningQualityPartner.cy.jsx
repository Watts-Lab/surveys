import React from "react";
//import { ListeningQualityPartner } from "@watts-lab/surveys";
import { ListeningQualityPartner } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("ListeningQualityPartner", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<ListeningQualityPartner onComplete={dummy.set} />);

    cy.get('[data-name="tryToUnderstand"] input[type=range]')
      .trigger("mousedown", "center")
      .trigger("mouseup");

    cy.get('[data-name="askedQuestions"] input[type=range]')
      .trigger("mousedown", "center")
      .trigger("mouseup");

    cy.get('[data-name="encouragedClarification"] input[type=range]')
      .trigger("mousedown", "center")
      .trigger("mouseup");

    cy.get('[data-name="expressedInterest"] input[type=range]')
      .trigger("mousedown", "center")
      .trigger("mouseup");

    cy.get('[data-name="listenedAttentively"] input[type=range]')
      .trigger("mousedown", "center")
      .trigger("mouseup");

    cy.get('[data-name="paidAttention"] input[type=range]')
      .trigger("mousedown", "center")
      .trigger("mouseup");

    cy.get('[data-name="gaveSpace"] input[type=range]')
      .trigger("mousedown", "center")
      .trigger("mouseup");

    cy.get('[data-name="undividedAttention"] input[type=range]')
      .trigger("mousedown", "center")
      .trigger("mouseup");

    cy.get('[data-name="positiveAtmosphere"] input[type=range]')
      .trigger("mousedown", "center")
      .trigger("mouseup");

    cy.get('[data-name="allowedExpression"] input[type=range]')
      .trigger("mousedown", "center")
      .trigger("mouseup");

    cy.screenshot("listeningQualityPartner/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["rawScore"]).to.eq(25);
      expect(spyCall["result"]["normScore"]).to.eq(0.25);
      expect(spyCall["responses"]["allowedExpression"]).to.eq(2);
    });
  });
});
