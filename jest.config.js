module.exports = {
  roots: ['<rootDir>/src'],
  testRegex: '(/__tests__/.*\\.test)\\.(js|jsx)$',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testEnvironment: 'jsdom',
  transform: {
    '\\.(js|jsx)$': 'babel-jest',
  },
}
