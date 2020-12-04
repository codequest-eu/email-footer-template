# footer-templates-app

Project is based on the [Create-React-App](https://create-react-app.dev/docs)

After creation, your project's directory structure should look like this:

- .git - [directory used by GIT for project's version control](https://git-scm.com/docs/git) 
- public - [static assets](https://create-react-app.dev/docs/using-the-public-folder)
- src - actual project's code
  - `./src/footer-templates-app` - a directory where you put your project's modules, which then can be imported using absolute path (`footer-templates-app/**`)
  - `./src/example` - example project. This directory should be either merged with `./src/footer-templates-app` (if you'd like to use it as a base for your project) or deleted
  - `./src/scripts` - scripts that allows to automatize long-lasting, repeatable tasks (e.g license checking) 
- .audit-ci.js - [audit-ci configuration file](https://github.com/IBM/audit-ci)
- babel.config.js - [babel configuration file](https://github.com/babel/babel)
- .browserslistrc - [Browserlist](https://github.com/browserslist/browserslist)
- .editorconfig - [Editorconfig](https://editorconfig.org)
- .env - environment variables config
- .env.template - environment variables config template
- .eslintignore - list of glob patterns that define which files should be ignored by ESLint 
- .eslintrc.js - [ESLint configuration file](https://github.com/eslint/eslint)
- .gitignore - list of glob patterns that define which files should be ignored by GIT
- .huskyrc.json - [Husky configuration file](https://github.com/typicode/husky)
- .lintstagedrc.js - [🚫 💩 lint-staged configuration file](https://github.com/okonet/lint-staged#lintstagedrc-example)
- package.json - [NPM package manifest](https://docs.npmjs.com/configuring-npm/package-json.html)
- package-lock.json - [description of the installed packages tree](https://docs.npmjs.com/configuring-npm/package-lock-json.html)
- .prettierrc - [Prettier configuration file](https://prettier.io/docs/en/configuration.html)
- README.md
- tsconfig.json [TypeScript configuration file](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#using-tsconfigjson-or-jsconfigjson)

For the project to build, these files must exist with exact filenames:

- `public/index.html`
- `src/index.tsx`

Some of the directories also have their own `README.md` included, so please check those as well.