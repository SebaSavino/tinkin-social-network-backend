const Joi = require('joi');

const birthdateSchema = Joi.object({
  day: Joi.number().integer(),
  month: Joi.number().integer(),
  year: Joi.number().integer(),
}).options({
  abortEarly: false,
  presence: 'required',
});

exports.postUserSchema = Joi.object({
  lastName: Joi.string(),
  userName: Joi.string(),
  password: Joi.string(),
  firstName: Joi.string(),
  birthdate: birthdateSchema,
  email: Joi.string().email(),
  gender: Joi.string().valid('M', 'F'),
}).options({
  abortEarly: false,
  presence: 'required',
});
