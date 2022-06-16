const express = require('express');
const api = require('./api');
const AuthenticationRoutes = require('./authentication');
const { jwtMiddleware } = require('../middleware/jwt.middleware');


const router = express.Router();

router.use('/authentication', AuthenticationRoutes)
router.use('/api', jwtMiddleware({secret : 'SECRET'}), api)

module.exports = router;