module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    amd: true,
    es6: true
  },
  extends: [
    'airbnb-base',
  ],
  rules: {
    'import/prefer-default-export': ['off'],
    'prefer-destructuring': ['off'],
    'no-console': ['off'],
    'no-unused-vars': ['error', {'args': 'none'}],
    'no-use-before-define': ['off']
  }
};
