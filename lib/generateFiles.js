import fs from 'fs';
import path from 'path';

export const createFileStructure = (apiPath, structure, renderEngine) => {
  const controllerPath = path.join(apiPath, 'controllers');
  const routePath = path.join(apiPath, 'routes');
  const modelPath = path.join(apiPath, 'models');
  const viewPath = path.join(apiPath, 'views');
  const dtoPath = path.join(apiPath, 'dto');
  const midPath = path.join(apiPath, 'middleware');
  const utilsPath = path.join(apiPath, 'utils');

  [apiPath, controllerPath, routePath, modelPath, dtoPath, midPath, utilsPath, viewPath].forEach(dir => fs.mkdirSync(dir, { recursive: true }));

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
  }
};

export const createAppFile = (apiPath, databaseConfig, structure, renderEngine) => {
  const apiFile = path.join(apiPath, 'app.js');

  const renderEngineImport = renderEngine === 'EJS' ? 'ejs' : renderEngine === 'PUG' ? 'pug' : 'express-handlebars';
  const renderEngineSetup = renderEngine === 'Handlebars' ? `
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
` : `
app.set('view engine', '${renderEngine.toLowerCase()}');
`;

  const appContent = `
const express = require('express');
${databaseConfig.importStatement}

const app = express();

app.use(express.json());

${databaseConfig.connectionCode}

const weatherRouter = require('./routes/weather');
app.use('/api/weather', weatherRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

${structure === 'MVC' ? renderEngineSetup : ''}

app.get('/weather', (req, res) => {
  res.render('index', { weather: 'Sunny with a chance of rain' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
`;
  fs.writeFileSync(apiFile, appContent);
};

export const createWeatherFiles = (modelPath, controllerPath, routePath) => {
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
};
