import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  pageLoadTimeout: 80000,
  chromeWebSecurity: false,
  retries: {
    runMode: 1,
    openMode: 2,
  },
  e2e: {
    specPattern: "cypress/**/*.feature",
    baseUrl: "https://goodbudget.com",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      addCucumberPreprocessorPlugin(on, config);
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
