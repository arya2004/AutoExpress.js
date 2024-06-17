#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { getProjectName, selectDb, selectStructure, selectRenderEngine } from './interactive.js';

function createFolderAndTxtFile(folderName, structure, database, renderEngine) {
  // Create a directory for the Express API
  const currentPath = process.cwd();
  const apiPath = path.join(currentPath, folderName);

  const controllerPath = path.join(apiPath, 'controllers');
  const routePath = path.join(apiPath, 'routes');
  const modelPath = path.join(apiPath, 'models');
  const viewPath = path.join(apiPath, 'views');
  const dtoPath = path.join(apiPath, 'dto');
  const midPath = path.join(apiPath, 'middleware');
  const utilsPath = path.join(apiPath, 'utils');

  [apiPath, controllerPath, routePath, modelPath, dtoPath, midPath, utilsPath, viewPath].forEach(dir => fs.mkdirSync(dir, { recursive: true }));

  // Create an Express API file
  const apiFile = path.join(apiPath, 'app.js');
  const readme = path.join(apiPath, 'README.md');
  const envr = path.join(apiPath, '.env');
  const ignore = path.join(apiPath, '.gitignore');

  let dbImport, dbConnect;
  switch (database) {
    case 'MongoDb':
      dbImport = "const mongoose = require('mongoose');";
      dbConnect = `
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
`;
      break;
    case 'Postgre':
      dbImport = "const { Client } = require('pg');";
      dbConnect = `
const client = new Client({
  connectionString: process.env.POSTGRES_URI,
});
client.connect()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.error('PostgreSQL connection error:', err));
`;
      break;
    case 'MySQL':
      dbImport = "const mysql = require('mysql2');";
      dbConnect = `
const connection = mysql.createConnection(process.env.MYSQL_URI);
connection.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('MySQL connected');
});
`;
      break;
    case 'SQLServer':
      dbImport = "const sql = require('mssql');";
      dbConnect = `
const config = {
  user: process.env.SQLSERVER_USER,
  password: process.env.SQLSERVER_PASSWORD,
  server: process.env.SQLSERVER_SERVER,
  database: process.env.SQLSERVER_DATABASE,
};
sql.connect(config)
  .then(() => console.log('SQL Server connected'))
  .catch(err => console.error('SQL Server connection error:', err));
`;
      break;
    default:
      throw new Error('Unsupported database selected');
  }

  fs.writeFileSync(apiFile, `
const express = require('express');
${dbImport}

const app = express();

app.use(express.json());

${dbConnect}

const weatherRouter = require('./routes/weather');
app.use('/api/weather', weatherRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
`);

  fs.writeFileSync(readme, `# ${folderName}`);
  fs.writeFileSync(envr, `
# Database URIs
MONGO_URI=mongodb://localhost:27017/${folderName}
POSTGRES_URI=postgresql://localhost/${folderName}
MYSQL_URI=mysql://root:password@localhost/${folderName}
SQLSERVER_USER=your_user
SQLSERVER_PASSWORD=your_password
SQLSERVER_SERVER=localhost
SQLSERVER_DATABASE=${folderName}
`);
  fs.writeFileSync(ignore, `
node_modules
.env
`);

  exec(`cd ${folderName} && npm init -y && npm install express ${database === 'MongoDb' ? 'mongoose' : database === 'Postgre' ? 'pg' : database === 'MySQL' ? 'mysql2' : 'mssql'}`, (error, stdout, stderr) => {
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

  const weatherModel = `
const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  temperature: Number,
  condition: String,
  location: String,
  date: { type: Date, default: Date.now },
});

const Weather = mongoose.model('Weather', weatherSchema);
module.exports = Weather;
`;

  const weatherController = `
const Weather = require('../models/weather');

exports.getWeather = async (req, res) => {
  try {
    const weather = await Weather.find();
    res.json(weather);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
`;

  const weatherRoute = `
const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/', weatherController.getWeather);

module.exports = router;
`;

  fs.writeFileSync(path.join(modelPath, 'weather.js'), weatherModel);
  fs.writeFileSync(path.join(controllerPath, 'weatherController.js'), weatherController);
  fs.writeFileSync(path.join(routePath, 'weather.js'), weatherRoute);

  if (structure === 'MVC') {
    let viewTemplate;
    switch (renderEngine) {
      case 'EJS':
        viewTemplate = '<h1>Weather Info</h1><p><%= weather %></p>';
        break;
      case 'PUG':
        viewTemplate = 'h1 Weather Info\np #{weather}';
        break;
      case 'Handlebars':
        viewTemplate = '<h1>Weather Info</h1><p>{{weather}}</p>';
        break;
      default:
        throw new Error('Unsupported render engine selected');
    }
    fs.writeFileSync(path.join(viewPath, `index.${renderEngine.toLowerCase()}`), viewTemplate);

    const renderEngineImport = renderEngine === 'EJS' ? 'ejs' : renderEngine === 'PUG' ? 'pug' : 'express-handlebars';
    const renderEngineSetup = renderEngine === 'Handlebars' ? `
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
` : `
app.set('view engine', '${renderEngine.toLowerCase()}');
`;

    fs.appendFileSync(apiFile, `
const ${renderEngineImport} = require('${renderEngineImport}');
${renderEngineSetup}

app.get('/weather', (req, res) => {
  res.render('index', { weather: 'Sunny with a chance of rain' });
});
`);
  }
}

// Extract command line arguments
const args = process.argv.slice(2); // Exclude 'node' and script name

(async () => {
  if (args[0] === 'init') {
    const projectName = await getProjectName();
    const structure = await selectStructure();
    const database = await selectDb();
    const renderEngine = await selectRenderEngine();
    createFolderAndTxtFile(projectName, structure, database, renderEngine);
  }
  if (args[0] === 'new') {
    const folderName = args[1];
    createFolderAndTxtFile(folderName, 'API', 'MongoDb');
  }
})();
