// https://github.com/IBM/audit-ci#options
module.exports = {
  low: true,
  "report-type": "summary",
  allowlist: [
    // Legacy vulnerabilities
    565, 1674, 1677, 1693, 1745, 1747, 1748, 1751, 1753,
    // Remaining vulnerabilities that cannot be fixed without breaking changes
    1094544, // PostCSS line return parsing error - dev dependency
    1095100, // Uncontrolled Resource Consumption in trim-newlines - dev dependency
    1095141, // Inefficient Regular Expression Complexity in nth-check - dev dependency
    1096727, // Server-Side Request Forgery in Request - deprecated legacy package
    1097682, // tough-cookie Prototype Pollution vulnerability - no fix available
    1098094, // Uncontrolled resource consumption in braces - dev dependency
    1098681, // Regular Expression Denial of Service (ReDoS) in micromatch - dev dependency
    1105256, // webpack-dev-server source code theft vulnerability - dev dependency
    1105257  // webpack-dev-server source code theft vulnerability - dev dependency
  ]
};
