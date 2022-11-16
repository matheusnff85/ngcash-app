import * as Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&.]{8}/).required(),
});

export default userSchema;
