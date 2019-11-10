import { Pool } from "pg";
import dotenv from "dotenv";
// const dotenv = require("dotenv");


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
  
     
  const{email, firstname, lastname, password, role} = request.query;

  pool.query('INSERT INTO employees (email, firstname, lastname, password, role) VALUES ($1, $2, $3, $4, $5)', [email, firstname, lastname, password, role], (error, results) => {
      if(error){
          throw error;
      }
      console.log(results);
      
      response.status(201).send(`User added with ID: ${results}`);
  })
  console.log('User created');
}


const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const{email, firstname, lastname, password, role} = request.query;
  

  pool.query(
      'UPDATE employees SET email = $1, firstname = $2, lastname = $3, password = $4, role = $5 WHERE id = $6',
      [email, firstname, lastname, password, role, id],
      (error, results) => {
          if(error){
              throw error
          }
          response.status(200).send(`User modified with ID: ${id}`)
      }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM employees WHERE id = $1', [id], (error, results) => {
      
      if(error){
          throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  createUser,
  updateUser, 
  deleteUser
}