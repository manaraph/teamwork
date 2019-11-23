const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
import { createUser } from '../db';
import dotenv from 'dotenv';

dotenv.config();

// console.log('In auth');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user, iat: timestamp }, process.env.SECRET);
}

const signIn = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
}

const createNewUser = (req, res, next) => {    
  const { email, firstname, lastname, role, password } = req.body;
  const saltRounds = 8;

  if(!email || !password) {
    res.status(422).send({ error: 'You must provide an email and a password.'})
  }

  bcrypt.hash(password, saltRounds).then( hash => {    
    return createUser(email, firstname, lastname, role, hash).then( newUser => {      
      res.json({ token: tokenForUser(newUser) });
    }).catch( err => {
      console.log(err);
      res.json({ error: 'Error saving user to the database' });
    });
  }).catch( err => {
    return next(err);
  })
}

module.exports = {
  createNewUser,
  signIn
}
