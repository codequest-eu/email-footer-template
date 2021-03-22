module.exports = {
  root: true,
  extends: [
    // https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app
    "react-app",
    // https://eslint.org/docs/rules/
    "eslint:recommended",
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/configs
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  plugins: [
    // https://github.com/prettier/eslint-plugin-prettier
    "prettier",
    // https://github.com/typescript-eslint/typescript-eslint
    "@typescript-eslint",
    // https://github.com/benmosher/eslint-plugin-import
    "import"
  ],
  settings: {
    "import/internal-regex": "^footer-templates-app/"
  },
  rules: {
    "prettier/prettier": "error",

    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",

    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true // handled by import/order alphabetize
      }
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        }
      }
    ],

    "prefer-arrow-callback": "error",
    "no-console": "error",
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: true }
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],

    "no-warning-comments": ["warn", { terms: ["todo"], location: "anywhere" }]
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"]
  }
};
