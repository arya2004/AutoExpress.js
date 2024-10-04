import inquirer from 'inquirer';

// Function to prompt the user for the project name
export const getProjectName = async () => {
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter project name:'
    }
  ]);
  console.log(`Project name ${projectName}!`);
  return projectName;
};

// Function to prompt the user for the project structure
export const selectStructure = async () => {
  const { selectedStructure } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedStructure',
      message: 'Select Structure:',
      choices: ['MVC', 'API']
    }
  ]);
  console.log(`Structure is ${selectedStructure}.`);
  return selectedStructure;
};

// Function to prompt the user for the render engine
export const selectRenderEngine = async () => {
  const { selectedRenderEngine } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedRenderEngine',
      message: 'Select Render Engine:',
      choices: ['EJS', 'PUG', 'Handlebars']
    }
  ]);
  console.log(`Render Engine is ${selectedRenderEngine}.`);
  return selectedRenderEngine;
};

// Function to prompt the user for the database
export const selectDb = async () => {
  const { selectedDb } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedDb',
      message: 'Select Db integration:',
      choices: ['MongoDB', 'Postgres', 'MySQL', 'SQLServer']
    }
  ]);
  console.log(`Db is ${selectedDb}.`);
  return selectedDb;
};
