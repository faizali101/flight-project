const express = require('express');
const router = express.Router();
const { cityController } = require('../../controllers')

// /api/v1/cities POST
router.post('/cities', cityController.createCity);

module.exports = router