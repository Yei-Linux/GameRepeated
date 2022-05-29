module.exports = {
  roots: ["<rootDir>/src"],
  testRegex: "(/__tests__/.*\\.test)\\.(ts|tsx|js|jsx)$",
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.js"],
};
