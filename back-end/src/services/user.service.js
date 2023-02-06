const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../database/models');
const jwtUtils = require('../utils/jwt.utils');
const { loginSchema, registerSchema } = require('../joi/schemas');
const HttpException = require('../exceptions/HttpException');

const authenticate = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    throw new HttpException(400, error.message);
  } 

  const user = await User.findOne({ where: { email, password: md5(password) } });
  if (!user) {
    throw new HttpException(404, 'User not found');
  }

  const { password: _, ...userWithoutPassword } = user.dataValues;
  const token = jwtUtils.generateToken(userWithoutPassword);
  return { ...userWithoutPassword, token };
};

const register = async (name, email, password) => {
  const { error } = registerSchema.validate({ name, email, password });
  if (error) {
    throw new HttpException(400, error.message);
  }

  const checkedUser = await User.findOne({ where: { [Op.or]: { email, name } } });
  if (checkedUser) {
    throw new HttpException(409, 'User already registered');
  }

  const { dataValues: { password: _, ...user } } = await User.create({
    name,
    email,
    password: md5(password),
    role: 'customer',
  });

  user.token = jwtUtils.generateToken(user);

  return user;
};

module.exports = { authenticate, register };
