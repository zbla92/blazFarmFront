module.exports = {
  root: true,
  extends: ['@react-native-community'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-native', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    // fix on save but don't show it as error in editor
    'prettier/prettier': 1,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        curly: [2, 'multi-line', 'consistent'],
        quotes: [2, 'single', { allowTemplateLiterals: true, avoidEscape: true }],
        'object-curly-spacing': ['error', 'always'],
        'react-native/no-inline-styles': 0,
        'react-native/no-unused-styles': 1,
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
      },
    },
  ],
};
