import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier'; // Import eslint-config-prettier

export default tseslint.config(
  { ignores: ['dist', 'eslint.config.js'] }, // Good idea to ignore the config file itself

  // Base JS and TS configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Configuration specific to TS/TSX files (React related)
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest', // Use 'latest' is generally fine
      sourceType: 'module',
      globals: {
        ...globals.browser, // Include browser globals
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Ensure JSX is enabled if not automatically picked up
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: eslintPluginPrettier, // Add this if you installed and want eslint-plugin-prettier
    },
    rules: {
      // Apply rules from react-hooks plugin
      ...reactHooks.configs.recommended.rules,
      // Your react-refresh rule
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Add other TS/React specific rules here if needed
      // 'prettier/prettier': 'warn', // Add this rule if using eslint-plugin-prettier

      // Example: Disable a TS rule if needed
      // '@typescript-eslint/no-explicit-any': 'off',
    },
    settings: {
      // Add React version detection if not automatic
      react: {
        version: 'detect',
      },
    },
  },

  // Add eslint-config-prettier *last*. This turns off conflicting rules.
  eslintConfigPrettier
);
