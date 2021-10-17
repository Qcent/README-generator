// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fetch = require('node-fetch');

// import the markdown generation
const generateMarkdown = require('./utils/generateMarkdown.js');

// import the writeFile Function
const writeFile = require('./utils/writeFile.js');

// Create an array of questions for user input
const questions = [{
        type: 'input',
        name: 'name',
        message: "What is the project's name? (Required)",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter a project name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter a description for your project (Required)',
        validate: userInput => {
            if (userInput) {
                return true;
            } else {
                console.log('Please enter a project description!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'licenseHolder',
        message: 'Who is the Copyright holder of this project:',
        validate: userInput => {
            if (userInput) {
                return true;
            } else {
                console.log('Please enter the name of the Licence holder!');
                return false;
            }
        }
    },
    {
        type: 'checkbox',
        name: 'techBadges',
        message: 'What technologies were used in this project? (Check all that apply)',
        choices: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'jQuery', 'Node.js', 'Other'],

    },
    {
        type: 'input',
        name: 'otherBadges',
        message: 'Provide the other Technology used in a comma seperated list:',
        when: ({ techBadges }) => {

            if (techBadges.includes('Other')) {
                return true;
            } else {
                return false;
            }
        },
        validate: userInput => {
            if (userInput) {
                return true;
            } else {
                console.log('Please enter the other Tech used!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmTOC',
        message: 'Would you like a Table of Contents section?',
        default: true
    },
    {
        type: 'confirm',
        name: 'confirmInstall',
        message: 'Does this project need to be installed on a users system?',
        default: true
    },
    {
        type: 'input',
        name: 'install',
        message: 'Provide the Installation instructions:',
        when: ({ confirmInstall }) => {
            if (confirmInstall) {
                return true;
            } else {
                return false;
            }
        },
        validate: userInput => {
            if (userInput) {
                return true;
            } else {
                console.log('Please enter the Installation instructions!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmUsage',
        message: 'Would you like to provide Usage instructions?',
        default: true
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide the Usage instructions:',
        when: ({ confirmUsage }) => {
            if (confirmUsage) {
                return true;
            } else {
                return false;
            }
        },
        validate: userInput => {
            if (userInput) {
                return true;
            } else {
                console.log('Please enter the Usage instructions!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmCredit',
        message: 'Would you like to Credit any other developers / 3rd parties?',
        default: true
    },
    {
        type: 'input',
        name: 'credit',
        message: 'Provide the Credit / Acknowledgements:',
        when: ({ confirmCredit }) => {
            if (confirmCredit) {
                return true;
            } else {
                return false;
            }
        },
        validate: userInput => {
            if (userInput) {
                return true;
            } else {
                console.log('Please enter your acknowledgements!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmContribute',
        message: 'Would you like to include a Contributing section?',
        default: true
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Provide the Contributing instructions:',
        when: ({ confirmContribute }) => {
            if (confirmContribute) {
                return true;
            } else {
                return false;
            }
        },
        validate: userInput => {
            if (userInput) {
                return true;
            } else {
                console.log('Please enter the Contributing instructions!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmTests',
        message: 'Would you like to include a Tests section?',
        default: true
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Provide the Tests info:',
        when: ({ confirmTests }) => {
            if (confirmTests) {
                return true;
            } else {
                return false;
            }
        },
        validate: userInput => {
            if (userInput) {
                return true;
            } else {
                console.log('Please enter the Test(s)!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmQuestions',
        message: 'Would you like to include a Questions section?',
        default: true
    },
    {
        type: 'input',
        name: 'gitUser',
        message: 'Enter your GitHub username:',
        when: ({ confirmQuestions }) => {
            if (confirmQuestions) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'userEmail',
        message: 'Enter your email address:',
        when: ({ confirmQuestions }) => {
            if (confirmQuestions) {
                return true;
            } else {
                return false;
            }
        }

    }
];
const licenseQuestions = [{
        type: 'list',
        name: 'license',
        message: 'What License is this project released under?',
        choices: ['MIT', 'Apache 2.0', 'GPL v3', 'BSD', 'Other', 'Other-Manual'],
        default: 0
    },
    {
        type: 'list',
        name: 'BSD-V',
        message: 'Which BSD License?:',
        choices: ['2-Clause', '3-Clause', '3-Clause-Clear'],
        default: 0,
        when: ({ license }) => {
            if (license === 'BSD') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'otherLicense',
        message: 'Provide the License name:',
        when: ({ license }) => {
            if (license === 'Other') {
                return true;
            } else {
                return false;
            }
        },
        validate: userInput => {
            if (userInput) {
                return true;
            } else {
                console.log('Please enter the name of the License!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'otherLicense',
        message: 'Provide the License name:',
        when: ({ license }) => {
            if (license === 'Other-Manual') {
                return true;
            } else {
                return false;
            }
        },
        validate: userInput => {
            if (userInput) {
                return true;
            } else {
                console.log('Please enter the name of the License!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'licenseAgreement',
        message: 'Provide the License Agreement:',
        when: ({ license }) => {
            if (license === 'Other-Manual') {
                return true;
            } else {
                return false;
            }
        },
        validate: userInput => {
            if (userInput) {
                return true;
            } else {
                console.log('Please enter the License Agreement!');
                return false;
            }
        }
    }
];

// asks for licence and then tries to fetch it
const promptLicense = projectData => {

    console.log(`
  =================
  Add a License
  =================
  `);

    return inquirer.prompt(licenseQuestions)
        .then(license => {
            // adds the license data to the projectData object
            projectData.license = license.license;
            projectData.liceExtras = license;
            /* extra license figurin' */

            if (projectData.license === 'BSD') {
                switch (projectData.liceExtras['BSD-V']) {
                    case '2-Clause':
                        projectData.license = 'bsd-2-clause';
                        break;
                    case '3-Clause':
                        projectData.license = 'bsd-3-clause';
                        break;
                    case '3-Clause-Clear':
                        projectData.license = 'bsd-3-clause-clear';
                        break;
                }
            }

            if (projectData.license === 'Apache 2.0') { projectData.license = 'apache-2.0'; }
            if (projectData.license === 'GPL v3') { projectData.license = 'gpl-3.0'; }

            /* */

            // fulfill the promise and return the data the user has built
            return projectData;
        })
        .then(fetchLicense);
};

//Use API to search for license info
const fetchLicense = (project) => {
    if (project.license === 'Other-Manual') {
        project.license = project.liceExtras.otherLicense;
        project.licenseAgreement = project.liceExtras.licenseAgreement;

        return new Promise((x, y) => x(project));
    }

    if (project.license === 'Other') {
        project.license = project.liceExtras.otherLicense;
    }

    return new Promise((resolve, reject) => {
        fetch(`https://api.github.com/licenses/${project.license}`, {
                headers: { Accept: 'application/vnd.github.v3+json', }
            })
            .then(response => response.json())
            .then(data => {
                if (data.message == 'Not Found') {
                    // reject('No Match')
                    console.log(`No Match for ${project.license} License`);
                    resolve(promptLicense(project)); // recursivly run till we get a match

                } else {
                    console.log('License Found')
                    project.license = data.spdx_id;
                    project.licenseLink = data.html_url;
                    project.licenseAgreement = data.body
                    resolve(project);
                }
            })
            .catch(err => console.log(err));
    });
};

// Create a function to initialize app
function init() {
    return inquirer.prompt(questions);
};

// Function call to initialize app
init()
    .then(promptLicense)
    .then(data => generateMarkdown(data))
    .then(markdown => writeFile(markdown))
    .then(status => console.log(status))
    .catch(err => console.log(err));
