// https://github.com/IBM/audit-ci#options
module.exports = {
  low: true,
  "report-type": "summary",
  allowlist: [
    // dot-prop, dependency of lerna
    // https://github.com/lerna/lerna/pull/2680 <-- should be fixed in this PR
    1213,
    // yargs-parser, dependency of react-scripts
    // https://github.com/facebook/create-react-app/issues/9367#issuecomment-665753365
    // ^^^ going to be fixed in react-scripts 4.x.x
    1500
  ]
};
