import React from "react";
import { AwarenessMonitoringGrowth } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("AwarenessMonitoringGrowth", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<AwarenessMonitoringGrowth onComplete={dummy.set} />);
    cy.viewport("macbook-11");

    // awareness
    cy.get('[data-name="innermostThoughts"] input[value="6"]').click({
      force: true,
    });

    cy.get('[data-name="othersThinkOfMe"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="goingOnAroundMe"] input[value="6"]').click({
      force: true,
    });

    // monitoring
    cy.get('[data-name="canAdjust"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="troubleChanging"] input[value="6"]').click({
      force: true,
    });

    cy.get('[data-name="emotionalIntuition"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="tellInappropriate"] input[value="2"]').click({
      force: true,
    });

    // growth
    cy.get('[data-name="fixedIntelligence"] input[value="2"]').click({
      force: true,
    });

    cy.get('[data-name="onlyLearnNewThings"] input[value="2"]').click({
      force: true,
    });

    cy.screenshot("awarenessMonitoringGrowth/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["normSelfAwareness"]).to.eq(
        (0.61111).toFixed(3)
      );
      expect(spyCall["result"]["normSelfMonitoring"]).to.eq(
        (0.16666).toFixed(3)
      );
      expect(spyCall["result"]["normGrowthMindset"]).to.eq(
        (0.16666).toFixed(3)
      );
    });
  });
});
