import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || 'ngcash';

const generateToken = (username: string) => {
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });
  return token;
};

export default generateToken;
