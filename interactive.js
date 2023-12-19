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
        name: 'selectedColor',
        message: 'Select Structure:',
        choices: ['MVC', 'API']
      }
    ]);
    console.log(`Structure is ${answer.selectedColor}.`);
    return answer.selectedColor;
  };

  export const selectRenderEngine = async () => {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedColor',
        message: 'Select Structure:',
        choices: ['EJS', 'PUG', 'Handlebars']
      }
    ]);
    console.log(`Structure is ${answer.selectedColor}.`);
    return answer.selectedColor;
  };

export const  selectDb = async () => {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedColor',
        message: 'Select Db integration:',
        choices: ['MongoDb', 'Postgre', 'MySQL', 'SQLServer']
      }
    ]);
    console.log(`Db is ${answer.selectedColor}.`);
    return answer.selectedColor;
  };

/////////////////////////////////////////////////////////////////

const options = [
  'Option 1',
  'Option 2',
  'Option 3'
];

export const selectOption = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedOption',
      message: 'Select an option:',
      choices: options
    }
  ]);
  console.log(`You selected: ${answer.selectedOption}`);
};

export const askConfirmation = async () => {
    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmation',
        message: 'Are you sure you want to proceed?'
      }
    ]);
    if (answer.confirmation) {
      console.log('Proceeding...');
    } else {
      console.log('Cancelled.');
    }
  };



 export const selectFruits = async () => {
    const answer = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedFruits',
        message: 'Select your favorite fruits:',
        choices: ['MongoDb', 'Postgre', 'MySQL', 'SQLServer']
      }
    ]);
    console.log('Your selected fruits:');
    answer.selectedFruits.forEach(fruit => console.log(fruit));
  };
  

