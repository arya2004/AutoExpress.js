
# AutoExpress: Express API Starter Project Generator

AutoExpress simplifies the setup process for building Express API projects, providing a quick and efficient way to start your API development.

## Features

- **Express Framework**: Jumpstart your project with a pre-configured Express setup.
- **Routing Made Easy**: Define API endpoints and routes effortlessly.
- **Middleware Integration**: Preconfigured middleware for streamlined request handling.
- **Database Integration**: Preconfigured your database connections
- **Error Handling**: Basic error handling setup for smoother development.

## Installation

Ensure you have Node.js installed, then globally install the 'AutoExpress' package via npm:

```bash
npm i -g @arya2004/auto-express
```

## Usage

Generate a new Express API project with MongoDb using AutoExpress:

```bash
auto new my-express-api
```

Start an interactive CLI to configure project:

```bash
auto init
```

Replace `my-express-api` with your preferred project name. This command will create a directory named `my-express-api` containing the starter project files and folders.

## Getting Started

1. Navigate to the project directory:

```bash
cd my-express-api
```

2. Start the development server:

```bash
npm start
```

Your server will be accessible at `http://localhost:3000`.

## Project Structure

- `/src`: Houses your Express application code.
- `/src/routes`: Define API endpoints and routes here.
- `/src/controllers`: Handle requests and responses logic.
- `/src/middleware`: Store custom middleware functions here.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

