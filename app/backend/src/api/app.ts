import * as express from 'express';
import * as cors from 'cors';
import errorHandler from '../middlewares/errorHandler';
import userRouter from '../routes/user.routes';
import accountRouter from '../routes/account.routes';
import transactionRouter from '../routes/transaction.routes';

export default class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(accessControl);
    this.app.use(userRouter);
    this.app.use(accountRouter);
    this.app.use(transactionRouter);
    this.app.use(errorHandler);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}
