const express = require('express');
const router = express.Router();
const { cityController } = require('../../controllers')
const { CityMiddlewares } = require('../../middlewares');

// /api/v1/cities POST
router.post(
    '/', 
    CityMiddlewares.validateCreateRequest,
    cityController.createCity
);

// /api/v1/ DELETE 
router.delete('/:id', cityController.deleteCity);

// /api/v1/:id PATCH
router.patch('/:id', cityController.updateCity);

// /api/v1/ GET 
router.get('/', cityController.getCities);

module.exports = router


