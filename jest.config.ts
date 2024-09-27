/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // moduleNameMapper: {
  //   '^@/(.*)$': '<rootDir>/$1',
  //   '^@/tests/components/(.*)$': '<rootDir>/tests/components/$1',
  // },
  testEnvironment: "jsdom",
  // testMatch: [
  //   '**/?(*.)+(test).ts?(x)'
  // ]
};

export default createJestConfig(config);
