require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "port": process.env.DB_PORT
  },
  "test": {
    "username": process.env.DB_USERNAME || "postgres",
    "password": process.env.DB_PASSWORD || "password",
    "database": "iam_db_test",
    "host": process.env.DB_HOST || "localhost",
    "dialect": process.env.DB_DIALECT || "postgres",
    "port": process.env.DB_PORT || 5432
  },
  "production": {
    "username": process.env.DB_USERNAME || "postgres",
    "password": process.env.DB_PASSWORD || "password",
    "database": "iam_db_production",
    "host": process.env.DB_HOST || "localhost",
    "dialect": process.env.DB_DIALECT || "postgres",
    "port": process.env.DB_PORT || 5432
  }
}