import React from "react";
import { BipartisanshipUS } from "../../src/index";

const dummy = {
  set(response) {},
};

const dataNames = [
  "everydayPeople",
  "electedOfficials",
  "bipartisanOpportunity",
];

describe("BipartisanshipUS", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<BipartisanshipUS onComplete={dummy.set} />);
    cy.viewport("macbook-11");
    cy.checkRandomization(dataNames);

    cy.get('[data-name="everydayPeople"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="electedOfficials"] input[value="1"]').click({
      force: true,
    });

    cy.get('[data-name="bipartisanOpportunity"] input[value="0"]').click({
      force: true,
    });

    cy.screenshot("bipartisanshipUS/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["everydayPeople"]).to.eq((0.5).toFixed(3));
      expect(spyCall["result"]["electedOfficials"]).to.eq((0.25).toFixed(3));
      expect(spyCall["result"]["bipartisanOpportunity"]).to.eq((0).toFixed(3));
      expect(spyCall["result"]["overallBipartisanship"]).to.eq(
        (0.25).toFixed(3)
      );
    });
  });
});
