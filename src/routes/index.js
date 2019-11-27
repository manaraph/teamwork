import express from 'express';
import { getUsers } from '../controllers/user';
import { signIn, createNewUser } from "../controllers/auth";
import { createArticle, editArticle, deleteArticle } from "../controllers/articles";
import { createComment } from "../controllers/articles/comments";
import { requireAuth, requireSignIn, requireAdminAuth, } from "../services/middleware/auth";

const routes = express.Router();

// API end points
routes.get('/employees', requireAdminAuth, getUsers);
routes.post('/create-user', requireAdminAuth, createNewUser);
routes.post('/signin', requireSignIn, signIn);
routes.post('/articles', requireAuth, createArticle);
routes.put('/articles/:articleId', requireAuth, editArticle);
routes.delete('/articles/:articleId', requireAuth, deleteArticle);
routes.post('/articles/:articleId/comments', requireAuth, createComment);

module.exports = routes;