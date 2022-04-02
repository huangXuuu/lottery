/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['jsdoc'],
  extends: [
    './.eslintrc-auto-import.json',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    'plugin:vue-scoped-css/vue3-recommended',
    'plugin:jsdoc/recommended'
  ],
  env: {
    'vue/setup-compiler-macros': true,
    node: true
  },
  rules: {
    'no-console': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-namespace': 'off',
    'vue-scoped-css/enforce-style-type': 'off',
    'no-unexpected-multiline': 'error',
    'jsdoc/no-undefined-types': ['error', { definedTypes: ['unknown'] }]
  },
  ignorePatterns: ['src/auto-imports.d.ts', 'src/components.d.ts']
};
