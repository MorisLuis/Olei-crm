module.exports = {
  parser: '@typescript-eslint/parser', // Utiliza el parser de TypeScript
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Reglas recomendadas de TypeScript
    'next/core-web-vitals', // Reglas específicas de Next.js
  ],
  rules: {
    // 🔥 Prettier ya NO molesta en ESLint
    'prettier/prettier': 'off',

    // Buenas prácticas
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],

    // Orden de importaciones
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        alphabetize: { order: 'asc' },
      },
    ],

    // Otras buenas prácticas
    "no-console": ["warn", { allow: ["warn", "error"] }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
