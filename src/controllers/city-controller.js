const { cityService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils');

/*
POST : /cities
req-body {name : STRING}
*/
async function createCity(req, res) {
    try {
        const city = await cityService.createCity({
            name: req.body.name,
        });
        return res.status(StatusCodes.CREATED).json({
            ...SuccessResponse,
            message: 'Successfully created a City.',
            data: city,
        });
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            message: 'Something went wrong while creating a City.',
            error: error.message,
        });
    }
}

module.exports = {
    createCity,
};