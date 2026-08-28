const express = require('express');
const router = express.Router();
const { AirportController } = require('../../controllers');
const { AirportMiddlewares } = require('../../middlewares');

// /api/v1/airport POST
router.post('/', AirportMiddlewares.validateCreateRequest, AirportController.createAirport);
// /api/v1/airport GET
router.get('/', AirportController.getAirports);
// /api/v1/airport/:id GET
router.get('/:id', AirportController.getAirport);
// /api/v1/airport/:id DELETE
router.delete('/:id', AirportController.deleteAirport);
// /api/v1/airport/:id PATCH
router.patch('/:id', AirportController.updateAirport)

module.exports = router;