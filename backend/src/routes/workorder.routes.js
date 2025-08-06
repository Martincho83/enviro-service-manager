'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/workorder.controller');
const { authJwt } = require('../middleware');
const upload = require('../middleware/upload');

router.use(authJwt.verifyToken);

router.post('/', [authJwt.isAdmin], controller.create);
router.get('/', [authJwt.isAdmin], controller.findAll);
router.post('/:id/attachments', upload.single('image'), controller.addAttachment);

// --- ASEGÚRATE DE QUE ESTA LÍNEA ESTÉ AL FINAL ---
module.exports = router;