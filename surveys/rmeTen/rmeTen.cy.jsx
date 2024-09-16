import React from "react";
import { RmeTen } from "../../src/index";

const dummy = {
  set(response) {},
};

describe("RMETTen", () => {
  it("completes the survey", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<RmeTen onComplete={dummy.set} />);
    cy.viewport("macbook-11");

    // incorrect
    cy.get('[data-name="rme_item_4"] input[value="amused"]').click({
      force: true,
    });
    cy.screenshot(`rmeTen/screenshot_1`, {
      overwrite: true,
    });
    cy.get('input[type="button"][value="Next"]').click({ force: true });

    // correct
    cy.get('[data-name="rme_item_6"] input[value="fantasizing"]').click({
      force: true,
    });
    cy.screenshot(`rmeTen/screenshot_2`, {
      overwrite: true,
    });
    cy.get('input[type="button"][value="Next"]').click({ force: true });

    // incorrect
    cy.get('[data-name="rme_item_11"] input[value="terrified"]').click({
      force: true,
    });
    cy.screenshot(`rmeTen/screenshot_3`, {
      overwrite: true,
    });
    cy.get('input[type="button"][value="Next"]').click({ force: true });

    // correct
    cy.get('[data-name="rme_item_15"] input[value="contemplative"]').click({
      force: true,
    });
    cy.screenshot(`rmeTen/screenshot_4`, {
      overwrite: true,
    });
    cy.get('input[type="button"][value="Next"]').click({ force: true });

    // incorrect
    cy.get('[data-name="rme_item_17"] input[value="affectionate"]').click({
      force: true,
    });
    cy.screenshot(`rmeTen/screenshot_5`, {
      overwrite: true,
    });
    cy.get('input[type="button"][value="Next"]').click({ force: true });

    // correct
    cy.get('[data-name="rme_item_22"] input[value="preoccupied"]').click({
      force: true,
    });
    cy.screenshot(`rmeTen/screenshot_6`, {
      overwrite: true,
    });
    cy.get('input[type="button"][value="Next"]').click({ force: true });

    // correct
    cy.get('[data-name="rme_item_24"] input[value="pensive"]').click({
      force: true,
    });
    cy.screenshot(`rmeTen/screenshot_7`, {
      overwrite: true,
    });
    cy.get('input[type="button"][value="Next"]').click({ force: true });

    // incorrect
    cy.get('[data-name="rme_item_27"] input[value="joking"]').click({
      force: true,
    });
    cy.screenshot(`rmeTen/screenshot_8`, {
      overwrite: true,
    });
    cy.get('input[type="button"][value="Next"]').click({ force: true });

    // correct
    cy.get('[data-name="rme_item_28"] input[value="interested"]').click({
      force: true,
    });
    cy.screenshot(`rmeTen/screenshot_9`, {
      overwrite: true,
    });
    cy.get('input[type="button"][value="Next"]').click({ force: true });

    // correct
    cy.get('[data-name="rme_item_29"] input[value="reflective"]').click({
      force: true,
    });
    cy.screenshot(`rmeTen/screenshot_10`, {
      overwrite: true,
    });

    // final button
    cy.get('input[type="button"][value="Complete"]').click({ force: true });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["normScore"]).to.eq((0.6).toFixed(3));
      expect(spyCall["responses"]["rme_item_24"]).to.eq("pensive");
    });
  });
});
