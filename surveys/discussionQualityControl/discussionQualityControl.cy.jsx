import React from 'react'
import { DiscussionQualityControl } from "../../src/index.js"

const dummy = {
  set (response) {} ,
}

const loremIpsum = "lorem ipsum dolor sit amet"

describe('TeamViability', () => {

  it('completes', () => {
    cy.spy(dummy, 'set').as('callback')
    cy.mount(<DiscussionQualityControl onComplete={dummy.set} />)

    cy.get('[data-responsive-title="Disagree"] input').click({
      multiple: true,
      timeout: 6000,
      force: true,
    });

    cy.get('[data-name="adequateCompensation"] input[value="underpaid"]')
      .click({ force: true });

    cy.get('[data-name="adequateTime"] input[value="adequate"]')
      .click({ force: true });

    cy.get('[data-name="videoQuality"] input[value="2"]')
      .click({ force: true });

    cy.get('[data-name="textExpansion"] input')
      .click()
      .type(loremIpsum);

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });
    
    cy.get('@callback').should('have.been.called')
    cy.get('@callback').then( spy => {
      const spyCall = spy.getCall(-1).args[0]
      console.log(spyCall)
      expect(spyCall['result']).to.be.empty
      expect(spyCall.responses.textExpansion).to.have.string(loremIpsum)

    })


  })
  
})