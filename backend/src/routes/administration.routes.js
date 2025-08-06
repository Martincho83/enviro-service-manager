'use strict';
const express = require ('express');
const router = express.Router();
const controller = require ('../controllers/administration.controller');
const{authJwt} = require ('../middleware');

//Todas estas rutas son solo para administradores

router.use([authJwt.verifyToken,authJwt.isAdmin]);

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;