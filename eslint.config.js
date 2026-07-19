import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import jsdoc from 'eslint-plugin-jsdoc';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'dev-dist/**', '.vercel/**'],
  },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  jsdoc.configs['flat/recommended'],
  prettierRecommended,
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'off',
    },
  },
];
