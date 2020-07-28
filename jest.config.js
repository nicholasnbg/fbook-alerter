module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist'],
  globals: {
    'ts-jest': {
      paths: {
        '@App/*': ['src/*'],
      },
    },
  },
};
