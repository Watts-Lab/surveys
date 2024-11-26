import React from "react";
import { DiscussionGeneral } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("DiscussionGeneral", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<DiscussionGeneral onComplete={dummy.set} />);
    cy.viewport("macbook-11");

    cy.get('[data-name="discussionEnjoy"]').contains("Some").click({
      force: true,
    });

    cy.get('[data-name="selfLearned"]').contains("Very little").click({
      force: true,
    });

    cy.get('[data-name="discussionDepth"]').contains("Not at all").click({
      force: true,
    });

    cy.get('[data-name="discussionDisagreement"]')
      .contains("Some disagreement")
      .click({
        force: true,
      });

    cy.get('[data-name="discussionTension"]')
      .contains("Moderately tense")
      .click({
        force: true,
      });

    cy.get('[data-name="selfSpeakUp"]').contains("Often").click({
      force: true,
    });

    cy.get('[data-name="selfJudged"]').contains("Some").click({
      force: true,
    });

    cy.get('[data-name="selfVoice"]').contains("Neutral").click({
      force: true,
    });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    // check mandatory is enforced
    cy.contains("Response required");

    cy.get('[data-name="selfAnxious"]').contains("A fair amount").click({
      force: true,
    });

    cy.get('[data-name="selfInsight"]').contains("Some").click({
      force: true,
    });

    cy.screenshot("discussionGeneral/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["discussionEnjoy"]).to.eq("0.5");
      expect(spyCall["result"]["selfLearned"]).to.eq("0.25");
      expect(spyCall["result"]["discussionDepth"]).to.eq("0.0");
      expect(spyCall["result"]["discussionDisagreement"]).to.eq("0.5");
      expect(spyCall["result"]["discussionOverall"]).to.eq(
        (
          (0.5 + // discussionEnjoy
            0.25 + // selfLearned
            0 + // discussionDepth
            // disagreement is omitted
            (1 - 0.75) + // tension
            0.75 + // selfSpeakUp
            0.5 + // selfVoice
            (1 - 0.75) + // selfAnxious
            (1 - 0.5) + // selfJudged
            0.5) / // selfInsight
          9
        ).toFixed(3)
      );
    });
  });
});
