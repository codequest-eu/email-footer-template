module.exports = {
  extends: ["@codequest-eu/eslint-config"],
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"]
  },
  settings: {
    "import/internal-regex": "^footer-templates-app/"
  }
};
