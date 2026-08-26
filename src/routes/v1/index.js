const express = require('express');

const { InfoController } = require('../../controllers');
const airplaneRoutes = require('./airplanes-routes');

const router = express.Router();

console.log('inside V1 routes');

router.get('/info', InfoController.info);
router.use(airplaneRoutes);

module.exports = router;