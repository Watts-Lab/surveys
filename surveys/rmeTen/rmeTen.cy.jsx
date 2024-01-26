import React from "react";
import { RmeTen } from "../../src/index";

const surveyJsonPath = "surveys/rmeTen/rmeTen.json";

// Initialize an empty answers object
const answers = {};

const dummy = {
  set(response) {},
};

describe("RMETTen", () => {
  it("completes the survey", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<RmeTen onComplete={dummy.set} />);
    cy.viewport("macbook-11");

    cy.readFile(surveyJsonPath).then((surveyJson) => {
      // Build the answers object by assuming each question's answer is the first choice
      surveyJson.pages.forEach((page) => {
        page.elements.forEach((element) => {
          if (element.type === "radiogroup") {
            answers[element.name] = element.choices[0];
          }
        });
      });

      // Now iterate over pages to perform the survey
      surveyJson.pages.forEach((page, pageIndex) => {
        page.elements.forEach((element) => {
          if (element.type === "image") {
            // Verify the image is present
            cy.get("img").should("have.attr", "src", element.imageLink);
          } else if (element.type === "radiogroup") {
            // Click the radio button corresponding to the question
            const answerValue = answers[element.name];
            cy.get(
              `[data-name="${element.name}"] input[value="${answerValue}"]`
            ).click({ force: true });
          }
        });

        cy.screenshot(`rmeTen/screenshot_${pageIndex}`, {
          overwrite: true,
        });

        // Click "Next" button if not on the last page
        if (pageIndex < surveyJson.pages.length - 1) {
          cy.get('input[type="button"][value="Next"]').click({ force: true });
        }
      });

      cy.screenshot("rmetTen/screenshot", {
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
      });
    });
  });
});
