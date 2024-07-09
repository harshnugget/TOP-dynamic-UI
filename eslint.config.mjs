import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        require: 'readonly', // Add require as a global
      },
    },
  },
  pluginJs.configs.recommended,
];
