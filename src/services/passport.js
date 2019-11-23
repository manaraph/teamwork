const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { verifyUser, findUserById } = require('../db')
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
import dotenv from 'dotenv';

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
    console.log(foundUser);
    
    if (foundUser) {
      return done(null, foundUser);
    }

    return done(null, false);
  }).catch( err => done(err, false));
})

passport.use(jwtLogin);
passport.use(localLogin);
