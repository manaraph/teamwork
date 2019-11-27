import passport from "passport";
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

const { verifyUser, findUserById } = require('../controllers/user')

dotenv.config();

// console.log('passport service');

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  verifyUser(email).then( validUser => {    
      bcrypt.compare(password, validUser.rows[0].password).then( validPassword => {
      if (validPassword) {
        return done(null, validUser);
      }
      return done(null, false);
    }).catch( err => done(err, false));
  });
});

const jwtOption = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET
}


const jwtLogin = new JwtStrategy(jwtOption, (payload, done) => {    
  return findUserById(payload.sub).then( foundUser => {    
    if (foundUser) {
      return done(null, foundUser);
    }

    return done(null, false);
  }).catch( err => done(err, false));
})

const jwtAdminAccess = new JwtStrategy(jwtOption, (payload, done) => {
  const { role } = payload.sub.rows[0];
    
  return findUserById(payload.sub).then( foundUser => {    
    if (foundUser && role === "admin") {
      return done(null, foundUser);
    }

    return done(null, false);
  }).catch( err => done(err, false));
})

passport.use(jwtLogin);
passport.use(localLogin);
passport.use('jwt-admin', jwtAdminAccess);
