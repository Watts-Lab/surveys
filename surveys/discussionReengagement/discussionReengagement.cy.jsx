import React from "react";
import { DiscussionReengagement } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("DiscussionReengagement", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<DiscussionReengagement onComplete={dummy.set} />);
    cy.viewport("macbook-11");

    cy.get('[data-name="study"] input[value="1"]').click({
      force: true,
    });

    cy.get('[data-name="partners"] input[value="0"]').click({
      force: true,
    });

    cy.get('[data-name="topic"] input[value="1"]').click({
      force: true,
    });

    cy.screenshot("discussionReengagement/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["study"]).to.eq(1);
      expect(spyCall["result"]["partners"]).to.eq(0);
      expect(spyCall["result"]["topic"]).to.eq(1);
      expect(spyCall["result"]["overallReengagement"]).to.eq(
        (0.66666).toFixed(3)
      );
    });
  });
});
