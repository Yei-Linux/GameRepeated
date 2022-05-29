module.exports = {
  roots: ["<rootDir>/src"],
  testRegex: "(/__tests__/.*\\.test)\\.(js|jsx)$",
  transform: {
    "^.+\\.js?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.js"],
};
