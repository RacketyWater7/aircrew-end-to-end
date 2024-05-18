module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // add an exclusion pattern for the src/lib/tests-utils directory
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/src/lib/tests-utils/"],
};
