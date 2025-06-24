const express = require('express');
const router = express.Router();
const { fieldsController } = require('../controllers/fieldsController');

router.get('/fields', fieldsController);

module.exports = router; 