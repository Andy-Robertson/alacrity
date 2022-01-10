require("dotenv").config();
const passport = require("passport");
const { Pool } = require("pg");

// Dev database connection
const devConfig = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
};

// Live database connection
const proConfig = {
  connectionString: process.env.DATABASE_URL,
};

// Db connection pool with toggle
const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

module.exports = pool;
