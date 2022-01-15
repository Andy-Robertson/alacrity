require("dotenv").config();
const passport = require("passport");
const { Pool } = require("pg");

// Dev database connection,
const devConfig = {
  user: process.env.DEV_USER,
  host: process.env.DEV_HOST,
  database: process.env.DEV_DATABASE,
  password: process.env.DEV_PASSWORD,
  port: process.env.DEV_PORT,
};

// Live database connection
const proConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

// Db connection pool with toggle
const pool = new Pool(
  process.env.WORKING_ENVIRONMENT === "production" ? proConfig : devConfig
);

module.exports = pool;
