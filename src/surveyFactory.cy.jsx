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

const surveyJsonWithRandomization = {
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "panel",
          name: "randomPanel",
          elements: [
            {
              type: "radiogroup",
              name: "q1",
              title: "Question 1",
              choices: ["yes", "no"],
            },
            {
              type: "radiogroup",
              name: "q2",
              title: "Question 2",
              choices: ["yes", "no"],
            },
            {
              type: "radiogroup",
              name: "q3",
              title: "Question 3",
              choices: ["yes", "no"],
            },
          ],
          questionsOrder: "random",
        },
      ],
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
const SurveyWithRandomization = SurveyFactory(
  "testSurveyRandom",
  surveyJsonWithRandomization,
  scoreFunc,
  sha
);
const storageName = "testLocalStorageKey";
const randomStorageName = "testRandomStorageKey";

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

  it("stores question order in localStorage", () => {
    cy.mount(<Survey onComplete={dummy.set} storageName={storageName} />);
    
    cy.get('[data-name="color"] input[value="blue"]').click({
      force: true,
    });

    cy.wait(500);

    cy.getLocalStorage(storageName).then((result) => {
      const parsed = JSON.parse(result);
      console.log("parsed storage", parsed);
      expect(parsed).to.have.property("questionOrder");
      expect(parsed.questionOrder).to.be.an("array");
      expect(parsed.questionOrder).to.include("color");
      expect(parsed.questionOrder).to.include("openResponse");
      expect(parsed.questionOrder).to.include("name");
      expect(parsed.questionOrder.length).to.equal(3);
      
      // Check that surveyJson is stored with order preserved
      expect(parsed).to.have.property("surveyJson");
    });
  });

  it("includes question order in completion callback", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<Survey onComplete={dummy.set} storageName={storageName} />);

    cy.get('[data-name="color"] input[value="blue"]').click({
      force: true,
    });

    cy.get("form")
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log("callback with question order", spyCall);
      expect(spyCall).to.have.property("questionOrder");
      expect(spyCall.questionOrder).to.be.an("array");
      expect(spyCall.questionOrder).to.include("color");
      expect(spyCall.questionOrder).to.include("openResponse");
      expect(spyCall.questionOrder).to.include("name");
    });
  });

  it("maintains randomized question order across re-renders", () => {
    // First render - capture the order
    cy.mount(<SurveyWithRandomization onComplete={dummy.set} storageName={randomStorageName} />);
    
    let firstOrder;
    cy.getLocalStorage(randomStorageName).then((result) => {
      // Wait for initial save
      cy.wait(100);
    });
    
    cy.getLocalStorage(randomStorageName).then((result) => {
      if (result) {
        const parsed = JSON.parse(result);
        firstOrder = parsed.questionOrder;
        console.log("First render order:", firstOrder);
      }
    });

    cy.get('[data-name="q1"] input[value="yes"]').click({
      force: true,
    });

    cy.wait(500);

    cy.getLocalStorage(randomStorageName).then((result) => {
      const parsed = JSON.parse(result);
      firstOrder = parsed.questionOrder;
      console.log("Order after interaction:", firstOrder);
      expect(firstOrder).to.be.an("array");
      expect(firstOrder.length).to.equal(3);
    });

    // Unmount and remount to simulate re-render
    cy.mount(<SurveyWithRandomization onComplete={dummy.set} storageName={randomStorageName} />);

    cy.wait(500);

    // Get the visual order from the DOM
    const secondOrderFromDOM = [];
    cy.get(".sv-question.sv-row__question").each(($el) => {
      cy.wrap($el)
        .invoke("attr", "data-name")
        .then((name) => {
          secondOrderFromDOM.push(name);
        });
    });

    cy.wrap(secondOrderFromDOM).then((secondOrderFromDOM) => {
      console.log("Second render order from DOM:", secondOrderFromDOM);
      console.log("Expected order:", firstOrder);
      
      // The order should be the same as the first render
      expect(JSON.stringify(secondOrderFromDOM)).to.equal(JSON.stringify(firstOrder));
    });
  });
});
