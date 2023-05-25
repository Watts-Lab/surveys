import React from "react";
// import { ExampleSurvey } from "@watts-lab/surveys";
import { ExampleSurvey } from "../../src/index";
import sha from "../../surveys/exampleSurvey/sha.json";

const dummy = {
  set(response) {},
};

const loremIpsum = "lorem ipsum dolor sit amet";

describe("ExampleSurvey", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<ExampleSurvey onComplete={dummy.set} />);

    cy.get(`[data-name="nps_score"] input[value="1"]`)
      .next()
      .click({ force: true });

    cy.get(`[data-name="nps_score"] input[value="2"]`)
      .next()
      .click({ force: true });

    cy.get('[data-name="disappointed_experience"] textarea')
      .click()
      .type(loremIpsum);

    cy.screenshot("./screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall.result.normScore).to.eq(0.2);
      expect(spyCall.result.rawScore).to.eq(2);
      expect(spyCall.responses.disappointed_experience).to.have.string(
        loremIpsum
      );
      expect(spyCall.surveySha).to.eq(sha.survey);
      expect(spyCall.scoreSha).to.eq(sha.score);
    });
  });
});
