import React from "react";
import { DemographicsLongInternational } from "../../src/index";
import { getContainerEl } from "cypress/react";
import ReactDom from "react-dom";

const dummy = {
  set(response) {},
};

import demographicsData from "./demographicsLongInternational.json";

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

    cy.get(
      `[data-name="employment_industry"] input[value="Agriculture, Forestry, Fishing, and Hunting"]`
    ).click({
      force: true,
    });

    cy.get(`[data-name="job_title"] input`).click().type("Survey Developer");

    cy.get(`[data-name="country_reside"] input`).click({ force: true });
    cy.contains("United States").click({ force: true });

    cy.screenshot("./demographicsLongInternational/screenshotGeneral", {
      overwrite: true,
    });

    cy.get(`input[type="button"][value="Next"]`).click({ force: true });

    cy.get(`[data-name="education_US"] input[value="Doctorate"]`).click({
      force: true,
    });

    cy.get(`[data-name="latin_US"] input[value="Yes"]`)
      .next()
      .click({ force: true });

    cy.get(`[data-name="zipcode_US"] input`).click().type("52066");

    cy.get(`[data-name="race_US"] input[value="White"]`)
      .next()
      .click({ force: true });
    cy.get(`[data-name="race_US"] input[value="Other"]`)
      .next()
      .click({ force: true });

    cy.get(`[data-name="income_US"] input[value="$50,000-$74,999"]`).click({
      force: true,
    });

    cy.screenshot("./demographicsLongInternational/screenshotUSA", {
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

  it("Completes Other Countries", () => {
    const country_list = demographicsData.pages[0].elements
      .find((element) => element.name === "country_reside")
      .choices.map((choice) => choice.value);

    const countrySalaries = {};
    for (const country of country_list) {
      const country_code = country
        .toLowerCase()
        .replace(new RegExp(" ", "g"), "_")
        .replace(",", "_")
        .replace("(", "_")
        .replace(")", "_");
      let salaryFound = false;
      for (let i = 1; i < demographicsData.pages.length; i++) {
        const page = demographicsData.pages[i];
        const incomeElement = page.elements.find(
          (element) => element.name === `income_${country_code}`
        );
        if (incomeElement) {
          const salary = incomeElement.choices[0];
          countrySalaries[country_code] = salary;
          salaryFound = true;
          break;
        }
      }
      if (!salaryFound) {
        console.warn(`Salary data not found for country: ${country_code}`);
      }
    }

    cy.spy(dummy, "set").as("callback");

    country_list.slice(0, 10).forEach((country) => {
      const country_code = country
        .toLowerCase()
        .replace(new RegExp(" ", "g"), "_")
        .replace(",", "_")
        .replace("(", "_")
        .replace(")", "_");
      console.log(country, country_code);

      cy.mount(
        <DemographicsLongInternational
          storageName={country_code}
          onComplete={dummy.set}
        />
      );

      // Proceed with filling out the survey
      cy.viewport("macbook-11");
      cy.get(`[data-name="birth_year"] input`).click().type("1985");
      cy.get(`[data-name="gender"] input[value="other"]`).click({
        force: true,
      });
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
      cy.get(`[data-name="country_reside"]`)
        .contains(country)
        .click({ force: true });

      cy.get(`input[type="button"][value="Next"]`).click({ force: true });
      cy.get(
        `[data-name="education_${country_code}"] input[value="Other (please specify)"]`
      ).click({
        force: true,
      });
      cy.get(`[data-name="other_education_${country_code}"] input`)
        .click()
        .type("Survey Developer");
      cy.get(`[data-name="zipcode_${country_code}"] input`)
        .click()
        .type("82919123");
      cy.get(
        `[data-name="ethnicity_${country_code}"] input[value="Middle Eastern or North African"]`
      )
        .next()
        .click({ force: true });
      cy.get(
        `[data-name="income_${country_code}"] input[value="${countrySalaries[country_code]}"]`
      ).click({
        force: true,
      });
      cy.get(`input[type="button"][value="Complete"]`).click({ force: true });

      cy.wait(100);
    });

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
