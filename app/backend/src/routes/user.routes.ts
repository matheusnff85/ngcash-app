import { Router } from 'express';
import UserController from '../controllers/userController';

const userController = new UserController();
const userRouter = Router();

userRouter.get('/users', userController.findAll);
userRouter.get('/users/:id', userController.findOne);
userRouter.post('/login', userController.login);
userRouter.post('/users', userController.create);
userRouter.patch('/users/:id', userController.update);

export default userRouter;
