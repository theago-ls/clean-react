module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
