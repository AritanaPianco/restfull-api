/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
       'plugin:prettier/recommended'
    ],
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        rules: {
           'prettier/prettier': 'error'
            // "no-console": "warn"
            // Adicione regras específicas para arquivos TypeScript aqui, se necessário
          }
      },

    ],
    ignores: [
      // Adicione caminhos ou padrões para arquivos a serem ignorados
      'node_modules/**',   // Ignora todo o diretório node_modules
      'dist/**',           // Ignora todo o diretório dist
      'build/**',          // Ignora todo o diretório build
      '*.js',              // Ignora todos os arquivos .js no diretório raiz
    ],
  };
