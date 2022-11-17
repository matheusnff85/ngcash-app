import { Router } from 'express';
import TransactionController from '../controllers/transactionController';

const transactionController = new TransactionController();
const transactionRouter = Router();

transactionRouter.get('/transaction', transactionController.findAll);
transactionRouter.get('/transaction/:id', transactionController.findOne);
transactionRouter.post('/transaction', transactionController.create);
transactionRouter.patch('/transaction/:id', transactionController.update);

export default transactionRouter;
