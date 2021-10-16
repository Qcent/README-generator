// TODO: Include packages needed for this application
const inquirer = require('inquirer');

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
    return inquirer.prompt([{
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
            name: 'discription',
            message: 'Enter a discription for your project (Required)',
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log('Please enter a project discription!');
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
            message: 'Would you like to Credit and other developers / 3rd parties?',
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
            type: 'list',
            name: 'license',
            message: 'What Licence is this project released under? (Check all that apply)',
            choices: ['MIT', 'Apache 2.0', 'GPL v3', 'BSD', 'Other'],
            default: 0
        },
        {
            type: 'list',
            name: 'BSD-V',
            message: 'Which BSD Licence?:',
            choices: ['2-Clause', '3-Clause', '4-Clause'],
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
            name: 'otherLicence',
            message: 'Provide the Licence name:',
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
                    console.log('Please enter the name of the Licence!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'licenceAgreement',
            message: 'Provide the Licence Agreemnet:',
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
                    console.log('Please enter the Licence Agreement!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'licenceBadge',
            message: 'Provide the Licence Badge:',
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
                    console.log('Please enter the Licence Badge!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'techBadges',
            message: 'What technologies where used in this project? (Check all that apply)',
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
            name: 'contributing',
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
        }
    ]);
}

// Function call to initialize app
init()
    .then(data => console.log(data))