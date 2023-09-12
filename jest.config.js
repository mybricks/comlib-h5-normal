// Sync object
const config = {
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/', './test.js'],
  preset: 'ts-jest',
  cache: false,
  globals: {
    'ts-jest': {
      diagnostics: {
        exclude: ['**'],
      },
    },
  },
};
module.exports = config;
