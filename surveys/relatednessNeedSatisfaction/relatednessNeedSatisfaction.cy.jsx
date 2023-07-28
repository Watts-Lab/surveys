import React from "react";
import { RelatednessNeedSatisfaction } from "../../src/index";

const dummy = {
  set(response) {},
};

const ids = ["sq_100", "sq_101", "sq_102", "sq_103"];
const ids2 = ["sq_104", "sq_105", "sq_106", "sq_107"];

describe("RelatenessNeedSatisfaction", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<RelatednessNeedSatisfaction onComplete={dummy.set} />);

    const idList = [];
    cy.get(".sv-question.sv-row__question").each(($el) => {
      cy.wrap($el).invoke("attr", "id").then(curr => {
        idList.push(curr);
      });
    })
    cy.wrap(idList).should("not.be.deep.equal", ids);
    cy.wrap(idList).should("not.be.deep.equal", ids2);

    cy.get('[data-name="closeness"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="distance"] input[value="8"]').click({
      force: true,
    });

    // Hide to make sure we can handle missing values
    // cy.get('[data-name="caredAbout"] input[value="7"]').click({
    //   force: true,
    // });

    cy.screenshot("relatednessNeedSatisfaction/screenshot", {
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
      expect(spyCall["result"]["normScore"]).to.eq((0.125).toFixed(3));
      expect(spyCall["result"]["completion"]).to.be.closeTo(0.66, 0.01);
      expect(spyCall["responses"]["distance"]).to.eq(8);
      expect(spyCall["responses"]["caredAbout"]).to.be.undefined;
    });
  });
});
