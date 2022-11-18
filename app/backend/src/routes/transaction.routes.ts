import { Router } from 'express';
import TransactionController from '../controllers/transactionController';
import validateToken from '../middlewares/validateToken';

const transactionController = new TransactionController();
const transactionRouter = Router();

transactionRouter.get('/transaction', validateToken, transactionController.findAll);
transactionRouter.get('/transaction/:id', validateToken, transactionController.findOne);
transactionRouter.post('/transaction', validateToken, transactionController.create);
transactionRouter.patch('/transaction/:id', transactionController.update);
transactionRouter
  .get('/transaction/user/:id', validateToken, transactionController.findUserTransactions);

export default transactionRouter;
