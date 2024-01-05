// superSpecialSurvey.cy.js

import React from "react";
import { CRT } from "../../src/index.js";

const dummy = {
  set(response) {},
};

describe("CRt", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<SuperSpecialSurvey onComplete={dummy.set} />);

    cy.get('[data-responsive-title="Disagree"] input').click({
      multiple: true,
      timeout: 6000,
      force: true,
    });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist"); // test for completion message

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["rawScore"]).to.eq(0.6);
    });
  });
});
