import React from 'react'
import { Demographics } from "../../src/index.js"

const dummy = {
  set (response) {} ,
}

describe('Demographics', () => {

  it('completes', () => {
    cy.spy(dummy, 'set').as('callback')
    cy.mount(<Demographics onComplete={dummy.set} />)

    cy.get(`[data-name="birth_year"] input`)
      .click()
      .type("1985");

    cy.get(`[data-name="gender"] input[value="male"]`)
      .click({ force: true })

    cy.get(`[data-name="marital_status"] input`)
      .click({ force: true })
    cy.contains("Married or Domestic Partnership")
      .click({ force: true })

    cy.get(`[data-name="impairment"] input[value="hearing"]`)
      .next()
      .click({ force: true })

    cy.get(`[data-name="language_primary"] input`)
      .click({ force: true })
    cy.contains("French")
      .click({ force: true })

    cy.get(`[data-name="english_written"] input[value="Very Comfortable"]`)
      .click({ force: true })

    cy.get(`[data-name="english_spoken"] input[value="Very Comfortable"]`)
      .click({ force: true })

    cy.get(`[data-name="usual_time"] input[value="Yes"]`)
      .click({ force: true })

    cy.get(`[data-name="employment_status"] input[value="Retired"]`)
      .click({ force: true })

    cy.get(`[data-name="country_reside"] input`)
      .click({ force: true })
    cy.contains("United States")
      .click({ force: true })

    cy.get(`input[type="button"][value="Next"]`)
      .click({ force: true })

    cy.get(`[data-name="education_US"] input[value="Post-college degree"]`)
      .click({ force: true })

    cy.get(`[data-name="race_US"] input[value="White"]`)
      .next()
      .click({ force: true })
    cy.get(`[data-name="race_US"] input[value="Other"]`)
      .next()
      .click({ force: true })

    cy.get(`[data-name="income_US"] input[value="$50,000-$74,999"]`)
      .click({ force: true })

    cy.get(`[data-name="political_social_US"] input[value="Moderate"]`)
      .click({ force: true })

    cy.get(`[data-name="political_fiscal_US"] input[value="Moderate"]`)
      .click({ force: true })

    cy.get(`[data-name="political_party_US"] input[value="Independent"]`)
      .click({ force: true })

    cy.get(`input[type="button"][value="Complete"]`)
      .click({ force: true })
  

    cy.get('@callback').should('have.been.called')
    cy.get('@callback').then( spy => {
      const spyCall = spy.getCall(-1).args[0]
      console.log(spyCall)
      expect(spyCall['result']).to.be.empty
      expect(spyCall.responses.birth_year).to.have.string("1985")
    })


  })
  
})