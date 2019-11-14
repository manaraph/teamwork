import express from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from './db';
import passport from "passport";
// const passport = require('passport');
import passportService from './services/passport';
import { signIn, signUp } from "./auth";

console.log('Ín root');


const app = express();
const router = express.Router();

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

router.post('/signup', signUp);
router.post('/signin', requireSignIn, signIn);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
