var path = require("path");

module.exports = {
  root: true,
  extends: ["plugin:i18n-json/recommended"],
  rules: {
    // option for this rule the absolute path to the comparison file the plugin should require.
    "i18n-json/identical-keys": [
      2,
      {
        // each file's key structure compared with this file.
        filePath: path.resolve("./src/footer-templates-app/config/locales/en.json")
      }
    ],
    "i18n-json/valid-message-syntax": 0
  }
};
