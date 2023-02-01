const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // These settings apply everywhere unless overridden
  env:{
  "baseUrl": "https://reqres.in"
  },
  defaultCommandTimeout: 5000,
  viewportWidth: 1000,
  viewportHeight: 600,
  video: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
