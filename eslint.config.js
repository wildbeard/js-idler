import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.js'],
    plugins: { js },
    extends: ['js/recommended'],
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.ts', '.js', '.vue'],
        },
      },
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'script' },
  },
  pluginVue.configs['flat/essential'],
]);
