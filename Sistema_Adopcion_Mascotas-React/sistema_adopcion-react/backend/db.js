const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "jeremy",
  database: "adopcion_mascotas",
  port: 5432,
});

module.exports = pool;
