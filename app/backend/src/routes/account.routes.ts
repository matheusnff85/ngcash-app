import { Router } from 'express';
import AccountController from '../controllers/accountController';

const accountController = new AccountController();
const accountRouter = Router();

accountRouter.get('/account', accountController.findAll);
accountRouter.get('/account/:id', accountController.findOne);
accountRouter.post('/account', accountController.create);
accountRouter.patch('/account/:id', accountController.update);

export default accountRouter;
