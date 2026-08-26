const express = require('express');
const router = express.Router();
const { AirplaneController } = require('../../controllers');

router.post('/airplanes', AirplaneController.createAirplanes);
console.log('inside Airplanes routes');
router.get('/', AirplaneController.getAirplanes)

module.exports = router;