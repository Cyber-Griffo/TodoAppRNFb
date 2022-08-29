module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'sort-imports': [
          'error',
          {
            ignoreDeclarationSort: true,
          },
        ],
        'unused-imports/no-unused-imports': 'error',
        semi: ['warn', 'never'],
      },
    },
  ],
}
