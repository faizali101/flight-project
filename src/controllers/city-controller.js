const { cityServices } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils');

/*
POST : /cities
req-body {name : STRING}
*/
async function createCity(req, res) {
    try {
        const city = await cityServices.createCity({
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

/*
DELETE : cities/:id
req-param {}
*/
async function deleteCity(req, res) {
    try {
        const city = await cityServices.deleteCity(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully deleted the City.',
            data: city,
            error: {},
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong while deleting the City.',
            data: {},
            error: error.message,
        });
    }
}

module.exports = {
    createCity,
    deleteCity
};