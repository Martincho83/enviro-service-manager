const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

//Definimos las rutas y las asociamos con su función controladora
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;