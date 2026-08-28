const express = require('express');
const router = express.Router();
const { FlightController } = require('../../controllers');
const { FlightMiddlewares } = require('../../middlewares');

// /api/v1/flights POST
router.post('/', FlightMiddlewares.validateCreateRequest, FlightController.createFlight);
// /api/v1/flights DELETE 
router.delete('/:id', FlightController.deleteFlight);

module.exports = router;