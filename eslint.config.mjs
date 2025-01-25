import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules', '.next', 'out'],
    languageOptions: {
      parser: typescriptEslintParser,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      react: eslintPluginReact,
      prettier: eslintPluginPrettier,
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
    rules: {
      // Prettier
      'prettier/prettier': ['error', { endOfLine: 'auto' }],

      // React
      'react/prop-types': ['error', { skipUndeclared: true }],
      'react/self-closing-comp': 'error',
      'react/sort-comp': [
        'error',
        {
          order: [
            'type-annotations',
            'static-methods',
            'instance-variables',
            'lifecycle',
            '/^handle.+$/',
            'getters',
            'setters',
            '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
            'instance-methods',
            'everything-else',
            'rendering',
          ],
          groups: {
            rendering: ['/^render.+$/', 'render'],
          },
        },
      ],

      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true },
      ],

      // Simple Import Sort
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^next(/.*|$)'],
            ['^react', '^@tanstack', '^@mui'],
            [
              '^@(components|constants|contexts|hooks|modules|providers|services|stores|styles|types|utils).*',
            ],
            ['^[^.^@].*'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.?(css)$'],
          ],
        },
      ],

      // General
      'no-console': 'off',
      'no-debugger': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
