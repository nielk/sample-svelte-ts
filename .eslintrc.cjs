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
      files: ['src/domain/*.ts'],
      rules: {}
    },
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {}
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.svelte']
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import', 'prettier'],
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
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/no-confusing-void-expression': 'off',
    'prettier/prettier': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'no-undef': 'off', // already handled by typescript
    'no-irregular-whitespace': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'svelte/no-at-html-tags': 'off',
    'svelte/valid-compile': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        // The default grouping, but with type imports last as a separate group.
        groups: [
          ['^node:', '^node:.*\\u0000$'], // node builtins packages
          ['^svelte', '^\\w', '^@?\\w'], // svelte and package imports
          ['^(_/_generated)(/.*|$)'], // generated types
          ['^(_)(/.*|$)', '^(_)(/.*|$).*\\u0000$'], // alias imports
          ['^\\.', '^\\..*\\u0000$'], // relative imports
          ['^.+\\.s?css$'] // styles imports
        ]
      }
    ]
  }
}

module.exports = config
