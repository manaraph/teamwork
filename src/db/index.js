import { Pool } from "pg";
// import { dotenv } from "dotenv";
const dotenv = require("dotenv");


dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const getUsers = (request, response) => {
  pool.query('SELECT * FROM employees ORDER BY id ASC', (error, results) => {
      if(error){
          throw error
      }
      response.status(200).json(results.rows)
  })
}
const createUser = (request, response) => { 
  console.log('Creating user');
  console.log(request.query);
  
     
  const{email, firstname, lastname, password} = request.query;

  pool.query('INSERT INTO employees (email, firstname, lastname, password) VALUES ($1, $2, $3, $4)', [email, firstname, lastname, password], (error, results) => {
      if(error){
          throw error;
      }
      response.status(201).send(`User added with ID: ${results}`);
  })
  console.log('User created');
}

module.exports = {
  getUsers,
  createUser
}