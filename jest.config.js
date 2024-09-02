module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    transformIgnorePatterns: [
      '/node_modules/(?!axios).+\\.js$'
    ],
  };
  
  