module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
