module.exports = {
  rootDir: '.',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      'ts-config': {
        ...require('./tsconfig.json').compilerOptions,
        sourceMap: true,
      },
    },
  },
  transform: { '^.+\\.ts$': 'ts-jest' },
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.spec.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/specs/', '/test-helpers/', '/testing/', '/tests/'],
  coverageReporters: ['lcov', 'text-summary'],
  restoreMocks: true,
  verbose: true,
};
