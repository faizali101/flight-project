const express = require('express');

const { InfoController } = require('../../controllers');
const airplaneRoutes = require('./airplanes-routes');
const cityRoutes = require('./city-routes')
const AirportRoutes = require('./airport-routes')
const FlightRoutes = require('./flight-routes')

const router = express.Router();

console.log('inside V1 routes');

router.get('/info', InfoController.info);
router.use('/airplanes',airplaneRoutes);
router.use('/cities',cityRoutes);
router.use('/airports',AirportRoutes);
router.use('/flights', FlightRoutes)

module.exports = router;