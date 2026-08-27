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

// /api/v1/cities DELETE 
router.delete('/cities/:id', cityController.deleteCity);


module.exports = router