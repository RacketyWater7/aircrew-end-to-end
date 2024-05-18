module.exports = {
  default: {
    tags: process.env.npm_config_TAGS || "",
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["src/tests/e2e/features/**/*.feature"],
    dryRun: false, // this is used for dry run; which means it will not run the actual test but will check if the test is working or not
    require: ["src/tests/e2e/steps/**/*.steps.ts", "src/tests/e2e/hooks/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json",
      "rerun:@rerun.txt",
    ],
    parallel: 1,
  },
  rerun: {
    formatOptions: {
      snippetInterface: "async-await",
    },
    publishQuiet: true,
    dryRun: false,
    require: ["src/tests/e2e/steps/**/*.steps.ts", "src/tests/e2e/hooks/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json",
      "rerun:@rerun.txt",
    ],
    parallel: 2,
  },
};
