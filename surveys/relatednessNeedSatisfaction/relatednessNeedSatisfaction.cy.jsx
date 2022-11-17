import React from "react";
//import { RelatednessNeedSatisfaction } from "@watts-lab/surveys";
import { RelatednessNeedSatisfaction } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("RelatenessNeedSatisfaction", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<RelatednessNeedSatisfaction onComplete={dummy.set} />);

    cy.get('[data-name="closeness"] input[value="7"]').click({
      force: true,
    });

    cy.get('[data-name="distance"] input[value="3"]').click({
      force: true,
    });

    cy.get('[data-name="caredAbout"] input[value="7"]').click({
      force: true,
    });

    cy.screenshot("relatednessNeedSatisfaction/screenshot", {
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
      expect(spyCall["result"]["rawScore"]).to.eq(21);
      expect(spyCall["result"]["normScore"]).to.eq(0.75);
      expect(spyCall["responses"]["distance"]).to.eq(3);
    });
  });
});