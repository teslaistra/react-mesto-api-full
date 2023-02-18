const userRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { regexURL } = require('../utils/constants');
const {
  getUsers, getUser, updateUser, updateAvatar, getMe,
} = require('../controllers/users');

userRoutes.get('/api/users', getUsers);

userRoutes.get('/api/users/me', getMe);

userRoutes.get(
  '/api/users/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex(),
    }),
  }),
  getUser,
);

userRoutes.patch(
  '/api/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);

userRoutes.patch(
  '/api/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(regexURL),
    }),
  }),
  updateAvatar,
);

module.exports = userRoutes;
