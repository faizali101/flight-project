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
            ...SuccessResponse,
            message: 'Successfully deleted the City.',
            data: city,
        });
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            message: 'Something went wrong while deleting the City.',
            error: error.message,
        });
    }
}

/*
PATCH cities/:id
req-body {}
*/
async function updateCity(req, res) {
    try {
        const city = await cityServices.updateCity(req.params.id, {
            name: req.body.name,
        });
        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            message: 'Successfully updated the City.',
            data: city,
        });
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            message: 'Something went wrong while updating the City.',
            error: error.message,
        });
    }
}

module.exports = {
    createCity,
    deleteCity,
    updateCity,
};