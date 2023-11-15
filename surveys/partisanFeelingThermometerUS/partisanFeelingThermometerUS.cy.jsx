import React from "react";
import { PartisanFeelingThermometerUS } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("PartisanFeelingThermometerUS", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<PartisanFeelingThermometerUS onComplete={dummy.set} />);
    cy.viewport('macbook-11');

    // check randomization by reloading until it gets a democrat prompt first
    if (cy.get("#sq_102_ariaTitle > .sv-string-viewer").invoke("text").then(
      (text) => {
        if (text === "How would you rate Republicans?"){
          cy.reload();
          cy.mount(<PartisanFeelingThermometerUS onComplete={dummy.set} />)
        }
      })
    ) 

    cy.get("input[type=range]").invoke("val", 75).click({ force: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Next"]')).click({ force: true });
      });

    cy.get("input[type=range]").invoke("val", 25).click({ force: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");
    
    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
    expect(spyCall.result.normRepublicanTemp).to.eq(0.25);
    expect(spyCall.result.normDemocratTemp).to.eq(0.75);
    expect(spyCall.result.rawScore).to.eq(-0.5);
    expect(spyCall.result.normScore).to.eq(0.5);
    });

    // TODO: fix these assertions
    // cy.get("@callback").should("have.been.called");
    // cy.get("@callback").then((spy) => {
    //   const spyCall = spy.getCall(-1).args[0];
    //   console.log(spyCall);
    //   // expect(spyCall["result"]["rawScore"]).to.eq(3);
    //   // expect(spyCall["result"]["normScore"]).to.eq(1);
    //   // expect(spyCall["result"]["completion"]).to.eq(0.6);
    //   expect(spyCall["responses"]["republicanTemp"]).to.eq(25);
    //   expect(spyCall["responses"]["democratTemp"]).to.eq(25);
    // });
  });
});
