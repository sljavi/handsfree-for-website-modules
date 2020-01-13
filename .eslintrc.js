module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    amd: true,
    es6: true,
    'jest/globals': true,
  },
  plugins: ['jest'],
  extends: [
    'airbnb-base',
  ],
  rules: {
    'import/prefer-default-export': ['off'],
    'arrow-body-style': ['off'],
    'prefer-destructuring': ['off'],
    'no-console': ['off'],
    'no-unused-vars': ['error', {'args': 'none'}],
    'no-use-before-define': ['off'],
    'consistent-return': ['off'],
    'no-plusplus': ['off']
  }
};
