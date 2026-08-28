const { AirportService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const {successResponse, errorResponse} = require('../utils/errors');


async function createAirport(req, res) {
    try {
        console.log('inside controller');
        const airport = await AirportService.createAirport({
            name : req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });
        return res
            .status(StatusCodes.CREATED) 
            .json({
                success: true,
                message: 'Successfully created an Airport.',
                data: airport,
                error: {},
            });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                success: false,
                message: 'Something went wrong while creating an Airport.',
                data: {},
                error: error.message,
            });
    }
}

async function getAirports(req, res) {
    try {
        const airport = await AirportService.getAirports();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully fetched all Airport.',
            data: airport,
            error: {},
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong while fetching Airport.',
            data: {},
            error: error.message,
        });
    }
}

/*
POST : airport/:id
req-body {}
*/
async function getAirport(req, res) {
    try {
        const airport = await AirportService.getAirport(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully fetched the Airport.',
            data: airport,
            error: {},
        });
    } catch (error) {
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                success: false,
                message: 'Something went wrong while fetching the Airport.',
                data: {},
                error: error.message,
            });
    }
}

/*
DELETE : airport/:id
req-param {}
*/
async function deleteAirport(req, res) {
    try {
        const airport = await AirportService.deleteAirport(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully deleted the Airport.',
            data: airport,
            error: {},
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong while deleting the Airport.',
            data: {},
            error: error.message,
        });
    }
}

/*
PATCH airport/:id
req-body {}
*/
async function updateAirport(req, res) {
    try {
        const airport = await AirportService.updateAirport(req.params.id, {
            name : req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully updated an Airport.',
            data: airport,
            error: {},
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong while updating the Airport.',
            data: {},
            error: error.message,
        });
    }
}


module.exports = {
    createAirport,
    getAirports,
    getAirport,
    deleteAirport,
    updateAirport,
};