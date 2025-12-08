const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");

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
      const isCi = process.env.CI === "true" || !!process.env.GITHUB_ACTIONS;
      config.screenshotOnRunFailure = !isCi;

      on("after:screenshot", (details) => {
        if (isCi) {
          // Skip moving screenshots in CI; we don't persist them there.
          return;
        }

        const screenshotsRoot = path.join(process.cwd(), "cypress", "screenshots");
        const relativePath = path.relative(screenshotsRoot, details.path);
        const newPath = path.join(process.cwd(), relativePath);
        fs.mkdirSync(path.dirname(newPath), { recursive: true });

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

      return config;
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
