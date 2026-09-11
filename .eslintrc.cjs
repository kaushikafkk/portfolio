module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  plugins: ['react-refresh'],
  ignorePatterns: ['dist', 'node_modules'],
  rules: {
    'react/prop-types': 'off',
    // React 18 only accepts the lowercase DOM spelling; the plugin assumes React 19's camelCase.
    'react/no-unknown-property': ['error', { ignore: ['fetchpriority'] }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
