const router = require('express').Router();
const c = require('../controllers/user.controller');

router.get('/test', c.getTest); 
  
module.exports = router;