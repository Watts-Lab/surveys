# Survey Library

[![storybook badge](https://raw.githubusercontent.com/storybookjs/brand/main/badge/badge-storybook.svg)](https://main--6234a36a932a74003a2e9141.chromatic.com)



## Goals

This repository aims to be a centralized location for storing, documenting, versioning, and providing surveys to be used across projects within the CSS lab, and eventually made available to the wider social science community. 

### Centralized Storage
To the extent possible, the lab's surveys should be stored in this repository to enable reuse across projects while maintaining consistency. This repository then can provide the implementation of record for each survey, including the questions asked, relevant stimuli (such as RME images), correct answers when applicable (such as in the CRT), and code for aggregating responses into a score. This will help to ensure consistency between different uses of the same survey, so that we have full confidence that results from one use of the survey are comparable with results from other uses.

### Documentation
Surveys provided here should be documented with the source of the survey instrument itself, whether it be a publication from the literature or an internal survey development process. The documentation should cite other publications that have used the particular survey instrument. For internally developed surveys, the documentation should give a summary of the purpose of the survey, how it was developed, and how it was validated.

The documentation should be written in language that can be used verbatim e.g. in the supplement to a paper using the survey, to describe its use. 

We should use .bib files to document our citation. Within the readme for each survey, reference a unique .bib file that includes the list of sources you referenced in designing that particular survey. 

### Versioning
Each commit to this github repository is maintained indefinitely, and so the precise version of each survey can be referenced by including with the stored survey responses a link to the file in a specific commit blob or raw file. This way, there is absolute traceability between survey responses and the version of the survey used.

### Provision
This repository can also serve as a web Content Management System/Content Delivery Network. Particular experiements (e.g. in empirica or surveyor) can fetch surveys hosted here by URL, to save having to package surveys with experiment code.


# Usage

You can view [surveys](https://main--6234a36a932a74003a2e9141.chromatic.com) and [edit history](https://www.chromatic.com/builds?appId=6234a36a932a74003a2e9141&branch=main) using storybook and chromatic.

### Local Dev
To view this survey library rendered on your local machine, you can run

`npm install` 

to install the dependencies, and then type:

`npm run storybook`

then you can view the storybook at:

`http:localhost:6007`



# 
Vite is for running the dev server that cypress uses for component testing
to test, `run npx cypress open`
to build, `npx rollup --config`