const { CLIEngine } = require('eslint')

const cli = new CLIEngine({})

module.exports = {
  "*.json": ["prettier --write"],
  "**/locales/*.json": ["npm run lint:locales -- --fix"],
  // https://github.com/okonet/lint-staged#how-can-i-ignore-files-from-eslintignore
  "*.{ts,tsx,js,jsx}": (files) => 'eslint --max-warnings=0 --fix ' + files.filter((file) => !cli.isPathIgnored(file)).join(' ')
}
