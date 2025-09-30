module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    requireConfigFile: false
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'prettier'],
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'no-console': 'off',
    'max-len': ['error', { code: 500 }],
    'class-methods-use-this': 0,
    'react/prop-types': 0,
    'no-shadow': 0,
    'spaced-comment': 'off',
    'linebreak-style': 0,
    'no-alert': 'off',

    // Prettier comme règle ESLint
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        trailingComma: 'none',
        printWidth: 100,
        tabWidth: 2,
        endOfLine: 'auto',
        jsxSingleQuote: false
      }
    ],

    // JSX autorisé dans les fichiers .js et .jsx
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],

    // Assouplissement des labels
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        required: {
          some: ['nesting', 'id']
        }
      }
    ]
  }
};
