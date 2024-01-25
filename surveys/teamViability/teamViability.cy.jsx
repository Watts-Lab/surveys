import React from "react";
import { TeamViability } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("TeamViability", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<TeamViability onComplete={dummy.set} />);
    cy.viewport("macbook-11");

    cy.get('[data-name="capableUnit"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="futureSuccess"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="fallingApart"] input[value="-2"]').click({
      force: true,
    });

    // Leave out to test that we can handle missing data
    // cy.get('[data-name="welcomeReuinion"] input[value="2"]').click({
    //   force: true,
    // });

    // cy.get('[data-name="persistDespiteObstacles"] input[value="2"]').click({
    //   force: true,
    // });

    cy.get('[data-name="succeedDespiteDislike"] input[value="2"]').click({
      force: true,
    });

    cy.screenshot("teamViability/screenshot", {
      overwrite: true,
    });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["rawScore"]).to.eq((2).toFixed(3));
      expect(spyCall["result"]["normScore"]).to.eq((0.833).toFixed(3));
      expect(spyCall["result"]["completion"]).to.be.closeTo(0.66, 0.01);
      expect(spyCall["responses"]["persistDespiteObstacles"]).to.be.undefined;
      expect(spyCall["responses"]["futureSuccess"]).to.eq(2);
    });
  });
});
