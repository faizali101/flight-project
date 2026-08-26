const express = require('express');
const router = express.Router();
const { AirplaneController } = require('../../controllers');

// /api/v1/airplanes POST
router.post('/airplanes', AirplaneController.createAirplanes);

// /api/v1/airplanes GET
router.get('/airplanes', AirplaneController.getAirplanes);

// /api/v1/airplanes/:id GET
router.get('/airplanes/:id', AirplaneController.getAirplane);

module.exports = router;
