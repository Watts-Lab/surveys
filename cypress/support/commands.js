// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('checkRandomization', (defaultList) => {
        const defaultSet = new Set(defaultList);
        // check that the order of the questions is randomized
        const actualList = [];
        cy.get(".sv-question.sv-row__question").each(($el) => {
          cy.wrap($el)
            .invoke("attr", "data-name")
            .then((curr) => {
              actualList.push(curr);
            });
        });
    
        cy.wrap(actualList).then((actualList) => {
          const questions = actualList.slice(1); // slice to remove the prompt
          const actualSet = new Set(questions); // convert to set to allow comparison without order
          console.log("Expect set:", actualSet);
          console.log("to equal set:", defaultSet);
          expect(actualSet).to.be.deep.equal(defaultSet); // check that all expected questions are present
          expect(questions).to.have.length(defaultList.length); // check that there are no extra questions
          expect(questions).to.not.be.deep.equal(defaultList); // check that the order is randomized
        });
})