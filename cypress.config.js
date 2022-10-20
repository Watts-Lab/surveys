const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  projectId: "z7p66s",

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "./surveys/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "./cypress/support/component.js",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
