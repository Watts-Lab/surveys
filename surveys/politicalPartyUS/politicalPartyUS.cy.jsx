import React from "react";
import { PoliticalPartyUS } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("PoliticaPartyUS", () => {
  it("completesRepublican", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<PoliticalPartyUS onComplete={dummy.set} />);

    cy.get('[data-name="party"] input[value="Republican"]').click({
      force: true,
    });

    cy.get(
      '[data-name="republicanStrength"] input[value="Strong Republican"]'
    ).click({ force: true });

    cy.screenshot("politicalPartyUS/page1", { overwrite: true });

    cy.get(`input[type="button"][value="Next"]`).click({ force: true });

    cy.screenshot("politicalPartyUS/page2", { overwrite: true });

    cy.get(`input[type="button"][value="Complete"]`).click({ force: true });

    cy.get(".sv-body").should("not.exist");
    
    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["party"]).to.eq("Republican");
      expect(spyCall["result"]["normPosition"]).to.eq((1).toFixed(3));
      expect(spyCall["result"]["normImportance"]).to.eq(0.5);
      expect(spyCall["result"]["position"]).to.eq(3);
    });
  });

  it("completesOther", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<PoliticalPartyUS onComplete={dummy.set} />);

    cy.get('[data-name="party"] input[value="Other"]').click({
      force: true,
    });

    cy.get('[data-name="partyOther"] input').click().type("Fancy dress party");

    cy.screenshot("politicalPartyUS/page1_other", { overwrite: true });

    cy.get(`input[type="button"][value="Next"]`).click({ force: true });

    cy.wait(1000);
    
    cy.get(`input[type="button"][value="Complete"]`).click({ force: true });

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["party"]).to.eq("Other");
      expect(spyCall["result"]["normPosition"]).to.be.undefined;
      expect(spyCall["result"]["position"]).to.be.undefined;
      expect(spyCall["result"]["normImportance"]).to.eq(0.5);
    });
  });
});
