import React from 'react'
import { DiscussionQualityControl } from "../../src/index.js"

describe('TeamViability', () => {
  function callback(response) {
    console.log(response)
  }
  it('playground', () => {
    cy.mount(<DiscussionQualityControl onComplete={callback} />)
  })
})