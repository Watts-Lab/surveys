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
  },
});