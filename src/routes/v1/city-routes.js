const express = require('express');
const router = express.Router();
const { cityController } = require('../../controllers')
const { CityMiddlewares } = require('../../middlewares');

// /api/v1/cities POST
router.post(
    '/cities', 
    CityMiddlewares.validateCreateRequest,
    cityController.createCity
);

module.exports = router