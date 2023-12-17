// Import the next/jest module to create a Jest configuration tailored for Next.js projects.
const nextJest = require("next/jest");

// Use nextJest to generate the Jest configuration for your Next.js app.
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Define additional custom Jest configuration options.
const customJestConfig = {
  // Specify setup files to be executed after Jest's environment is set up, including custom setups.
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  
  // Set the test environment to jest-environment-jsdom for browser-like testing environment.
  testEnvironment: "jest-environment-jsdom",
};

// Combine the generated Next.js Jest configuration with the custom configuration.
// This ensures that the setup provided by next/jest is augmented with your customizations.
module.exports = createJestConfig(customJestConfig);
