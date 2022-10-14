import React from 'react'
import { ListeningQualityPartner } from "../../src/index.js"

const dummy = {
  set (response) {} ,
}

describe('ListeningQualityPartner', () => {

    it('completes', () => {
      cy.spy(dummy, 'set').as('callback')
      cy.mount(<ListeningQualityPartner onComplete={dummy.set} />)
  
      cy.get('[data-responsive-title="2"] input').click({
        multiple: true,
        timeout: 6000,
        force: true,
      });

      cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

      cy.get('@callback').should('have.been.called')
      cy.get('@callback').then( spy => {
        const spyCall = spy.getCall(-1).args[0]
        console.log(spyCall)
        expect(spyCall['result']['rawScore']).to.eq(20)
      })
  
  
    })
    
})