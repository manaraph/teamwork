import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// console.log('In db');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const getUsers = (request, response) => {
  pool.query('SELECT * FROM employees ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (email, firstname, lastname, role, password) => {
  console.log('Creating user');
  return pool.query('INSERT INTO employees (email, firstname, lastname, role, password) VALUES ($1, $2, $3, $4, $5)', [email, firstname, lastname, role, password]);
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const {
    email, firstname, lastname, password, role,
  } = request.query;


  pool.query(
    'UPDATE employees SET email = $1, firstname = $2, lastname = $3, password = $4, role = $5 WHERE id = $6',
    [email, firstname, lastname, password, role, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    },
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM employees WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

const verifyUser = (email) => {
  return pool.query('SELECT * FROM employees WHERE email = $1',  [email]);
};

const findUserById = (user) => {  
  const {id} = user;
   return pool.query('SELECT role FROM employees WHERE id = $1', [id]);
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  verifyUser,
  findUserById,
};
