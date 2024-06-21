import React from "react";
import { CRT } from "../../src/index";

const surveyJsonPath = "surveys/CRT/CRT.json";

// Initialize an empty answers object

const dummy = {
  set(response) {},
};

describe("RMETTen", () => {
  it("completes the survey", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<CRT onComplete={dummy.set} />);
    cy.viewport("macbook-11");

    cy.readFile(surveyJsonPath).then((surveyJson) => {
      surveyJson.pages.forEach((page) => {
        page.elements.forEach((element) => {
          const numberToEnter = 15;

          cy.get(
            `[data-name="${element.name}"] input[type="${element.inputType}"]`
          ).type(numberToEnter);

          cy.get(
            `[data-name="${element.name}"] input[type="${element.inputType}"]`
          ).should("have.value", numberToEnter.toString());
        });
      });

      cy.screenshot("CRT/screenshot", {
        overwrite: true,
      });

      cy.get("form") // submit surveyJS form
        .then(($form) => {
          cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
        });

      cy.get(".sv-body").should("not.exist");

      cy.get("@callback").should("have.been.called");
      cy.get("@callback").then((spy) => {
        const spyCall = spy.getCall(-1).args[0];
        console.log(spyCall);
        expect(spyCall["result"]["score"]).to.eq(2.0);
      });
    });
  });
});
