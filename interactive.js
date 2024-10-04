import inquirer from 'inquirer';

export const getProjectName = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'userName',
      message: 'Enter project name:'
    }
  ]);
  console.log(`Project name ${answer.userName}!`);
  return answer.userName;
};

export const selectStructure = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedStructure',
      message: 'Select Structure:',
      choices: ['MVC', 'API']
    }
  ]);
  console.log(`Structure is ${answer.selectedStructure}.`);
  return answer.selectedStructure;
};

export const selectRenderEngine = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedRenderEngine',
      message: 'Select Render Engine:',
      choices: ['EJS', 'PUG', 'Handlebars']
    }
  ]);
  console.log(`Render Engine is ${answer.selectedRenderEngine}.`);
  return answer.selectedRenderEngine;
};

export const selectDb = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedDb',
      message: 'Select Db integration:',
      choices: ['MongoDB', 'Postgres', 'MySQL', 'SQLServer']
    }
  ]);
  console.log(`Db is ${answer.selectedDb}.`);
  return answer.selectedDb;
};
