import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { getDatabaseConfig } from './database.js';
import { createFileStructure, createAppFile, createWeatherFiles } from './generateFiles.js';

// Function to create a new project with the specified configuration
export const createProject = (folderName, structure, database, renderEngine) => {
  const currentPath = process.cwd(); // current working directory
  const apiPath = path.join(currentPath, folderName);

  createFileStructure(apiPath, structure, renderEngine);

  const databaseConfig = getDatabaseConfig(database);
  createAppFile(apiPath, databaseConfig, structure, renderEngine);
  createWeatherFiles(path.join(apiPath, 'models'), path.join(apiPath, 'controllers'), path.join(apiPath, 'routes'));

  const readmePath = path.join(apiPath, 'README.md');
  const envPath = path.join(apiPath, '.env');
  const gitIgnorePath = path.join(apiPath, '.gitignore');

  fs.writeFileSync(readmePath, `# ${folderName}`);
  fs.writeFileSync(envPath, `
# Database URIs
MONGO_URI=mongodb://localhost:27017/${folderName}
POSTGRES_URI=postgresql://localhost/${folderName}
MYSQL_URI=mysql://root:password@localhost/${folderName}
SQLSERVER_USER=your_user
SQLSERVER_PASSWORD=your_password
SQLSERVER_SERVER=localhost
SQLSERVER_DATABASE=${folderName}
`);
  fs.writeFileSync(gitIgnorePath, `
node_modules
.env
`);

  let installCommand = `cd ${folderName} && npm init -y && npm install express ${database === 'MongoDB' ? 'mongoose' : database === 'Postgres' ? 'pg' : database === 'MySQL' ? 'mysql2' : 'mssql'}`;

  if (structure === 'MVC') {
    installCommand += ` ${renderEngine === 'EJS' ? 'ejs' : renderEngine === 'PUG' ? 'pug' : 'express-handlebars'}`;
  }

  // Execute the npm install command
  exec(installCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error installing dependencies: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Dependency installation error: ${stderr}`);
      return;
    }
    console.log(`Dependencies installed successfully:\n${stdout}`);
  });
};
