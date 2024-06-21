import React from "react";
import { PartisanFeelingThermometerUS } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("PartisanFeelingThermometerUS", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.viewport("macbook-11");
    cy.mount(<PartisanFeelingThermometerUS onComplete={dummy.set} />);
    cy.viewport("macbook-11");

    cy.get('[data-name="republicanTemp"] input[type=range]')
      .invoke("val", 25)
      .click();

    cy.get('[data-name="democratTemp"] input[type=range]')
      .invoke("val", 35)
      .click();

    cy.screenshot("partisanFeelingThermometerUS/screenshot", {
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
      expect(spyCall["responses"]["republicanTemp"]).to.eq(25);
      expect(spyCall["responses"]["democratTemp"]).to.eq(35);
      expect(spyCall["result"]["normRepublicanTemp"]).to.eq((0.25).toFixed(3));
      expect(spyCall["result"]["normDemocratTemp"]).to.eq((0.35).toFixed(3));
    });
  });
});
