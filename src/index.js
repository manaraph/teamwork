import express from 'express';
import { getUsers, createArticle } from './db';
import passport from "passport";
import './services/passport';
import { signIn, createNewUser } from "./controllers/auth";
// import { createArticle } from "./controllers/articles";

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3500;

const requireAuth = passport.authenticate('jwt', { session: false });
const requireAdminAuth = passport.authenticate('jwt-admin', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

// API end points
app.get('/api/v1/employees', requireAdminAuth, getUsers);
app.post('/api/v1/create-user', requireAdminAuth, createNewUser);
app.post('/api/v1/signin', requireSignIn, signIn);
app.post('/api/v1/articles', requireAuth, createArticle);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
