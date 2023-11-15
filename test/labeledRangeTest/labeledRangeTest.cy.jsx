import React from "react";

import SurveyFactory from "../../src/surveyFactory.jsx";
import labeledRangeTestJson from "./labeledRangeTest.json";

const scoreFunc = (responses) => console.log(responses);
const sha = "Real stupidity beats artificial intelligence every time.";
const LabeledRangeTest = SurveyFactory(
  "labeledRangeTest",
  labeledRangeTestJson,
  scoreFunc,
  sha
);

const dummy = {
  set(response) {},
};

describe("LabeledRangeTest", () => {
  it("is styled properly", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<LabeledRangeTest onComplete={dummy.set} />);
    cy.viewport('macbook-11');

    /* test if thumb invisible before click moz 
    //it("test thumb visibility before click moz", { browser: "firefox" }), () => {
      cy.get(".slider", { log: false }).within(($el) => {
        cy.window().then((win) => {
          cy.get(win.getComputedStyle($el[0], "::-moz-range-thumb")).
          should("have.attr", "visibility", "hidden") 
        })
      });
    //} */

    /* test if thumb invisible before click webkit 
    it("test thumb visibility before click webkit", { browser: "chrome" }), () => {
      cy.get(".slider", { log: false }).within(($el) => {
        cy.window().then((win) => {
          cy.get(win.getComputedStyle($el[0], "::-webkit-slider-thumb")).
          should("not.be.visible", { log: false })
        })
      });
    } */
     
    cy.screenshot("labeledRangeTest/beforeClick", { overwrite: true });

    cy.get("#sq_100i").click("center", { force: true });
    cy.get("#sq_101i").click("center", { force: true });
    cy.get("#sq_102i").click("center", { force: true });

    cy.screenshot("labeledRangeTest/afterClick", { overwrite: true });

    /*  it("test thumb visibility after click moz", { browser: "firefox" }), () => {
      cy.get(".slider", { log: false }).within(($el) => {
        cy.window().then((win) => {
          cy.get(win.getComputedStyle($el[0], "::-moz-range-thumb")).
          should("be.visible", { log: false })
        })
      });
  //  } */

    // cy.get(`input[type="button"][value="Complete"]`).click({ force: true });

    // cy.get("@callback").should("have.been.called");
    // cy.get("@callback").then((spy) => {
    //   const spyCall = spy.getCall(-1).args[0];
    //   console.log(spyCall);
    //   expect(spyCall["result"]["party"]).to.eq("Republican");
    //   expect(spyCall["result"]["normPosition"]).to.eq(1);
    //   expect(spyCall["result"]["normImportance"]).to.eq(0.5);
    // });
  });
});
