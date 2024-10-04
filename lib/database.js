export const getDatabaseConfig = (database) => {
  switch (database) {
    case 'MongoDB':
      return {
        importStatement: "const mongoose = require('mongoose');",
        connectionCode: `
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
  `
      };
    case 'Postgres':
      return {
        importStatement: "const { Client } = require('pg');",
        connectionCode: `
  const client = new Client({
    connectionString: process.env.POSTGRES_URI,
  });
  client.connect()
    .then(() => console.log('PostgreSQL connected'))
    .catch(err => console.error('PostgreSQL connection error:', err));
  `
      };
    case 'MySQL':
      return {
        importStatement: "const mysql = require('mysql2');",
        connectionCode: `
  const connection = mysql.createConnection(process.env.MYSQL_URI);
  connection.connect(err => {
    if (err) {
      console.error('MySQL connection error:', err);
      return;
    }
    console.log('MySQL connected');
  });
  `
      };
    case 'SQLServer':
      return {
        importStatement: "const sql = require('mssql');",
        connectionCode: `
  const config = {
    user: process.env.SQLSERVER_USER,
    password: process.env.SQLSERVER_PASSWORD,
    server: process.env.SQLSERVER_SERVER,
    database: process.env.SQLSERVER_DATABASE,
  };
  sql.connect(config)
    .then(() => console.log('SQL Server connected'))
    .catch(err => console.error('SQL Server connection error:', err));
  `
      };
    default:
      throw new Error('Unsupported database selected');
  }
};
