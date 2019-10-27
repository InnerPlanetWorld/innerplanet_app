module.exports = {
  "extends": "airbnb", // extend airbnb's JavaScript style guide: https://github.com/airbnb/javascript
  "parser": "babel-eslint", // allows us to parse the code with babel so that jsx code won't be considered an error
  "parserOptions": {
    "ecmaFeatures": { // specify which additional language features to use
      "jsx": true
    },
  },
  rules: {
    'no-plusplus': 'off',
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'off',
    'global-require': 'off', // React Native images uses the require syntax so we're turning it off so that we don't get any errors
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }], // only return an error if JSX syntax is used on files other than those with .js or .jsx file extension
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
}
