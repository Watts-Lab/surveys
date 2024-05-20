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

    cy.get('[data-name="discussionEnjoy"] input[value="1"]').click({
      force: true,
    });

    cy.get('[data-name="selfLearned"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="discussionDepth"] input[value="3"]').click({
      force: true,
    });

    cy.get('[data-name="discussionDisagreement"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="discussionTension"] input[value="5"]').click({
      force: true,
    });

    cy.get('[data-name="selfSpeakUp"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="selfVoice"] input[value="3"]').click({
      force: true,
    });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    // check mandatory is enforced
    cy.contains("Response required");

    cy.get('[data-name="selfAnxious"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="selfInsight"] input[value="2"]').click({
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
      expect(spyCall["result"]["normDiscussionEnjoy"]).to.eq((0).toFixed(3));
      expect(spyCall["result"]["normSelfLearned"]).to.eq((0.25).toFixed(3));
      expect(spyCall["result"]["normDiscussionDepth"]).to.eq((0.5).toFixed(3));
      expect(spyCall["result"]["normDiscussionDisagreement"]).to.eq(
        (0.75).toFixed(3)
      );
    });
  });
});
