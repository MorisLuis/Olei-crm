import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1', // si usas @/ como alias en tsconfig.json
    },
    testMatch: ['**/__tests__/**/*.test.ts?(x)'],
}

export default createJestConfig(customJestConfig)
