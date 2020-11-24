module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{ts,tsx}'
    ],
    covergeDirectory: 'coverage',
    testEnvironment: 'node',
    transform: {
        '.+\\.ts$':'ts-jest'
    }
}