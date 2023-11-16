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

    cy.get("body")
      .then(($body) => {
        if ($body.find(`div[data-name="republicanTemp"]`).length) {
          console.log("Reloading to get democrat prompt first");
          cy.reload();
          cy.mount(<PartisanFeelingThermometerUS onComplete={dummy.set} />);
        }
      })
      .then(() => {
        cy.contains("How would you rate Democrats");
        cy.get("input[type=range]").invoke("val", 75).click({ force: true });
        cy.screenshot("lonelinessSingleItem/screenshot_page1", {
          overwrite: true,
        });
        cy.get(`input[type="button"][value="Next"]`).click({ force: true });

        cy.contains("How would you rate Republicans");
        cy.get("input[type=range]").invoke("val", 25).click({ force: true });
        cy.screenshot("lonelinessSingleItem/screenshot_page2", {
          overwrite: true,
        });
        cy.get(`input[type="button"][value="Complete"]`).click({ force: true });
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
  });
});
