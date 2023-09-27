import React from "react";
import { DiscussionQualityControl } from "../../src/index";

const dummy = {
  set(response) {},
};

const loremIpsum = "lorem ipsum dolor sit amet";

describe("Demographics", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<DiscussionQualityControl onComplete={dummy.set} />);

    cy.get('[data-name="participateAgain"] input[value="no"]').click({
      force: true,
    });

    cy.get('[data-name="adequateCompensation"] input[value="underpaid"]').click(
      { force: true }
    );

    cy.get('[data-name="adequateTime"] input[value="adequate"]').click({
      force: true,
    });

    cy.get('[data-name="clearInstructions"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="videoQuality"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="joiningProblems"] input[value="no"]').click({
      force: true,
    });

    cy.get('[data-name="technicalProblems"] input[value="yes"]').click({
      force: true,
    });

    cy.get('[data-name="technicalDetail"] input').click().type(loremIpsum);

    cy.get('[data-name="textExpansion"] input').click().type(loremIpsum);

    cy.contains(
      "tell us more about the trouble you had joining the study"
    ).should("not.exist");

    cy.screenshot("discussionQualityControl/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]).to.be.empty;
      expect(spyCall.responses.textExpansion).to.have.string(loremIpsum);
    });
  });
});
