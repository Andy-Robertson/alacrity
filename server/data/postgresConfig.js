require("dotenv").config();
const passport = require("passport");
const { Pool } = require("pg");

// Connect to database and create pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
