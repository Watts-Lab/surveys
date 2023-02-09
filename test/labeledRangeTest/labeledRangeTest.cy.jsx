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

    // cy.get('[data-name="party"] input[value="Republican"]').click({
    //   force: true,
    // });

    // cy.get(
    //   '[data-name="republicanStrength"] input[value="Strong Republican"]'
    // ).click({ force: true });

    // cy.screenshot("politicalPartyUS/page1", { overwrite: true });

    // cy.get(`input[type="button"][value="Next"]`).click({ force: true });

    // cy.screenshot("politicalPartyUS/page2", { overwrite: true });

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