# Standardized Survey Library

Social science surveys as javascript components

[![Surveys](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/z7p66s&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/z7p66s/runs)
[![npm version](https://badge.fury.io/js/@watts-lab%2Fsurveys.svg)](https://badge.fury.io/js/@watts-lab%2Fsurveys)

## Purpose

This repository is a centralized location for documenting, versioning, and sharing surveys to be used across projects within the CSS lab and the wider social science community.

To the extent possible, the lab's surveys are stored in this repository to enable reuse across projects while maintaining consistency. This repository provides the implementation of record for each survey, including the questions asked, relevant stimuli (such as RME images), correct answers when applicable (such as in the CRT), and code for aggregating responses into a score. This ensures consistency between different uses of the same survey, so that results from one use of the survey can be compared with results from other uses.

## Installation

```
npm i @watts-lab/surveys
```

## Usage

Import the surveys you wish to use into your react page/component by name.

```js
import { TeamViability, ExampleSurvey } from "@watts-lab/surveys";
```

Supply a callback function which takes the scored survey response as an argument,
and processes/stores the survey response appropriately:

```js
const onCompleteCallback = (record) => {
  console.log(record);
};
```

You can then use the survey as a react component:

```jsx
<TeamViability onComplete={onCompleteCallback}>
```

## Development

New surveys can be added in the `surveys/` folder. Each survey has its own subfolder with a descriptive, easy-to-read (lower camelCase) name (e.g. `surveys/superSpecialSurvey/`)

### Survey file

Create a SurveyJS `.json` file with the same name as the directory (_e.g._ `superSpecialSurvey/superSpecialSurvey.json`) following the surveyJS format.

You can use the online SurveyJS visual editor if you would like: https://surveyjs.io/create-free-survey

Question names should be a one-word camelCase descriptor of the question that can be included directly in a json file.

### Scoring function

To replicate a survey, we need to include not only the questions and scales, but also the function that aggregates the survey into a particular score.

This function lives in a file with the same name as the directory and ending in `.score.js` (_e.g._ `superSpecialSurvey/superSpecialSurvey.score.js`).

The function should be called `scoreFunc` and should accept as an argument the dictionary of responses that your surveyJS survey returns. It should return a dictionary containing the aggregated result of the survey.

For example:

```js
// superSpecialSurvey.score.js

export default function scoreFunc(responses) {
  const minScore = 0;
  const maxScore = 10;

  const rawScore = parseInt(responses["Q1"]) + parseInt(responses["Q2"]);

  const result = {
    rawScore: rawScore,
    normScore: (rawScore - minScore) / (maxScore - minScore),
  };
  return result;
}
```

This result will be included in a dictionary with the raw responses, for example:

```js
record = {
  responses: {
    Q1: 1,
    Q2: 5,
  },
  result: {
    rawScore: 6,
    normScore: 0.6,
  },
};
```

### Documentation

A `README.md` file should be present in the directory, indicating:

- Survey purpose
- Expected behavior
- Design rationale

Surveys should be documented with the source of the survey instrument itself, whether it be a publication from the literature or an internal survey development process. The documentation should cite other publications that have used the particular survey instrument.

For internally developed surveys, the documentation gives a summary of the purpose of the survey, how it was developed, and how it was validated. The documentation should be written in language that can be used verbatim e.g. in the supplement to a paper using the survey, to describe its use.

The survey folder should also contain a `references.bib` file containing bibtex citations for survey source materials.

### Packaging

Once these files are complete, you will need to export the survey from the library.
Modify `src/index.js` to assemble the survey using the `SurveyFactory` method and export the result, giving it an upper CamelCase (PascalCase) name.

```js
//src/index.js

import SurveyFactory from "./surveyFactory.jsx"

const ExampleSurvey = await SurveyFactory('exampleSurvey');
...
const SuperSpecialSurvey = await SurveyFactory('superSpecialSurvey');

export {
    ExampleSurvey,
    ...
    SuperSpecialSurvey
}

```

If you see an "EACCES permission denied" error during the linking serp of build, see: https://stackoverflow.com/a/55274930/6361632

### Testing

A test file accompanies each survey to ensure that it is implemented as expected and that the score function works correctly. This file should be called `superSpecialSurvey/superSpecialSurvey.cy.jsx`.
This test file provides a [Cypress](https://docs.cypress.io/guides/overview/why-cypress) test definition that completes the form and checks that the callback function is called properly.

I strongly recommend using existing survey tests as examples in constructing your own. For example:

```jsx
// superSpecialSurvey.cy.js

import React from "react";
import { SuperSpecialSurvey } from "../../src/index.js";

const dummy = {
  set(response) {},
};

describe("SuperSpecialSurvey", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<SuperSpecialSurvey onComplete={dummy.set} />);

    cy.get('[data-responsive-title="Disagree"] input').click({
      multiple: true,
      timeout: 6000,
      force: true,
    });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall["result"]["rawScore"]).to.eq(0.6);
    });
  });
});
```

To run the tests, use the command `npm run test` in the root directory of this repository. This will open the Cypress desktop interface, which you can use to test your survey as an independent component.

### Publishing

The final change is to increment the version number of the package in `package.json`. For changes to an existing survey, increment the patch number (e.g. `1.1.1` becomes `1.1.2`). When a new survey is added, increment the minor version number (e.g. `1.1.1` becomes `1.2.1`). Major version numbers are reserved for changes in the structure of the library itself.

Submit your changes as a pull request to this repository. The repository will automatically run your tests, and when the PR is merged into the main branch, a new version of the package will be released on NPM for your surveying pleasure.
