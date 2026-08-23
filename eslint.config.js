import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  { ignores: ['dist/**', 'coverage/**'] },
  js.configs.recommended,
  react.configs.flat.recommended,
  {
    files: ['**/*.jsx', '**/*.js'],
    plugins: {
      react,
      'react-hooks': reactHooks
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-unused-vars': 'warn',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off'
    },
    settings: {
      react: { version: 'detect' }
    }
  }
]
