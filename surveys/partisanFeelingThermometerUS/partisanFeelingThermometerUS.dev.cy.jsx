import React from "react";
import { PartisanFeelingThermometerUS } from "../../src/index";

describe("PartisanFeelingThermometerUS", () => {
  it("loads", () => {
    cy.viewport("macbook-11");
    cy.mount(<PartisanFeelingThermometerUS />);
    cy.viewport("macbook-11");
  });
});
