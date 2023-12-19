#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process'
import {getProjectName, selectDb,selectStructure, selectRenderEngine } from './interactive.js';
import { log } from 'console';




function createFolderAndTxtFile(folderName, structute, dataBase, renderEngine) {
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

if(structute == 'MVC'){
  const renderer = path.join(apiPath, 'views');
  fs.mkdirSync(renderer);

  if(renderEngine === 'EJS'){
    const ejs = path.join(renderer, 'index.ejs');
    fs.writeFileSync(ejs, ''); 
  }
  else if(renderEngine === 'PUG'){
    const pug = path.join(renderer, 'index.pug');
    fs.writeFileSync(pug, ''); 
  }
  else if(renderEngine === 'Handlebars'){
    const hbs = path.join(renderer, 'index.hbs');
    fs.writeFileSync(hbs, ''); 
  }
}





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
    //console.log(`\n\n\n: ${stdout}`);
  });




  exec('pwd');
}





// Extract command line arguments
const args = process.argv; // Exclude 'node' and script name
//console.log(args);
// if (args.length !== 1) {
//   console.error('Please provide a single folder name.');
//   process.exit(1);
// }

const funcType = args[2];
if (funcType === 'init') {
  const projectName = await getProjectName();
  const structute = await selectStructure();
  const dataBase = await selectDb();
  const renderEngine = await selectRenderEngine();
  createFolderAndTxtFile(projectName, structute, dataBase, renderEngine);
  
}
if (funcType === 'new') {
  const folderName = args[3];
  createFolderAndTxtFile(folderName, 'API', 'mongoDb');
}



