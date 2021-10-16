 // TODO: Create a function that returns a license badge based on which license is passed in
 // If there is no license, return an empty string
 const renderLicenseBadge = license => license ? ` ![${license}](https://img.shields.io/badge/License-${license}-orange) ` : '';

 const renderBadge = (type, text, colour) => ` ![${text}](https://img.shields.io/badge/${type}-${text}-${colour}) `;


 // TODO: Create a function that returns the license section of README
 // If there is no license, return an empty string
 const outputLicense = (project) => {
     project.licenseAgreement = project.licenseAgreement.replace(/\[year\]/g, new Date().getFullYear());
     project.licenseAgreement = project.licenseAgreement.replace(/<year>/g, new Date().getFullYear());
     project.licenseAgreement = project.licenseAgreement.replace(/\[yyyy\]/g, new Date().getFullYear());
     project.licenseAgreement = project.licenseAgreement.replace(/\[fullname\]/g, project.licenseHolder);
     project.licenseAgreement = project.licenseAgreement.replace(/\[name of copyright owner\]/g, project.licenseHolder);
     project.licenseAgreement = project.licenseAgreement.replace(/<name of author>/g, project.licenseHolder);
     project.licenseAgreement = project.licenseAgreement.replace(/<program>/g, project.name);
     return `
## License

${project.licenseAgreement}                 
`;

 };
 // a function to create a table of contents
 const outputTOC = (project) => {
         output = "## Table of Contents\n\n* [Description](#description)\n* [Table of Contents](#table-of-contents)\n";
         if (project.confirmInstall) {
             output += "* [Installation](#installation)\n";
         }
         if (project.confirmUsage) {
             output += "* [Usage](#usage)\n";
         }
         if (project.confirmCredit) {
             output += "* [Credits](#credits)\n";
         }
         if (project.confirmContribute) {
             output += "* [Contributing](#contributing)\n";
         }
         if (project.confirmTests) {
             output += "* [Tests](#tests)\n";
         }
         if (project.confirmQuestions) {
             output += "* [Questions](#questions)\n";
         }
         output += "* [License](#license)\n";

         return output;
     }
     // a function to create a list of badges
 const outputBadges = (project) => {

         return renderLicenseBadge(project.license) + project.techBadges.split(',').map(name => {
                 return renderBadge('tech', name.trim(), 'lightblue');
             })
             .join('')
     }
     //creates Installation section
 const outputInstall = (project) => {
         if (project.confirmInstall) {
             return `
## Installation

${project.install}
`;
         } else return '';
     }
     //creates Usage section
 const outputUsage = (project) => {
         if (project.confirmUsage) {
             return `
## Usage

${project.usage} 
`;
         } else return '';
     }
     //creates Credits section
 const outputCredit = (project) => {
         if (project.confirmCredit) {
             return `
## Credits
${project.credit} 
`;
         } else return '';
     }
     //creates Contributing section
 const outputContributing = (project) => {
         if (project.confirmContribute) {
             return `
## Contributing

${project.contributing} 
`;
         } else return '';
     }
     //creates Tests section
 const outputTests = (project) => {
         if (project.confirmTests) {
             return `
## Tests

${project.tests}
`;
         } else return '';
     }
     //creates Questions section
 const outputQuestions = (project) => {
         if (project.confirmQuestions) {
             let hub, email = '';

             if (project.gitUser) {
                 hub = "[GitHub: " + project.gitUser + "](https://github.com/" + project.gitUser + ")\n";
             }
             if (project.userEmail) {
                 email = project.userEmail + "\n";
             }

             return `
## Questions

${hub}${email}
   `;
         } else return '';
     }
     //renders the markdown with template literals
 const renderMarkdown = (project) => {
     return `
# ${project.name}
 
${outputBadges(project)}

## Description
${project.description}  

${outputTOC(project)}${outputInstall(project)}${outputUsage(project)}${outputCredit(project)}${outputContributing(project)}${outputTests(project)}${outputQuestions(project)}${outputLicense(project)}
     `;
     // blank sections lead to erronious blank lines so i strung them all together and insert the spaces as needed in the functions
 }

 // TODO: Create a function to generate markdown for README
 const generateMarkdown = (project) => {
     console.log(project);
     return new Promise((resolve, reject) => {

         resolve(renderMarkdown(project));

     });
 }

 module.exports = generateMarkdown;