import { Pool } from "pg";
// import { dotenv } from "dotenv";
const dotenv = require("dotenv");


dotenv.config();

console.log(process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if(error){
          throw error
      }
      response.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers
}