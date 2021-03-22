/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const fs = require("fs");
const path = require("path");

const checker = require("license-checker");

function formatList(items) {
  return `\n - ${items.join("\n - ")}\n`;
}

const allowedLicenses = [
  "AFL-3.0",
  "Apache-2.0",
  "Artistic-2.0",
  "BSD-2-Clause",
  "BSD-3-Clause-Clear",
  "BSD-3-Clause",
  "BSD-4-Clause",
  "BSL-1.0",
  "CC-BY-4.0",
  "ECL-2.0",
  "ISC",
  "MIT",
  "MS-PL",
  "NCSA",
  "OFL-1.1",
  "PostgreSQL",
  "UPL-1.0",
  "Zlib"
];

const outputFilePath = path.resolve("./licenses.csv");

// eslint-disable-next-line no-console
console.log(`Allowed licenses are:${formatList(allowedLicenses)}`);

checker.init(
  {
    start: ".",
    excludePackages: "footer-templates-app@0.1.0"
  },
  (err, packages) => {
    const notAllowedPackages = Object.keys(packages)
      .map((packageName) => ({ ...packages[packageName], packageName }))
      .filter(({ licenses }) => {
        const licensesToCheck =
          typeof licenses === "string" ? licenses.split(";") : licenses;

        if (!licensesToCheck) {
          return true;
        }

        return licensesToCheck.some(
          (eachLicense) => !allowedLicenses.includes(eachLicense)
        );
      });

    // eslint-disable-next-line no-console
    console.log(
      `Some of the packages do not meet our license requirments:${formatList(
        notAllowedPackages.map(
          ({ packageName, path, licenses }) =>
            `${packageName} ${licenses} (${path})`
        )
      )}`
    );

    if (err) {
      throw new Error(err);
    }

    const packagesCount = Object.keys(packages).length;

    if (notAllowedPackages.length === 0) {
      // eslint-disable-next-line no-console
      console.log(
        `License checking done! All of the ${packagesCount} packages meet our license requirements!`
      );
    }

    fs.writeFileSync(outputFilePath, checker.asCSV(packages), "utf8");

    // eslint-disable-next-line no-console
    console.log(`Result saved into "${outputFilePath}" (file ignored by GIT)`);
  }
);
