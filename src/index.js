import express from 'express';
import { getUsers } from './db';
import { signIn, createNewUser } from "./controllers/auth";
import { createArticle, editArticle, deleteArticle } from "./controllers/articles";
import { createComment } from "./controllers/articles/comments";
import { requireAuth, requireSignIn, requireAdminAuth, } from "./services/middleware/auth";

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3500;

// API end points
app.get('/api/v1/employees', requireAdminAuth, getUsers);
app.post('/api/v1/create-user', requireAdminAuth, createNewUser);
app.post('/api/v1/signin', requireSignIn, signIn);
app.post('/api/v1/articles', requireAuth, createArticle);
app.put('/api/v1/articles/:articleId', requireAuth, editArticle);
app.delete('/api/v1/articles/:articleId', requireAuth, deleteArticle);
app.post('/api/v1/articles/:articleId/comments', requireAuth, createComment);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
