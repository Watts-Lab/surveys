import React from "react";
// import { ListeningQualityOwn } from "@watts-lab/surveys";
import { DiscussionSelfInsight } from "../../src/index";
const dummy = {
  set(response) {},
};

describe("DiscussionSelfInsight", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<DiscussionSelfInsight onComplete={dummy.set} />);

    cy.get('[data-name="understandSelf"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="thinkDeeply"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="newInsights"] input[value="4"]').click({
      force: true,
    });

    // Omit to test ability to handle incomplete surveys
    // cy.get('[data-name="reflectOnAttitudes"] input[value="1"]').click({
    //   force: true,
    // });

    cy.get('[data-name="thinkDifferently"] input[value="1"]').click({
      force: true,
    });

    cy.screenshot("discussionSelfInsight/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["rawScore"]).to.eq(3.25);
      expect(spyCall["result"]["normScore"]).to.eq(0.375);
      expect(spyCall["result"]["completion"]).to.eq(0.8);
      expect(spyCall["responses"]["thinkDeeply"]).to.eq(4);
    });
  });
});
