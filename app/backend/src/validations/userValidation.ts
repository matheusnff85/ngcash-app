import * as Joi from 'joi';
import { IUser } from '../interfaces/UserInterface';
import CustomError from '../types/customError';
import StatusCodes from '../types/statusCodes';
import UsersModel from '../models/UsersModel';

const userSchema = Joi.object({
  id: Joi.number(),
  username: Joi.string().min(3).required(),
  password: Joi.string().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&.]{8}/).required(),
});

const usersModel = new UsersModel();

const validateNewUser = async (userObj: IUser) => {
  const findUser = await usersModel.findByUsername(userObj.username);
  if (findUser) throw new CustomError(StatusCodes.UNAUTHORIZED, 'Username already exists.');

  const { error } = userSchema.validate(userObj);
  if (error) throw new CustomError(StatusCodes.BAD_REQUEST, error.message);
};

export { validateNewUser, userSchema };
