const cardsRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard, verifyOwnership,
} = require('../controllers/cards');
const { regexURL } = require('../utils/constants');

cardsRoutes.get('/api/cards', getCards);

cardsRoutes.post(
  '/api/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(regexURL),
    }),
  }),
  createCard,
);

cardsRoutes.delete(
  '/api/cards/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  verifyOwnership,
  deleteCard,
);

cardsRoutes.put(
  '/api/cards/:cardId/likes',
  celebrate({
    params:
      Joi.object().keys({
        cardId: Joi.string().hex().length(24).required(),
      }),
  }),
  likeCard,
);

cardsRoutes.delete(
  '/api/cards/:cardId/likes',
  celebrate({
    params:
      Joi.object().keys({
        cardId: Joi.string().hex().length(24).required(),
      }),
  }),
  dislikeCard,
);

module.exports = cardsRoutes;
