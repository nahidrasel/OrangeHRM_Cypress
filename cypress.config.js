const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // These settings apply everywhere unless overridden
  env:{
  "baseUrl": "https://reqres.in"
  },
  defaultCommandTimeout: 5000,
  viewportWidth: 1000,
  viewportHeight: 600,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    embeddedScreenshots: true,
    html: true,
    inlineAssets: true,
    overwrite: false,
    json: false
  },
  video: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
