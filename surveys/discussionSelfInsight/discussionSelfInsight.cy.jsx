import React from "react";
// import { ListeningQualityOwn } from "@watts-lab/surveys";
import { DiscussionSelfInsight } from "../../src/index";
const dummy = {
  set(response) {},
};

const ids = ["sq_100", "sq_101", "sq_102", "sq_103", 
  "sq_104", "sq_105"];
const ids2 = ["sq_106", "sq_107", "sq_108", "sq_109", 
  "sq_110", "sq_111"];

describe("DiscussionSelfInsight", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<DiscussionSelfInsight onComplete={dummy.set} />);

    const idList = [];
    cy.get(".sv-question.sv-row__question").each(($el) => {
      cy.wrap($el).invoke("attr", "id").then(curr => {
        idList.push(curr);
      });
    })
    cy.wrap(idList).should("not.be.deep.equal", ids);
    cy.wrap(idList).should("not.be.deep.equal", ids2);

    cy.get('[data-name="understandSelf"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="thinkDeeply"] input[value="4"]').click({
      force: true,
    });

    cy.get('[data-name="newInsights"] input[value="4"]').click({
      force: true,
    });

    // Omit to test ability to handle incomplete surveys
    // cy.get('[data-name="reflectOnAttitudes"] input[value="1"]').click({
    //   force: true,
    // });

    cy.get('[data-name="thinkDifferently"] input[value="1"]').click({
      force: true,
    });

    // cy.screenshot("discussionSelfInsight/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["rawScore"]).to.eq((3.25).toFixed(3));
      expect(spyCall["result"]["normScore"]).to.eq((0.375).toFixed(3));
      expect(spyCall["result"]["completion"]).to.eq(0.8);
      expect(spyCall["responses"]["thinkDeeply"]).to.eq(4);
    });
  });
});
