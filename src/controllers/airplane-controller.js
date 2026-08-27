const { AirplaneService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const {successResponse, errorResponse} = require('../utils/errors');


async function createAirplanes(req, res) {
    try {
        console.log('inside controller');
        const airplane = await AirplaneService.createAirplanes({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity,
        });
        return res
            .status(StatusCodes.CREATED) 
            .json({
                success: true,
                message: 'Successfully created an Airplane.',
                data: airplane,
                error: {},
            });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                success: false,
                message: 'Something went wrong while creating an Airplane.',
                data: {},
                error: error.message,
            });
    }
}

async function getAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully fetched all Airplanes.',
            data: airplanes,
            error: {},
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong while fetching Airplanes.',
            data: {},
            error: error.message,
        });
    }
}

/*
POST : airplanes/:id
req-body {}
*/
async function getAirplane(req, res) {
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully fetched the Airplane.',
            data: airplane,
            error: {},
        });
    } catch (error) {
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                success: false,
                message: 'Something went wrong while fetching the Airplane.',
                data: {},
                error: error.message,
            });
    }
}

/*
DELETE : airplanes/:id
req-param {}
*/
async function deleteAirplane(req, res) {
    try {
        const airplane = await AirplaneService.deleteAirplane(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully deleted the Airplane.',
            data: airplane,
            error: {},
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong while deleting the Airplane.',
            data: {},
            error: error.message,
        });
    }
}

/*
PATCH airplanes/:id
req-body {}
*/
async function updateAirplane(req, res) {
    try {
        const airplane = await AirplaneService.updateAirplane(req.params.id, {
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity,
        });
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully updated an Airplane.',
            data: airplane,
            error: {},
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong while updating the Airplane.',
            data: {},
            error: error.message,
        });
    }
}

module.exports = {
    createAirplanes,
    getAirplanes,
    getAirplane,
    deleteAirplane,
    updateAirplane,
};