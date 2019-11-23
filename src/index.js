import express from 'express';
import {
  getUsers,
  // createUser,
  updateUser,
  deleteUser,
} from './db';
import passport from "passport";
import './services/passport';
import { signIn, signUp } from "./auth";

const bodyParser = require('body-parser');

// console.log('Ín root');


const app = express();
app.use(bodyParser.json());

const port = 3500;

// const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

// app.get('/', (request, response) => {
//   response.json({
//     info: 'Node.js, Express, and Postgres API',
//   });
// });


// API end points
app.get('/api/v1/employees', getUsers);
// app.post('/api/v1//employees', createUser);
// app.put('/api/v1//employees/:id', updateUser);
// app.delete('/api/v1//employees/:id', deleteUser);

app.post('/signup', signUp);
app.post('/signin', requireSignIn, signIn);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
