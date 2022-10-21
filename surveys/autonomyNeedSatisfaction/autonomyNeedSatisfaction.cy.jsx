import React from "react";
import { AutonomyNeedSatisfaction } from "@watts-lab/surveys";

const dummy = {
  set(response) {},
};

describe("AutonomyNeedSatisfaction", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<AutonomyNeedSatisfaction onComplete={dummy.set} />);

    cy.get('[data-name="chooseDirection"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="chooseContent"] input[value="8"]').click({
      force: true,
    });

    cy.get('[data-name="sharingChoice"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="importantDiscussion"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="sensitiveTopics"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="feelingFree"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="voiceOpinion"] input[value="2"]').click({ force: true });

    cy.get('[data-name="controlledPressured"] input[value="8"]').click({
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
      expect(spyCall["responses"]["chooseDirection"]).to.eq(2);
    });
  });
});