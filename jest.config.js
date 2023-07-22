module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['node_modules/(?!@react-native|react-native)'],
  setupFilesAfterEnv: ['<rootDir>/__mocks__/globalMock.js'],
};
