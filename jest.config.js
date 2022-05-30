module.exports = {
  roots: ['<rootDir>/src'],
  testRegex: '(/__tests__/.*\\.test)\\.(js|jsx)$',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],
  transform: {
    '^.+\\.js?$': 'ts-jest',
  },
}
