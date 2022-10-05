const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
