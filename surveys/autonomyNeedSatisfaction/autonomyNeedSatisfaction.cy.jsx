import React from "react";
import { AutonomyNeedSatisfaction } from "../../src/index";

const dummy = {
  set(response) {},
};

const ids = ["sq_100", "sq_101", "sq_102", "sq_103", 
  "sq_104", "sq_105", "sq_106", "sq_107", "sq_108"];
const ids2 = ["sq_109", "sq_110", "sq_111", "sq_112", 
  "sq_113", "sq_114", "sq_115", "sq_116", "sq_117"];

describe("AutonomyNeedSatisfaction", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<AutonomyNeedSatisfaction onComplete={dummy.set} />);

    const idList = [];
    cy.get(".sv-question.sv-row__question").each(($el) => {
      cy.wrap($el).invoke("attr", "id").then(curr => {
        idList.push(curr);
      });
    })
    cy.wrap(idList).should("not.be.deep.equal", ids);
    cy.wrap(idList).should("not.be.deep.equal", ids2);

    cy.get('[data-name="chooseDirection"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="chooseContent"] input[value="8"]').click({
      force: true,
    });

    // cy.get('[data-name="sharingChoice"] input[value="2"]').click({
    //   force: true,
    // });

    // cy.get('[data-name="importantDiscussion"] input[value="2"]').click({
    //   force: true,
    // });

    cy.get('[data-name="sensitiveTopics"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="feelingFree"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="voiceOpinion"] input[value="2"]').click({
      force: true,
    });

    // cy.get('[data-name="controlledPressured"] input[value="8"]').click({
    //   force: true,
    // });

    cy.screenshot("autonomyNeedSatisfaction/screenshot", { overwrite: true });

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
      expect(spyCall["result"]["normScore"]).to.eq((0.125).toFixed(3));
      expect(spyCall["result"]["completion"]).to.eq(0.625);
      expect(spyCall["responses"]["chooseDirection"]).to.eq(2.0);
      expect(spyCall["responses"]["controlledPressured"]).to.be.undefined;
    });
  });
});
