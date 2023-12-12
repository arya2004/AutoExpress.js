#!/usr/bin/env node


const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

function createFolderAndTxtFile(folderName) {
  // Create a directory for the Express API
const currentPath = process.cwd();
const apiPath = path.join(currentPath, folderName);

const controllerPath = path.join(apiPath, 'controllers');
const routePath = path.join(apiPath, 'routes');
const modelPath = path.join(apiPath, 'models');
const dtoPath = path.join(apiPath, 'dto');
const midPath = path.join(apiPath, 'middleware');
const utilsPath = path.join(apiPath, 'utils');

fs.mkdirSync(apiPath);
fs.mkdirSync(controllerPath);
fs.mkdirSync(routePath);
fs.mkdirSync(modelPath);
fs.mkdirSync(dtoPath);
fs.mkdirSync(midPath);
fs.mkdirSync(utilsPath);

// Create an Express API file
const apiFile = path.join(apiPath, 'app.js');
const readme = path.join(apiPath, 'README.md');
const envr = path.join(apiPath, '.env');
const ignore = path.join(apiPath, '.gitignore');




fs.writeFileSync(apiFile, `
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
`);


fs.writeFileSync(readme, ''); 
fs.writeFileSync(envr, ''); 
fs.writeFileSync(ignore, ''); 

exec(`cd ${folderName}  && npm init -y`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error installing dependencies: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Dependency installation error: ${stderr}`);
      return;
    }
    console.log(`\n\n\n: ${stdout}`);
  });



  exec('pwd');
}





// Extract command line arguments
const args = process.argv.slice(2); // Exclude 'node' and script name

if (args.length !== 1) {
  console.error('Please provide a single folder name.');
  process.exit(1);
}

const folderName = args[0];
createFolderAndTxtFile(folderName);




// const fs = require('fs');
// const path = require('path');


// // Create a directory for the Express API
// const currentPath = process.cwd();
// const apiPath = path.join(currentPath, 'webapi');

// fs.mkdirSync(apiPath);

// // Create an Express API file
// const apiFile = path.join(apiPath, 'app.js');

// fs.writeFileSync(apiFile, `
// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
// `);