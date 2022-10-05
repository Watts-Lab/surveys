import React from 'react'
import { TeamViability } from "../../src/index.js"

describe('TeamViability', () => {
  function callback(response) {
    console.log(response)
  }
  it('playground', () => {
    cy.mount(<TeamViability onComplete={callback} />)
  })
})