// eslint-disable-next-line functional/prefer-immutable-types
const config = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:import/recommended',
    'plugin:functional/strict',
    'plugin:functional/stylistic',
    'plugin:svelte/recommended',
    'plugin:svelte/prettier',
    'prettier'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    },
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {
        'functional/no-let': 'off',
        'functional/functional-parameters': 'off',
        'functional/no-return-void': 'off',
        'functional/no-expression-statements': 'off'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.svelte']
  },
  plugins: ['@typescript-eslint', 'functional'],
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'functional/prefer-immutable-types': 'off'
  }
}

// eslint-disable-next-line functional/no-expression-statements, functional/immutable-data
module.exports = config
