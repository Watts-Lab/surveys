import React from "react";
import { DemographicsShortUS } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("Demographics", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<DemographicsShortUS onComplete={dummy.set} />);
    cy.viewport("macbook-11");

    cy.get(`[data-name="birth_year"] input`).click().type("1985");

    cy.get(`[data-name="gender"] input[value="other"]`).click({ force: true });

    cy.get(`[data-name="gender_other"] input`).click().type("Other gender");

    cy.get(`[data-name="language_primary"] input`).click({ force: true });
    cy.contains("French").click({ force: true });

    cy.get(`[data-name="education_US"] input[value="2"]`).click({
      force: true,
    });

    cy.get(`[data-name="race_US"] input[value="White"]`)
      .next()
      .click({ force: true });
    cy.get(`[data-name="race_US"] input[value="Other"]`)
      .next()
      .click({ force: true });

    cy.screenshot("demographicsShortUS/screenshot", { overwrite: true });

    cy.get(`input[type="button"][value="Complete"]`).click({ force: true });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]).to.be.empty;
      expect(spyCall.responses.birth_year).to.have.string("1985");
    });
  });
});
