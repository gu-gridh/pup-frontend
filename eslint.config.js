import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import globals from 'globals'
import babelParser from '@babel/eslint-parser'
import vueParser from 'vue-eslint-parser'

export default [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.js'],
    languageOptions: {
      parser: babelParser,
      parserOptions: { requireConfigFile: false, ecmaVersion: 2022, sourceType: 'module' },
      globals: { ...globals.browser, ...globals.node }
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: babelParser,
        requireConfigFile: false,
        ecmaVersion: 2022,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: { ...globals.browser, ...globals.node },
    },
  },
]
