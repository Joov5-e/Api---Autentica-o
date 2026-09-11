import express from 'express';
import UserController from '../controllers/usersController.js';
import authMiddleware from '../Middleware/AuthMiddleware.js';


const routesUser = express.Router();

routesUser.get('/users', UserController.findUsers);
routesUser.post('/users/register', UserController.userRegisters);
routesUser.post('/users/auth/login', UserController.userlogin);
routesUser.get('/users/auth', authMiddleware, UserController.userAuthenticator);

export default routesUser;