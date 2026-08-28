const { StatusCodes } = require('http-status-codes');
const { AppError, ErrorResponse } = require ('../utils');

function validateCreateRequest(req, res, next) {
    if (!req.body.flightNumber || !req.body.airplaneID || !req.body.departureAirportID || !req.body.arrivalAirportID || !req.body.arrivalTime || !req.body.departureTime || !req.body.price || !req.body.totalSeats) {
        ErrorResponse.message = 'Something went wrong while creating an Flight.';
        ErrorResponse.error = new AppError('Flight fields not found in the request body.', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}