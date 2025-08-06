'use strict'
const express = require ('express');
const router = express.Router();
const controller = require('../controllers/consortium.controller');
const {authJwt} = require('../middleware');

//Todas estas rutas son solo para administradores
router.use([authJwt.verifyToken,authJwt.isAdmin]);
router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findOne);

module.exports = router;