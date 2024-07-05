module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/.angular/',
  ],
  testMatch: [
    '<rootDir>/**/(*.)test.(js|jsx|ts|tsx)',
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  moduleNameMapper: {
    '^@app(.*)': '<rootDir>/src/app/$1',
    '^@env(.*)': '<rootDir>/src/environments/$1',
    '^@sharedS(.*)': '<rootDir>/src/app/shared/services/$1',
    '^@sharedD(.*)': '<rootDir>/src/app/shared/directives/$1',
    '^@state(.*)': '<rootDir>/src/app/state/$1',
    '^@layout(.*)': '<rootDir>/src/app/layout/$1',
    '^@layoutC(.*)': '<rootDir>/src/app/layout/components/$1',
    '^@bill(.*)': '<rootDir>/src/app/pages/bill/$1',
  },
};
