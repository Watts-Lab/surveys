import React from "react";
import { LonelinessSingleItem } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("Demographics", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<LonelinessSingleItem onComplete={dummy.set} />);

    cy.get(`[data-name="loneliness"] input[value="2"]`).click({ force: true });

    // cy.screenshot("lonelinessSingleItem/screenshot", { overwrite: true });

    // submit
    cy.get(`input[type="button"][value="Complete"]`).click({ force: true });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall.result.normScore).to.eq(0.2);
      expect(spyCall.responses.loneliness).to.eq(2);
    });
  });
});
