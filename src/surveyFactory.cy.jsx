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
      choices: ["red", "blue", "green", "yellow", "purple"],
    },
    {
      type: "comment",
      name: "openResponse",
      title: "Why is it your favorite color?",
    },
    {
      type: "radiogroup",
      name: "name",
      title: "What is your favorite name?",
      choices: ["fred", "george", "ron", "percy", "bill", "ginny"],
    },
  ],
};

const sha = {
  survey: "00fa3f25c5ad64eec5f82cb1fa87124c36e02e7c",
  score: "ba0f44e4945160b5327df9edc7bd5f840443f951",
};

function scoreFunc(responses) {
  return {};
}

const dummy = {
  set(response) {},
};

const Survey = SurveyFactory("testSurvey", surveyJson, scoreFunc, sha);
const storageName = "testLocalStorageKey";

const stored = {
  currentPageNo: 0,
  data: { color: "blue", openResponse: "because it is", name: "ron" },
};

describe("SurveyFactory", () => {
  it("stores intermediate results", () => {
    cy.mount(<Survey onComplete={dummy.set} storageName={storageName} />);
    cy.get('[data-name="color"] input[value="blue"]').click({
      force: true,
    });

    cy.wait(1000);

    cy.get('[data-name="openResponse"] textarea').type("because it is");
    cy.get('[data-name="openResponse"] textarea').should(
      "have.value",
      "because it is"
    );

    cy.get('[data-name="name"] input[value="ron"]').click({
      force: true,
    });

    cy.wait(1000);

    cy.getLocalStorage(storageName).then((result) => {
      const parsed = JSON.parse(result);
      console.log("parsed", parsed);
      expect(parsed.currentPageNo).to.equal(0);
      expect(parsed).to.have.property("data");
      expect(parsed.data).to.have.property("color");
      expect(parsed.data.color).to.equal("blue");
      expect(parsed.data).to.have.property("openResponse");
      expect(parsed.data.openResponse).to.equal("because it is");
      expect(parsed.data).to.have.property("name");
      expect(parsed.data.name).to.equal("ron");
      expect(parsed).to.have.property("timeSpent");
      expect(parsed.timeSpent).to.be.greaterThan(0);
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

  it("stores the SHA", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<Survey onComplete={dummy.set} storageName={storageName} />);

    cy.get('[data-name="color"] input[value="blue"]').click({
      force: true,
    });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log("callback args", spyCall);
      expect(spyCall.surveySha).to.equal(sha.survey);
      expect(spyCall.scoreSha).to.equal(sha.score);
    });
  });

  it("times survey completion", () => {
    cy.spy(dummy, "set").as("callback");
    const startTime = Date.now();
    console.log("start time test", startTime);

    cy.mount(
      <Survey onComplete={dummy.set} storageName={storageName} render={0} />
    );

    cy.wait(1000);
    cy.get('[data-name="color"] input[value="blue"]').click({
      force: true,
    });

    cy.mount(
      <Survey onComplete={dummy.set} storageName={storageName} render={0} />
    );
    cy.get('[data-name="color"] input[value="blue"]').should("be.checked");

    cy.wait(1000);
    cy.get('[data-name="name"] input[value="ron"]').click({
      force: true,
    });

    cy.wait(1000);
    cy.mount(
      <Survey onComplete={dummy.set} storageName={storageName} render={0} />
    );

    cy.wait(1000);
    cy.mount(
      <Survey onComplete={dummy.set} storageName={storageName} render={0} />
    );

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
        const stopTime = Date.now();
        console.log(
          "stop time test",
          stopTime,
          "diff (ms)",
          stopTime - startTime
        );
      });

    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log("callback args", spyCall);
      expect(spyCall.secondsElapsed).to.be.closeTo(4, 1);
    });
  });
});
