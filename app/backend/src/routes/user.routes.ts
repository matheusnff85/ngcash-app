import { Router } from 'express';
import UserController from '../controllers/userController';
import validateToken from '../middlewares/validateToken';

const userController = new UserController();
const userRouter = Router();

userRouter.get('/users', userController.findAll);
userRouter.get('/users/:id', validateToken, userController.findOne);
userRouter.post('/login', userController.login);
userRouter.post('/users', userController.create);
userRouter.patch('/users/:id', validateToken, userController.update);

export default userRouter;
