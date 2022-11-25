/*
Couldn't work out how to unmount and remount the component in a single test, 
so splitting into multiple tests to allow the cypress infrastructure
to unmount and remount the component.

cypress localstorage accessor library
https://www.npmjs.com/package/cypress-localstorage-commands
https://dev.to/walmyrlimaesilv/how-to-read-the-browser-s-localstorage-with-cypress-4k60

example: https://codesandbox.io/s/musing-cloud-z2lhc?file=/src/SurveyComponent.jsx
*/

import json from "@rollup/plugin-json";
import React from "react";
import SurveyFactory from "./surveyFactory";

const surveyJson = {
  elements: [
    {
      type: "radiogroup",
      name: "color",
      title: "What is your favorite color?",
      isRequired: true,
      showNoneItem: true,
      colCount: 4,
      choices: ["red", "blue", "green", "yellow", "purple"],
    },
  ],
};

function scoreFunc(responses) {
  return {};
}

const dummy = {
  set(response) {},
};

const Survey = SurveyFactory("testSurvey", surveyJson, scoreFunc);
const storageName = "testLocalStorageKey";

const stored = { currentPageNo: 0, data: { color: "blue" } };

describe("SurveyFactory", () => {
  it("stores intermediate results", () => {
    cy.mount(<Survey onComplete={dummy.set} storageName={storageName} />);
    cy.get('[data-name="color"] input[value="blue"]').click({
      force: true,
    });

    cy.getLocalStorage(storageName).then((result) => {
      const parsed = JSON.parse(result);
      expect(parsed).to.deep.equal(stored);
    });
  });

  it("recovers intermediate results", () => {
    cy.setLocalStorage(storageName, JSON.stringify(stored));
    cy.mount(<Survey onComplete={dummy.set} storageName={storageName} />);
    cy.get(`input[type="radio"][value="blue"]`).should("be.checked");
    cy.get(`input[type="radio"][value="green"]`).should("not.be.checked");
  });

  it("starts blank when noStorage", () => {
    cy.mount(<Survey onComplete={dummy.set} storageName={storageName} />);
    cy.get(`input[type="radio"][value="blue"]`).should("not.be.checked");
    cy.get(`input[type="radio"][value="green"]`).should("not.be.checked");
  });

  it("times survey completion", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<Survey onComplete={dummy.set} storageName={storageName} />);

    cy.get('[data-name="color"] input[value="blue"]').click({
      force: true,
    });

    cy.wait(5000);
    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall.secondsElapsed).to.be.within(5, 7);
    });
  });
});
