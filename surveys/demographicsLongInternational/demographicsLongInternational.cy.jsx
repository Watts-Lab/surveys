import React from "react";
import { DemographicsLongInternational } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("Demographics", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<DemographicsLongInternational onComplete={dummy.set} />);
    cy.viewport("macbook-11");

    cy.get(`[data-name="birth_year"] input`).click().type("1985");

    cy.get(`[data-name="gender"] input[value="other"]`).click({ force: true });

    cy.get(`[data-name="gender_other"] input`).click().type("Other gender");

    cy.get(`[data-name="marital_status"] input`).click({ force: true });

    cy.contains("Married or Domestic Partnership").click({ force: true });

    cy.get(`[data-name="language_primary"] input`).click({ force: true });
    cy.contains("French").click({ force: true });

    cy.get(`[data-name="english_written"] input[value="4"]`).click({
      force: true,
    });

    cy.get(`[data-name="english_spoken"] input[value="4"]`).click({
      force: true,
    });

    cy.get(`[data-name="employment_status"] input[value="employed"]`).click({
      force: true,
    });

    cy.get(`[data-name="country_reside"] input`).click({ force: true });
    cy.contains("United States").click({ force: true });

    cy.screenshot("screenshotGeneral", { overwrite: true });

    cy.get(`input[type="button"][value="Next"]`).click({ force: true });

    cy.get(`[data-name="education_US"] input[value="2"]`).click({
      force: true,
    });

    cy.get(`[data-name="race_US"] input[value="White"]`)
      .next()
      .click({ force: true });
    cy.get(`[data-name="race_US"] input[value="Other"]`)
      .next()
      .click({ force: true });

    cy.get(`[data-name="income_US"] input[value="$50,000-$74,999"]`).click({
      force: true,
    });

    cy.screenshot("screenshotUSA", { overwrite: true });

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

  it("Completes Other Country", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<DemographicsLongInternational onComplete={dummy.set} />);
    cy.viewport("macbook-11");

    cy.get(`[data-name="birth_year"] input`).click().type("1985");

    cy.get(`[data-name="gender"] input[value="other"]`).click({ force: true });

    cy.get(`[data-name="gender_other"] input`).click().type("Other gender");

    cy.get(`[data-name="marital_status"] input`).click({ force: true });

    cy.contains("Married or Domestic Partnership").click({ force: true });

    cy.get(`[data-name="language_primary"] input`).click({ force: true });
    cy.contains("French").click({ force: true });

    cy.get(`[data-name="english_written"] input[value="4"]`).click({
      force: true,
    });

    cy.get(`[data-name="english_spoken"] input[value="4"]`).click({
      force: true,
    });

    cy.get(`[data-name="employment_status"] input[value="employed"]`).click({
      force: true,
    });

    cy.get(`[data-name="country_reside"] input`).click({ force: true });
    cy.contains("Iran").click({ force: true });

    cy.get(`input[type="button"][value="Next"]`).click({ force: true });

    cy.get(`[data-name="education_iran"] input[value="2"]`).click({
      force: true,
    });

    cy.get(
      `[data-name="ethnicity_iran"] input[value="Middle Eastern or North African"]`
    )
      .next()
      .click({ force: true });

    cy.get(`[data-name="income_iran"] input[value="Less than 135,600,000"]`).click({
      force: true,
    });

    cy.screenshot("demographicsLongInternationalscreenshotIran", {
      overwrite: true,
    });

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
