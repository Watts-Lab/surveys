import React from "react";
//import { AutonomyNeedSatisfaction } from "@watts-lab/surveys";
import { AutonomyNeedSatisfaction } from "../../src/index";

const dummy = {
  set(response) {},
};

const keyWords = ["direction", "content", "choice", "important", 
              "sensitive", "free", "voiced", "pressured"];

describe("AutonomyNeedSatisfaction", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<AutonomyNeedSatisfaction onComplete={dummy.set} />);

    //cy.get(".sv-row.sv-clearfix").click();
/*    var index = 0;
    var flag = false;
    cy.get("#sp_101_content").children().each(($el) => {
      if ($el.children().not.is(keyWords[index])) {
        return true;
      }
    //  expect($el.children()).to.not.contain(keyWords[index])
    //  cy.get($el).children().should("not.contain", keyWords[index])
      index ++;
    }); */
    var same = false;
    expect((same) => {
      cy.get("#sp_101_content").children().each(($el) => {
        if ($el.children().not.is(keyWords[index])) {
          return false;
        }
        index ++;
      });
      return true;
    }).equal(true);

 /*   var i = 0;
    Cypress.Commands.add("checkRandom", (panel) => {
      cy.get(panel).children().each(($el) => {
        if($el.children().not.contain(keyWords[i])) {
          return true;
        } 
        i++;
      })
      return false;
    })

    cy.checkRandom("#sp_101_content").should("be.equal", "false"); */

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
      expect(spyCall["result"]["rawScore"]).to.eq(2);
      expect(spyCall["result"]["normScore"]).to.eq(0.125);
      expect(spyCall["result"]["completion"]).to.eq(0.625);
      expect(spyCall["responses"]["chooseDirection"]).to.eq(2);
      expect(spyCall["responses"]["controlledPressured"]).to.be.undefined;
    });
  });
});
