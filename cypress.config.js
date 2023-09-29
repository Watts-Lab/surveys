const { defineConfig } = require("cypress");
const fs = require("fs");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  projectId: "z7p66s",

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: [
      "./surveys/**/*.cy.{js,jsx,ts,tsx}",
      "./src/*.cy.jsx",
      "./test/**/*cy.{js,jsx,ts,tsx}",
    ],
    supportFile: "./cypress/support/component.js",
    setupNodeEvents(on, config) {
      on("after:screenshot", (details) => {
        const oldPath = details.path;
        const newPath = oldPath.replace("cypress/screenshots", "surveys");

        return new Promise((resolve, reject) => {
          // fs.rename moves the file to the new path
          fs.rename(details.path, newPath, (err) => {
            if (err) return reject(err);

            // because we renamed and moved the image, resolve with the new path
            // so it is accurate in the test results
            resolve({ path: newPath });
          });
        }).catch((error) => {
          console.log(error);
        });
      });
    },
  },
  retries: {
    // Configure retry attempts for `cypress run`
    // Default is 0
    runMode: 2,
    // Configure retry attempts for `cypress open`
    // Default is 0
    openMode: 0,
  },
});
