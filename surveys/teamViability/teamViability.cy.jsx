import React from "react";
import { TeamViability } from "../../src/index";

const dummy = {
  set(response) {},
};

const ids = ["sq_100", "sq_101", "sq_102", "sq_103", 
  "sq_104", "sq_105", "sq_106"];
const ids2 = ["sq_107", "sq_108", "sq_109", "sq_110", 
  "sq_111", "sq_112", "sq_113"];

describe("TeamViability", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<TeamViability onComplete={dummy.set} />);

    const idList = [];
    cy.get(".sv-question.sv-row__question").each(($el) => {
      cy.wrap($el).invoke("attr", "id").then(curr => {
        idList.push(curr);
      });
    })
    cy.wrap(idList).should("not.be.deep.equal", ids);
    cy.wrap(idList).should("not.be.deep.equal", ids2);

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
