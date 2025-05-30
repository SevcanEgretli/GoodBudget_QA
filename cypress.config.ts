import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  defaultCommandTimeout: 60000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  video: false,
  screenshotsFolder: "cypress/screenshots",
  reporter: "mochawesome",
  reporterOptions: {
    charts: true,
    overwrite: false,
    html: false,
    json: true,
    reportDir: "cypress/reports",
  },
  e2e: {
    baseUrl: "https://goodbudget.com",
    specPattern: "cypress/integration/**/*.feature",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents: async (on, config) => {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
  },
});
