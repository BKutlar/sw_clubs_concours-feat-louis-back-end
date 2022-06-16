const { request } = require('express');
const jwt = require('jsonwebtoken');
const UserModel = require('../modele/user.modele');

const jwtMiddleware = ({ secret }) =>
  async ({ headers: { authorization: token } }, _response, next) => {
    try {
      let { username } = jwt.verify(token, secret);
      const user = await UserModel.findUserByUsername({username});
      if (!user) {
        return next(_response.status(400).json({ error: 'Token inconnu' }));
      }

      request.user = user;

      next();
    } catch(error) {
      console.log(error)
      next(_response.status(400).json({ error: 'bad request' }));
    }
  }

  module.exports = { jwtMiddleware };