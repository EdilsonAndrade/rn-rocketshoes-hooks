module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
    'transform-class-properties'

  ],
  rules: {
    'prettier/prettier':'error',
    'react/state-in-constructor': [0, "never"],
    'react/jsx-filename-extension':[
      'warn',
      {
        extensions:['.jsx','.js']
      }
    ],
    'import/prefer-default-export':'off'
  },
};
