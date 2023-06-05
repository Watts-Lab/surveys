import React from "react";
import { PartisanFeelingThermometerUS } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("PartisanFeelingThermometerUS", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<PartisanFeelingThermometerUS onComplete={dummy.set} />);

  //  if (cy.wrap(".sv-question.sv-row__question").invoke("attr", "id") === "sq_102") {
  //    cy.reload();
  //  }

    cy.get("input[type=range]").invoke("val", 25).click({ force: true });

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
    expect(spyCall.result.normDemocratTemp).to.eq(0.25);
    expect(spyCall.result.normScore).to.eq(0);
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
