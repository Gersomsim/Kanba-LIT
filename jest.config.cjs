module.exports = {
  testEnvironment: 'jsdom',
  // .js ya es ESM porque package.json tiene "type":"module"
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  // Lit y @lit son ESM puros — hay que transformarlos también
  transformIgnorePatterns: [
    '/node_modules/(?!(lit|@lit)/)',
  ],
  setupFiles: ['./jest.setup.cjs'],
  testMatch: ['**/src/**/*.test.js'],
  moduleNameMapper: {
    // Evita problemas con imports de CSS en tests
    '\\.css$': '<rootDir>/src/__mocks__/styleMock.cjs',
  },
}
